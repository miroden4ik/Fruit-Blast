// Fruit Blast backend: leaderboard, weekly seasons, anti-cheat sessions,
// analytics, VK payments and daily reminder readiness.
const WORKER_VERSION = '2.1.0';
const WEEKLY_REWARDS = [150, 100, 60];
const SESSION_TTL_SEC = 90 * 60;
const MAX_PLAY_TIME_SEC = 20 * 60;
const SCORE_BASE_ALLOWANCE = 400;
const SCORE_PER_SECOND = 60;
const SUBMIT_MIN_INTERVAL_MS = 5000;

const PAYMENT_ITEMS = {
  diam_small:   { title: '60 алмазов',      price: 11,  kind: 'diamonds', qty: 60 },
  diam_small2:  { title: '150 алмазов',     price: 26,  kind: 'diamonds', qty: 150 },
  diam_medium:  { title: '300 алмазов',     price: 43,  kind: 'diamonds', qty: 300 },
  diam_big:     { title: '700 алмазов',     price: 86,  kind: 'diamonds', qty: 700 },
  diam_large:   { title: '1200 алмазов',    price: 128, kind: 'diamonds', qty: 1200 },
  diam_mega:    { title: '2500 алмазов',    price: 214, kind: 'diamonds', qty: 2500 },
  hammer_pack:  { title: 'Молоток ×6',      price: 7,   kind: 'hammer',   qty: 6 },
  rocket_pack:  { title: 'Ракета ×5',       price: 11,  kind: 'rocket',   qty: 5 },
  swap_pack:    { title: 'Обмен ×5',        price: 10,  kind: 'swap',     qty: 5 }
};

const ANALYTICS_EVENTS = new Set([
  'app_open', 'game_start', 'game_end', 'store_open', 'leaderboard_open',
  'ad_watch', 'purchase_attempt', 'purchase_success', 'purchase_cancel',
  'task_claim', 'streak_claim', 'achievement_unlock', 'weekly_claim', 'share',
  'notifications_allow', 'notifications_deny', 'boost_use', 'daily_cap'
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === 'OPTIONS') {
      return cors(new Response(null, { status: 204 }));
    }

    try {
      if (method === 'GET' && path === '/health') {
        return cors(json({ success: true, version: WORKER_VERSION, time: Date.now() }));
      }
      if (method === 'GET' && path === '/leaderboard') {
        return cors(await getLeaderboard(env, url));
      }
      if (method === 'POST' && path === '/session/start') {
        return cors(await startSession(request, env));
      }
      if (method === 'POST' && path === '/submit') {
        return cors(await submitScore(request, env));
      }
      if (method === 'GET' && path === '/weekly/status') {
        return cors(await weeklyStatus(env, url));
      }
      if (method === 'POST' && path === '/weekly/claim') {
        return cors(await claimWeeklyReward(request, env));
      }
      if (method === 'POST' && path === '/event') {
        return cors(await trackEvent(request, env));
      }
      if (method === 'GET' && path === '/stats') {
        return cors(await getStats(env));
      }
      if (method === 'POST' && path === '/notifications/register') {
        return cors(await registerNotifications(request, env));
      }
      if (method === 'POST' && path === '/notifications/unregister') {
        return cors(await unregisterNotifications(request, env));
      }
      if (method === 'POST' && path === '/vk-pay') {
        return cors(await handleVkPayment(request, env));
      }
      if (method === 'POST' && path === '/delete') {
        return cors(await deleteUser(request, env));
      }
      return cors(json({ error: 'Not found' }, 404));
    } catch (err) {
      console.error('Request error:', err && err.stack ? err.stack : err);
      return cors(json({ error: 'Internal server error' }, 500));
    }
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendDailyReminders(env));
  }
};

function cors(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');
  response.headers.set('Access-Control-Max-Age', '86400');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

async function readBody(request) {
  const type = request.headers.get('Content-Type') || '';
  if (type.includes('application/json')) {
    return await request.json();
  }
  const text = await request.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch (e) {}
  const out = {};
  new URLSearchParams(text).forEach((v, k) => { out[k] = v; });
  return out;
}

function cleanInt(value, max) {
  const n = Number(value);
  if (!isFinite(n) || n < 0) return 0;
  return Math.min(Math.floor(n), max);
}

function cleanName(value, fallback) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 60) || fallback;
}

function normalizeUser(payload, score) {
  return {
    vk_user_id: String(payload.vk_user_id),
    first_name: cleanName(payload.first_name, 'Игрок'),
    last_name: cleanName(payload.last_name, ''),
    photo_100: String(payload.photo_100 || '').slice(0, 500),
    score: cleanInt(score, 100000000),
    updated_at: Date.now()
  };
}

function weekKeyOf(ms) {
  const shifted = new Date(ms + 3 * 3600 * 1000);
  const day = shifted.getUTCDay() || 7;
  shifted.setUTCDate(shifted.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(shifted.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((shifted - yearStart) / 86400000) + 1) / 7);
  return shifted.getUTCFullYear() + '-W' + String(week).padStart(2, '0');
}

function nextWeekStartMs(now) {
  const shifted = new Date(now + 3 * 3600 * 1000);
  const day = shifted.getUTCDay() || 7;
  const daysUntilMonday = 8 - day;
  const next = Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate() + daysUntilMonday,
    0, 0, 0, 0
  );
  return next - 3 * 3600 * 1000;
}

function mskDateKey(ms) {
  return new Date(ms + 3 * 3600 * 1000).toISOString().slice(0, 10);
}

function isWeekKey(value) {
  return /^\d{4}-W\d{2}$/.test(String(value || ''));
}

// ===== LEADERBOARD =====
async function getLeaderboard(env, url) {
  const kv = env.FRUIT_BLAST_LB;
  const period = url.searchParams.get('period') === 'week' ? 'week' : 'all';
  const week = isWeekKey(url.searchParams.get('week'))
    ? url.searchParams.get('week')
    : weekKeyOf(Date.now());

  const cacheKey = period === 'week' ? '_week_index:' + week : '_index';
  const cached = await kv.get(cacheKey, { type: 'json' });
  if (cached && Array.isArray(cached)) {
    return json({ success: true, period, week, leaders: cached, leaderboard: cached });
  }

  const top = period === 'week'
    ? (await scanScores(kv, 'week:' + week + ':')).slice(0, 100)
    : (await scanAllTime(kv)).slice(0, 100);

  await kv.put(cacheKey, JSON.stringify(top), { expirationTtl: period === 'week' ? 120 : 300 });
  return json({ success: true, period, week, leaders: top, leaderboard: top });
}

async function scanAllTime(kv) {
  const results = [];
  let cursor = null;
  do {
    const list = await kv.list({ prefix: 'user:', cursor, limit: 1000 });
    for (const key of list.keys) {
      if (!/^user:\d+$/.test(key.name)) continue;
      const user = await kv.get(key.name, { type: 'json' });
      if (user && typeof user.score === 'number') results.push(user);
    }
    cursor = list.cursor;
  } while (cursor);
  return results.sort((a, b) => b.score - a.score);
}

async function scanScores(kv, prefix) {
  const results = [];
  let cursor = null;
  do {
    const list = await kv.list({ prefix, cursor, limit: 1000 });
    for (const key of list.keys) {
      const user = await kv.get(key.name, { type: 'json' });
      if (user && typeof user.score === 'number') results.push(user);
    }
    cursor = list.cursor;
  } while (cursor);
  return results.sort((a, b) => b.score - a.score);
}

// ===== SESSIONS / ANTI-CHEAT =====
async function startSession(request, env) {
  const payload = await readBody(request);
  const uid = payload && payload.vk_user_id != null ? String(payload.vk_user_id) : '';
  if (!/^\d+$/.test(uid)) {
    return json({ success: false, error: 'vk_user_id required' }, 400);
  }
  if (payload.vk_sign_params) {
    const valid = await verifyVKSignature(payload.vk_sign_params, env);
    if (!valid) return json({ success: false, error: 'Invalid VK signature' }, 403);
  }

  const token = crypto.randomUUID().replace(/-/g, '');
  const record = { uid, start: Date.now() };
  await env.FRUIT_BLAST_LB.put('sess:' + token, JSON.stringify(record), {
    expirationTtl: SESSION_TTL_SEC
  });
  return json({
    success: true,
    token,
    starts_at: record.start,
    expires_in: SESSION_TTL_SEC
  });
}

async function validateSession(env, payload) {
  const token = String(payload.session_token || '');
  if (!/^[a-f0-9]{32}$/.test(token)) {
    return { ok: false, status: 403, error: 'session_required' };
  }
  const record = await env.FRUIT_BLAST_LB.get('sess:' + token, { type: 'json' });
  if (!record) {
    return { ok: false, status: 403, error: 'session_expired' };
  }
  if (String(record.uid) !== String(payload.vk_user_id)) {
    return { ok: false, status: 403, error: 'session_user_mismatch' };
  }
  const now = Date.now();
  const elapsed = Math.max(0, (now - Number(record.start || 0)) / 1000);
  if (elapsed < 2) {
    return { ok: false, status: 403, error: 'session_too_early' };
  }
  // play_time may come from a resumed game, so it can exceed this session's wall time.
  const playTime = Math.min(Number(payload.play_time) || 0, MAX_PLAY_TIME_SEC);
  const cap = Math.floor(SCORE_BASE_ALLOWANCE + playTime * SCORE_PER_SECOND);
  if (Number(payload.score) > cap) {
    return { ok: false, status: 403, error: 'score_too_high', cap };
  }
  return { ok: true, playTime };
}

async function submitScore(request, env) {
  const kv = env.FRUIT_BLAST_LB;
  let payload;
  try {
    payload = await readBody(request);
  } catch (e) {
    return json({ success: false, error: 'Invalid JSON' }, 400);
  }

  const { vk_user_id, score, vk_sign_params } = payload || {};
  if (!vk_user_id || !/^\d+$/.test(String(vk_user_id)) || typeof score !== 'number' || score < 0) {
    return json({ success: false, error: 'Missing or invalid fields: vk_user_id, score' }, 400);
  }

  if (vk_sign_params) {
    const valid = await verifyVKSignature(vk_sign_params, env);
    if (!valid) return json({ success: false, error: 'Invalid VK signature' }, 403);
  }

  const session = await validateSession(env, payload);
  if (!session.ok) {
    return json({ success: false, error: session.error, cap: session.cap }, session.status);
  }

  const uid = String(vk_user_id);
  const rateKey = 'rate:' + uid;
  const lastSubmit = Number(await kv.get(rateKey)) || 0;
  if (Date.now() - lastSubmit < SUBMIT_MIN_INTERVAL_MS) {
    return json({ success: false, error: 'rate_limited', retry_in_ms: SUBMIT_MIN_INTERVAL_MS }, 429);
  }
  await kv.put(rateKey, String(Date.now()), { expirationTtl: 120 });

  const safeScore = cleanInt(score, 100000000);
  const userKey = 'user:' + uid;
  const existing = await kv.get(userKey, { type: 'json' });
  const existingScore = existing && Number(existing.score) || 0;

  if (safeScore > existingScore) {
    await kv.put(userKey, JSON.stringify(normalizeUser(payload, safeScore)));
    await kv.delete('_index');
  }

  const week = weekKeyOf(Date.now());
  const weekKey = 'week:' + week + ':user:' + uid;
  const weekExisting = await kv.get(weekKey, { type: 'json' });
  let weekUpdated = false;
  if (safeScore > (Number(weekExisting && weekExisting.score) || 0)) {
    await kv.put(weekKey, JSON.stringify(normalizeUser(payload, safeScore)), {
      expirationTtl: 90 * 86400
    });
    await kv.delete('_week_index:' + week);
    weekUpdated = true;
  }

  return json({
    success: true,
    updated: safeScore > existingScore,
    week_updated: weekUpdated,
    previous_score: existingScore,
    new_score: Math.max(existingScore, safeScore),
    week,
    score: Math.max(existingScore, safeScore)
  });
}

// ===== WEEKLY SEASON =====
async function ensureWeeklyRewards(env, week) {
  if (!isWeekKey(week)) return [];
  const kv = env.FRUIT_BLAST_LB;
  const key = 'wreward:' + week;
  const cached = await kv.get(key, { type: 'json' });
  if (Array.isArray(cached)) return cached;

  const top = (await scanScores(kv, 'week:' + week + ':')).slice(0, 3);
  const rewards = top.map((user, idx) => ({
    vk_user_id: user.vk_user_id,
    first_name: user.first_name || 'Игрок',
    last_name: user.last_name || '',
    score: user.score || 0,
    rank: idx + 1,
    diamonds: WEEKLY_REWARDS[idx] || 0
  }));
  await kv.put(key, JSON.stringify(rewards));
  return rewards;
}

async function weeklyStatus(env, url) {
  const uid = String(url.searchParams.get('vk_user_id') || '');
  if (!/^\d+$/.test(uid)) {
    return json({ success: false, error: 'vk_user_id required' }, 400);
  }
  const now = Date.now();
  const currentWeek = weekKeyOf(now);
  const previousWeek = weekKeyOf(now - 7 * 86400000);
  const rewards = await ensureWeeklyRewards(env, previousWeek);
  const mine = rewards.find(r => String(r.vk_user_id) === uid);

  let claimed = false;
  if (mine) {
    claimed = !!(await env.FRUIT_BLAST_LB.get('wclaim:' + previousWeek + ':' + uid));
  }

  return json({
    success: true,
    current_week: currentWeek,
    current_ends_at: nextWeekStartMs(now),
    previous_week: previousWeek,
    my_reward: mine ? mine.diamonds : 0,
    my_rank: mine ? mine.rank : null,
    claimed,
    rewards: rewards.map(r => ({
      rank: r.rank,
      score: r.score,
      first_name: r.first_name,
      last_name: r.last_name,
      diamonds: r.diamonds
    }))
  });
}

async function claimWeeklyReward(request, env) {
  const payload = await readBody(request);
  const uid = String(payload.vk_user_id || '');
  const week = String(payload.week || '');
  if (!/^\d+$/.test(uid) || !isWeekKey(week)) {
    return json({ success: false, error: 'vk_user_id and week required' }, 400);
  }
  const rewards = await ensureWeeklyRewards(env, week);
  const mine = rewards.find(r => String(r.vk_user_id) === uid);
  if (!mine) {
    return json({ success: false, error: 'no_reward' }, 404);
  }
  const claimKey = 'wclaim:' + week + ':' + uid;
  if (await env.FRUIT_BLAST_LB.get(claimKey)) {
    return json({ success: true, already: true, diamonds: 0, award: mine.diamonds });
  }
  await env.FRUIT_BLAST_LB.put(claimKey, String(Date.now()));
  return json({ success: true, already: false, diamonds: mine.diamonds, rank: mine.rank });
}

// ===== ANALYTICS =====
async function trackEvent(request, env) {
  const payload = await readBody(request);
  const name = String(payload.name || '');
  if (!ANALYTICS_EVENTS.has(name)) {
    return json({ success: false, error: 'unknown_event' }, 400);
  }
  const date = mskDateKey(Date.now());
  const key = 'evt:' + date;
  const counters = (await env.FRUIT_BLAST_LB.get(key, { type: 'json' })) || {};
  counters[name] = (Number(counters[name]) || 0) + 1;

  if (name === 'game_end') {
    const s = cleanInt(payload.score, 10000000);
    counters.score_sum = (Number(counters.score_sum) || 0) + s;
    counters.score_n = (Number(counters.score_n) || 0) + 1;
  }

  await env.FRUIT_BLAST_LB.put(key, JSON.stringify(counters), {
    expirationTtl: 40 * 86400
  });

  if (name === 'app_open' && payload.vk_user_id) {
    const uid = String(payload.vk_user_id);
    if (/^\d+$/.test(uid)) {
      const notifKey = 'notif:' + uid;
      const rec = await env.FRUIT_BLAST_LB.get(notifKey, { type: 'json' });
      if (rec && rec.enabled) {
        rec.last_seen = Date.now();
        await env.FRUIT_BLAST_LB.put(notifKey, JSON.stringify(rec), {
          expirationTtl: 60 * 86400
        });
      }
    }
  }

  return json({ success: true });
}

async function getStats(env) {
  const out = {};
  const now = Date.now();
  for (let i = 0; i < 7; i++) {
    const date = mskDateKey(now - i * 86400000);
    out[date] = (await env.FRUIT_BLAST_LB.get('evt:' + date, { type: 'json' })) || {};
  }
  return json({ success: true, days: out });
}

// ===== NOTIFICATIONS =====
async function registerNotifications(request, env) {
  const payload = await readBody(request);
  const uid = String(payload.vk_user_id || '');
  if (!/^\d+$/.test(uid)) return json({ success: false, error: 'vk_user_id required' }, 400);
  const record = {
    enabled: payload.enabled !== false,
    last_seen: Date.now(),
    created_at: Date.now()
  };
  await env.FRUIT_BLAST_LB.put('notif:' + uid, JSON.stringify(record), {
    expirationTtl: 60 * 86400
  });
  return json({ success: true, enabled: record.enabled });
}

async function unregisterNotifications(request, env) {
  const payload = await readBody(request);
  const uid = String(payload.vk_user_id || '');
  if (!/^\d+$/.test(uid)) return json({ success: false, error: 'vk_user_id required' }, 400);
  await env.FRUIT_BLAST_LB.delete('notif:' + uid);
  return json({ success: true, enabled: false });
}

async function sendDailyReminders(env) {
  const token = env.VK_SERVICE_TOKEN;
  if (!token) {
    console.log('[push] VK_SERVICE_TOKEN is not configured, reminders skipped');
    return;
  }
  const kv = env.FRUIT_BLAST_LB;
  const today = mskDateKey(Date.now());
  const now = Date.now();
  let cursor = null;
  let sent = 0;

  do {
    const list = await kv.list({ prefix: 'notif:', cursor, limit: 1000 });
    for (const key of list.keys) {
      const rec = await kv.get(key.name, { type: 'json' });
      if (!rec || !rec.enabled) continue;
      const lastSeen = Number(rec.last_seen) || 0;
      const lastNotifiedDate = rec.last_notified_date || '';
      if (lastNotifiedDate === today) continue;
      if (now - lastSeen < 20 * 3600 * 1000) continue;

      try {
        const body = new URLSearchParams({
          user_ids: key.name.slice('notif:'.length),
          message: '🍓 Твой ежедневный бонус в Fruit Blast ждёт! Заходи и забери алмазы.',
          fragment: 'streak',
          access_token: token,
          v: '5.199'
        });
        const res = await fetch('https://api.vk.com/method/notifications.sendMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        });
        const data = await res.json().catch(() => ({}));
        if (data && data.response) {
          sent++;
          rec.last_notified_date = today;
          await kv.put(key.name, JSON.stringify(rec), { expirationTtl: 60 * 86400 });
        } else {
          console.warn('[push] VK API rejected notification:', JSON.stringify(data && data.error));
        }
      } catch (e) {
        console.warn('[push] send failed:', e && e.message ? e.message : e);
      }
    }
    cursor = list.cursor;
  } while (cursor);

  console.log('[push] reminders sent:', sent);
}

// ===== VK PAYMENTS =====
async function handleVkPayment(request, env) {
  const payload = await readBody(request);
  const notificationType = String(payload.notification_type || '');
  const secret = env.PAYMENT_SECRET || env.CLIENT_SECRET || '';

  if (secret) {
    const valid = await verifyPaymentSignature(payload, secret);
    if (!valid) {
      console.warn('[pay] invalid signature for', notificationType);
      return json({ error: { error_code: 10, critical: true, error_msg: 'Invalid signature' } }, 403);
    }
  } else {
    console.warn('[pay] PAYMENT_SECRET is not configured, signature check skipped');
  }

  if (notificationType === 'get_item') {
    const itemId = String(payload.item || '');
    const item = PAYMENT_ITEMS[itemId];
    if (!item) {
      return json({ error: { error_code: 10, critical: false, error_msg: 'Unknown item' } });
    }
    return json({
      response: {
        title: item.title,
        price: item.price,
        photo_url: 'https://miroden4ik.github.io/Fruit-Blast/assets/icon-512.png',
        item_id: itemId,
        expiration: 0
      }
    });
  }

  if (notificationType === 'order_status_change') {
    const orderId = String(payload.order_id || '');
    const uid = String(payload.user_id || '');
    const itemId = String(payload.item || '');
    const status = String(payload.status || '');
    if (!orderId) {
      return json({ error: { error_code: 10, critical: false, error_msg: 'order_id required' } });
    }

    const orderKey = 'order:' + orderId;
    const existing = (await env.FRUIT_BLAST_LB.get(orderKey, { type: 'json' })) || null;
    const record = {
      order_id: orderId,
      app_order_id: existing && existing.app_order_id ? existing.app_order_id : Number(Date.now() % 2147483647),
      vk_user_id: uid,
      item: itemId,
      item_title: PAYMENT_ITEMS[itemId] ? PAYMENT_ITEMS[itemId].title : '',
      price: Number(payload.price) || 0,
      status,
      updated_at: Date.now(),
      created_at: existing && existing.created_at || Date.now()
    };
    await env.FRUIT_BLAST_LB.put(orderKey, JSON.stringify(record));
    return json({ response: { order_id: orderId, app_order_id: record.app_order_id } });
  }

  return json({ error: { error_code: 10, critical: false, error_msg: 'Unsupported notification' } });
}

async function verifyPaymentSignature(payload, secret) {
  try {
    const sign = String(payload.sig || '').toLowerCase();
    if (!sign) return false;
    const ordered = Object.keys(payload)
      .filter(k => k !== 'sig')
      .sort()
      .map(k => k + '=' + payload[k])
      .join('&');
    const expected = md5(ordered + secret);
    return expected === sign;
  } catch (e) {
    console.error('[pay] signature error:', e);
    return false;
  }
}

// ===== VK LAUNCH PARAMS SIGNATURE =====
async function verifyVKSignature(paramsStr, env) {
  const secret = env.CLIENT_SECRET || '';
  if (!secret) {
    console.warn('[auth] CLIENT_SECRET is not configured, launch signature check skipped');
    return true;
  }
  try {
    const params = new URLSearchParams(paramsStr);
    const sign = params.get('sign');
    if (!sign) return false;

    const ordered = [...params.entries()]
      .filter(([k]) => k !== 'sign')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => k + '=' + v)
      .join('&');

    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const raw = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(ordered));
    const hash = btoa(String.fromCharCode(...new Uint8Array(raw)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return hash === sign;
  } catch (e) {
    console.error('Signature verification error:', e);
    return false;
  }
}

// ===== DELETE (admin) =====
async function deleteUser(request, env) {
  const payload = await readBody(request);
  const adminKey = env.ADMIN_KEY || '';
  if (adminKey) {
    const provided = request.headers.get('X-Admin-Key') || payload.admin_key || '';
    if (provided !== adminKey) {
      return json({ success: false, error: 'forbidden' }, 403);
    }
  }
  const uid = String(payload.vk_user_id || '');
  if (!/^\d+$/.test(uid)) {
    return json({ success: false, error: 'Missing vk_user_id' }, 400);
  }
  const kv = env.FRUIT_BLAST_LB;
  const now = Date.now();
  await kv.delete('user:' + uid);
  await kv.delete('week:' + weekKeyOf(now) + ':user:' + uid);
  await kv.delete('week:' + weekKeyOf(now - 7 * 86400000) + ':user:' + uid);
  await kv.delete('notif:' + uid);
  await kv.delete('rate:' + uid);
  await kv.delete('_index');
  await kv.delete('_week_index:' + weekKeyOf(now));
  await kv.delete('_week_index:' + weekKeyOf(now - 7 * 86400000));
  return json({ success: true, deleted: uid });
}

// ===== MD5 (payment signature) =====
function md5(input) {
  function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function cmn(q, a, b, x, s, t) {
    return safeAdd(rol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function cycle(x, len) {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < x.length; i += 16) {
      const oa = a, ob = b, oc = c, od = d;

      a = ff(a, b, c, d, x[i], 7, -680876936);
      d = ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = ff(c, d, a, b, x[i + 10], 17, -42063);
      b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = gg(b, c, d, a, x[i], 20, -373897302);
      a = gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = hh(a, b, c, d, x[i + 5], 4, -378558);
      d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = hh(d, a, b, c, x[i], 11, -358537222);
      c = hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = ii(a, b, c, d, x[i], 6, -198630844);
      d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safeAdd(a, oa);
      b = safeAdd(b, ob);
      c = safeAdd(c, oc);
      d = safeAdd(d, od);
    }
    return [a, b, c, d];
  }

  const str = String(input);
  const bytes = new TextEncoder().encode(str);
  const words = [];
  for (let i = 0; i < bytes.length; i++) {
    words[i >> 2] = (words[i >> 2] || 0) | (bytes[i] << ((i % 4) * 8));
  }
  const result = cycle(words, bytes.length * 8);
  let hex = '';
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < 4; j++) {
      hex += ((result[i] >> (j * 8 + 4)) & 0x0f).toString(16);
      hex += ((result[i] >> (j * 8)) & 0x0f).toString(16);
    }
  }
  return hex;
}
