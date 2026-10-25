import crypto from 'node:crypto';

const workerUrl = new URL('../leaderboard-worker/worker.js', import.meta.url);
const mod = await import(workerUrl.href + '?t=' + Date.now());
const worker = mod.default;

class KV {
  constructor() { this.m = new Map(); }
  async get(k, opt) {
    const v = this.m.get(k);
    if (v === undefined) return null;
    return opt && opt.type === 'json' ? JSON.parse(v) : v;
  }
  async put(k, v) { this.m.set(k, String(v)); }
  async delete(k) { this.m.delete(k); }
  async list({ prefix = '', cursor, limit = 1000 } = {}) {
    const keys = [...this.m.keys()].filter(k => k.startsWith(prefix)).slice(0, limit).map(name => ({ name }));
    return { keys, cursor: undefined };
  }
}

const kv = new KV();
const env = { FRUIT_BLAST_LB: kv };
const base = 'https://worker.test';

async function call(path, opts = {}) {
  const res = await worker.fetch(new Request(base + path, opts), env);
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data };
}

function post(path, body, headers = {}) {
  return call(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body)
  });
}

const checks = [];
function check(name, cond, extra) {
  checks.push({ name, ok: !!cond, extra });
  console.log((cond ? 'PASS' : 'FAIL') + '  ' + name + (extra !== undefined ? '  ' + JSON.stringify(extra) : ''));
}

const health = await call('/health');
check('health', health.status === 200 && health.data.success, health.data);

const s1 = await post('/session/start', { vk_user_id: 42 });
check('session start', s1.status === 200 && /^[a-f0-9]{32}$/.test(s1.data.token), s1.data.token && s1.data.token.slice(0, 6) + '...');

const noSession = await post('/submit', { vk_user_id: 42, score: 100 });
check('submit without session rejected', noSession.status === 403 && noSession.data.error === 'session_required');

await new Promise(r => setTimeout(r, 2100));
const tooFast = await post('/submit', { vk_user_id: 42, score: 999999, session_token: s1.data.token, play_time: 1 });
check('score cap rejects inflated early score', tooFast.status === 403 && tooFast.data.error === 'score_too_high', tooFast.data);

await new Promise(r => setTimeout(r, 5200));
const okSubmit = await post('/submit', {
  vk_user_id: 42, first_name: 'Иван', last_name: 'Тест', score: 1200,
  session_token: s1.data.token, play_time: 20
});
check('valid submit accepted', okSubmit.status === 200 && okSubmit.data.updated === true, okSubmit.data);

const rate = await post('/submit', { vk_user_id: 42, score: 1300, session_token: s1.data.token, play_time: 21 });
check('rate limit works', rate.status === 429 && rate.data.error === 'rate_limited', rate.data);

const s2 = await post('/session/start', { vk_user_id: 43 });
await new Promise(r => setTimeout(r, 2100));
const cheat = await post('/submit', { vk_user_id: 43, score: 999999, session_token: s2.data.token, play_time: 15 });
check('huge score rejected', cheat.status === 403 && cheat.data.error === 'score_too_high', cheat.data);

const s3 = await post('/session/start', { vk_user_id: 43 });
await new Promise(r => setTimeout(r, 2100));
const ok2 = await post('/submit', { vk_user_id: 43, first_name: 'Пётр', score: 500, session_token: s3.data.token, play_time: 120 });
check('second user submit', ok2.status === 200 && ok2.data.updated, ok2.data);

const all = await call('/leaderboard');
check('all-time leaderboard', all.status === 200 && all.data.leaderboard.length === 2 && all.data.leaderboard[0].score === 1200, all.data.leaderboard.map(u => u.score));

const week = await call('/leaderboard?period=week');
check('weekly leaderboard', week.status === 200 && week.data.period === 'week' && week.data.leaderboard.length === 2, week.data.week);

// Seed previous week and check lazy reward calculation.
const now = Date.now();
function weekKeyOf(ms) {
  const d = new Date(ms + 3 * 3600 * 1000);
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const ys = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return d.getUTCFullYear() + '-W' + String(Math.ceil((((d - ys) / 86400000) + 1) / 7)).padStart(2, '0');
}
const prev = weekKeyOf(now - 7 * 86400000);
await kv.put('week:' + prev + ':user:42', JSON.stringify({ vk_user_id: '42', first_name: 'Иван', score: 2000 }));
await kv.put('week:' + prev + ':user:43', JSON.stringify({ vk_user_id: '43', first_name: 'Пётр', score: 1500 }));

const ws = await call('/weekly/status?vk_user_id=42');
check('weekly status reward', ws.status === 200 && ws.data.my_reward === 150 && ws.data.my_rank === 1, { reward: ws.data.my_reward, prev: ws.data.previous_week });

const claim = await post('/weekly/claim', { vk_user_id: 42, week: prev });
check('weekly claim', claim.status === 200 && claim.data.diamonds === 150, claim.data);
const claim2 = await post('/weekly/claim', { vk_user_id: 42, week: prev });
check('weekly claim idempotent', claim2.status === 200 && claim2.data.already === true, claim2.data);

const ev = await post('/event', { name: 'game_end', vk_user_id: 42, score: 1200 });
check('event accepted', ev.status === 200 && ev.data.success);
const evBad = await post('/event', { name: 'hack', score: 1 });
check('unknown event rejected', evBad.status === 400);
const stats = await call('/stats');
const today = Object.keys(stats.data.days)[0];
check('stats counters', stats.data.days[today].game_end === 1 && stats.data.days[today].score_sum === 1200, stats.data.days[today]);

const gi = await post('/vk-pay', { notification_type: 'get_item', item: 'diam_small', app_id: '1' });
check('payment get_item', gi.status === 200 && gi.data.response.price === 11 && gi.data.response.title === '60 алмазов', gi.data.response);

const expectedItems = {
  diam_small: 11, diam_small2: 26, diam_medium: 43, diam_big: 86, diam_large: 128, diam_mega: 214,
  hammer_pack: 7, rocket_pack: 11, swap_pack: 10
};
const itemResults = {};
for (const [item, price] of Object.entries(expectedItems)) {
  const r = await post('/vk-pay', { notification_type: 'get_item', item, app_id: '1' });
  itemResults[item] = r.data && r.data.response ? r.data.response.price : null;
}
check('all 9 store items priced in votes', Object.entries(expectedItems).every(([item, price]) => itemResults[item] === price), itemResults);
check('booster pack titles expose quantity', (await post('/vk-pay', { notification_type: 'get_item', item: 'hammer_pack', app_id: '1' })).data.response.title === 'Молоток ×6', 'Молоток ×6');
const osc = await post('/vk-pay', { notification_type: 'order_status_change', status: 'chargeable', order_id: '777', user_id: '42', item: 'diam_small', price: '11' });
check('payment order accepted', osc.status === 200 && osc.data.response.order_id === '777' && osc.data.response.app_order_id > 0, osc.data.response);
const giUnknown = await post('/vk-pay', { notification_type: 'get_item', item: 'nope' });
check('unknown item rejected', giUnknown.status === 200 && giUnknown.data.error.error_code === 10);

env.PAYMENT_SECRET = 'testsecret';
const payPayload = { notification_type: 'get_item', item: 'diam_small', app_id: '1' };
const sorted = Object.keys(payPayload).sort().map(k => k + '=' + payPayload[k]).join('&');
payPayload.sig = crypto.createHash('md5').update(sorted + 'testsecret').digest('hex');
const signed = await post('/vk-pay', payPayload);
check('payment signature valid', signed.status === 200 && signed.data.response.price === 11);
payPayload.sig = 'deadbeef';
const badSig = await post('/vk-pay', payPayload);
check('payment signature invalid rejected', badSig.status === 403);

const reg = await post('/notifications/register', { vk_user_id: 42, enabled: true });
check('notifications register', reg.status === 200 && reg.data.enabled === true);
const unreg = await post('/notifications/unregister', { vk_user_id: 42 });
check('notifications unregister', unreg.status === 200 && unreg.data.enabled === false);

const del = await post('/delete', { vk_user_id: 43 });
check('delete user', del.status === 200 && del.data.deleted === '43');
const all2 = await call('/leaderboard');
check('deleted user gone', all2.status === 200 && all2.data.leaderboard.every(u => String(u.vk_user_id) !== '43'), all2.data.leaderboard.length);

const failed = checks.filter(c => !c.ok);
console.log('\n' + (checks.length - failed.length) + '/' + checks.length + ' checks passed');
process.exit(failed.length ? 1 : 0);
