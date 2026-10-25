const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const CHROME = process.env.CHROME_PATH || 'C:\\Users\\Den\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe';
const OUT = process.env.E2E_OUT || path.join(os.tmpdir(), 'fruit-blast-e2e');
const PORT = Number(process.env.E2E_CDP_PORT || 9361);
const PROFILE = path.join(os.tmpdir(), 'fb-e2e-prof-' + Date.now());
const BASE = 'http://127.0.0.1:';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
});

fs.mkdirSync(OUT, { recursive: true });

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=' + PORT, '--user-data-dir=' + PROFILE, 'about:blank'
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));
const listen = () => new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});
let URL = '';

async function getTarget() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch('http://127.0.0.1:' + PORT + '/json/list');
      const list = await res.json();
      const page = list.find(t => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) {}
    await sleep(250);
  }
  throw new Error('no devtools target');
}

const results = [];
function check(name, cond, extra) {
  results.push({ name, ok: !!cond, extra });
  console.log((cond ? 'PASS  ' : 'FAIL  ') + name + (extra !== undefined ? '  ' + JSON.stringify(extra) : ''));
}

(async () => {
  await listen();
  URL = BASE + server.address().port + '/?v=e2e';
  const iconRes = await fetch(BASE + server.address().port + '/assets/icon-512.png');
  const iconBuf = Buffer.from(await iconRes.arrayBuffer());
  check('app icon asset served', iconRes.status === 200 && iconBuf.length > 1000, { status: iconRes.status, bytes: iconBuf.length });

  const wsUrl = await getTarget();
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const events = [];
  const consoleIssues = [];
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    } else if (msg.method) {
      events.push(msg);
      if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) {
        consoleIssues.push(msg.params.type + ': ' + msg.params.args.map(a => a.value || a.description || '').join(' '));
      } else if (msg.method === 'Runtime.exceptionThrown') {
        consoleIssues.push('exception: ' + (msg.params.exceptionDetails.text || '') + ' ' + (msg.params.exceptionDetails.exception?.description || ''));
      }
    }
  };
  await new Promise(r => { ws.onopen = r; });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
  const evalJs = async (expression, awaitPromise = false) => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception || r.exceptionDetails));
    return r.result.value;
  };
  const shot = async name => {
    await sleep(350);
    const r = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT, name), Buffer.from(r.data, 'base64'));
    console.log('saved', name);
  };
  const waitFor = async (expr, timeout = 9000) => {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      try { if (await evalJs(expr)) return true; } catch (e) {}
      await sleep(150);
    }
    return false;
  };
  const waitLoad = async () => {
    const start = events.length;
    for (let i = 0; i < 120; i++) {
      if (events.slice(start).some(e => e.method === 'Page.loadEventFired')) return;
      await sleep(100);
    }
    await sleep(1500);
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      (function () {
        try {
          localStorage.setItem('fruitBlastTutorialDoneV2', '1');
          localStorage.removeItem('fruitBlastActiveGame');
        } catch (e) {}
        window.__mockCalls = [];
        var realFetch = window.fetch ? window.fetch.bind(window) : null;
        var USERS = [
          { vk_user_id: 759468054, first_name: 'Денис', last_name: 'Юнацкий', photo_100: '', score: 6760 },
          { vk_user_id: 1118462162, first_name: 'Игорь', last_name: 'Иванов', photo_100: '', score: 1200 },
          { vk_user_id: 222, first_name: 'Саша', last_name: 'Филиппов', photo_100: '', score: 12225 },
          { vk_user_id: 333, first_name: 'Аня', last_name: 'Смирнова', photo_100: '', score: 900 },
          { vk_user_id: 444, first_name: 'Максим', last_name: 'Петров', photo_100: '', score: 400 }
        ];
        window.fetch = function (input, init) {
          var url = typeof input === 'string' ? input : (input && input.url) || '';
          if (url.indexOf('workers.dev') === -1) {
            return realFetch ? realFetch(input, init) : Promise.reject(new Error('no fetch'));
          }
          var u = new URL(url);
          var body = null;
          try { body = init && init.body ? JSON.parse(init.body) : null; } catch (e) {}
          window.__mockCalls.push({ path: u.pathname, query: u.search, body: body, at: Date.now() });
          if (window.__failSession && u.pathname === '/session/start') {
            return Promise.resolve(new Response('{"success":false}', { status: 500, headers: { 'Content-Type': 'application/json' } }));
          }
          var out = { success: true };
          if (u.pathname === '/leaderboard') {
            out = { success: true, leaderboard: USERS.slice() };
          } else if (u.pathname === '/weekly/status') {
            out = {
              success: true,
              current_week: '2026-W43',
              current_ends_at: Date.now() + 3 * 86400000,
              previous_week: '2026-W42',
              my_reward: 150,
              my_rank: 1,
              claimed: false,
              rewards: [
                { rank: 1, score: 12225, first_name: 'Саша', last_name: 'Филиппов', diamonds: 150 },
                { rank: 2, score: 6760, first_name: 'Денис', last_name: 'Юнацкий', diamonds: 100 },
                { rank: 3, score: 400, first_name: 'Максим', last_name: 'Петров', diamonds: 60 }
              ]
            };
          } else if (u.pathname === '/weekly/claim') {
            out = { success: true, already: false, diamonds: 150, rank: 1 };
          } else if (u.pathname === '/session/start') {
            out = { success: true, token: 'abcdef0123456789abcdef0123456789' };
          } else if (u.pathname === '/submit') {
            var n = window.__mockCalls.filter(function (c) { return c.path === '/submit'; }).length;
            out = n === 1
              ? { success: false, error: 'session_too_early' }
              : { success: true, updated: true, new_score: (body && body.score) || 0, week: '2026-W43' };
          } else if (u.pathname === '/event') {
            out = { success: true };
          }
          return Promise.resolve(new Response(JSON.stringify(out), { status: 200, headers: { 'Content-Type': 'application/json' } }));
        };
      })();
    `
  });

  async function setViewport(width, height, mobile) {
    await send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: mobile ? 2 : 1, mobile,
      screenWidth: width, screenHeight: height
    });
  }

  // ===== 1. BOOT / STREAK (mobile 390x844) =====
  await setViewport(390, 844, true);
  await send('Page.navigate', { url: URL });
  await waitLoad();
  const booted = await waitFor("!!(window._pg && document.getElementById('daily-chip') && !document.getElementById('loading-overlay'))", 12000);
  check('boot without loader, _pg loaded', booted);
  check('streak popup auto-opened after boot', await waitFor("!!document.querySelector('#pg-streak-modal.active')", 6000));
  const chipBoot = await evalJs(`(() => {
    const c = document.getElementById('daily-chip');
    const r = c && c.getBoundingClientRect();
    const d = document.getElementById('daily-chip-dot');
    return { exists: !!c, ready: c && c.classList.contains('ready'), day: (document.getElementById('daily-chip-day')||{}).textContent,
             dot: d ? getComputedStyle(d).display : null, rect: r ? {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)} : null };
  })()`);
  check('daily chip ready with +5', chipBoot.exists && chipBoot.ready && chipBoot.day === '+5' && chipBoot.dot === 'block', chipBoot);
  await shot('fb-v3-streak.png');

  const beforeClaim = await evalJs('diamonds');
  await evalJs("document.querySelector('[data-pg-action=\"claim-streak\"]').click()");
  await sleep(500);
  const afterClaim = await evalJs(`({ diamonds: diamonds, st: JSON.parse(localStorage.getItem('fruitBlastProgression')).streak,
      chipReady: document.getElementById('daily-chip').classList.contains('ready'),
      dot: getComputedStyle(document.getElementById('daily-chip-dot')).display,
      btn: document.querySelector('#pg-streak-modal .pg-primary-btn').textContent })`);
  check('streak claim adds 5 diamonds', afterClaim.diamonds === beforeClaim + 5, { beforeClaim, afterClaim });
  check('streak state day=1 and chip not ready', afterClaim.st.day === 1 && !afterClaim.chipReady && afterClaim.dot === 'none', afterClaim);
  await shot('fb-v3-streak-claimed.png');
  await evalJs("document.querySelector('#pg-streak-modal [data-pg-close]').click()");
  await sleep(300);

  // ===== 2. ACHIEVEMENTS =====
  await evalJs("window._pg.showAchievements()");
  await sleep(350);
  const achInfo = await evalJs(`(() => ({
    open: !!document.querySelector('#pg-ach-modal.active'),
    total: document.querySelectorAll('#pg-ach-modal .pg-ach').length,
    unlocked: document.querySelectorAll('#pg-ach-modal .pg-ach.unlocked').length,
    badge: document.getElementById('profile-ach-count') ? document.getElementById('profile-ach-count').textContent : null
  }))()`);
  check('achievements modal renders 15 items', achInfo.open && achInfo.total === 15, achInfo);
  await shot('fb-v3-achievements.png');
  await evalJs("document.querySelector('#pg-ach-modal [data-pg-close]').click()");
  await sleep(250);
  const dBeforeAch = await evalJs('diamonds');
  await evalJs("gameStats.bestScore = 5000; window._pg.evaluateAchievements();");
  await sleep(900);
  await evalJs("document.getElementById('user-info').click()");
  await sleep(900);
  const achAfter = await evalJs(`({ diamonds: diamonds, st: JSON.parse(localStorage.getItem('fruitBlastProgression')),
      badge: (document.getElementById('profile-ach-count')||{}).textContent || null,
      notifBtn: (document.getElementById('profile-notifications-btn')||{}).textContent || null,
      profileOpen: !!document.querySelector('#profile-modal.active'),
      toasts: document.querySelectorAll('#pg-toast-stack .pg-toast').length })`);
  check('achievement score_5000 unlocks with +20', !!achAfter.st.achievements.unlocked.score_5000 && achAfter.diamonds === dBeforeAch + 20, { dBeforeAch, diamonds: achAfter.diamonds, toast: achAfter.toasts });
  check('achievements badge updated', /^1\/15$/.test(achAfter.badge || ''), achAfter.badge);
  check('profile has notifications button', /НАПОМИНАНИЯ/.test(achAfter.notifBtn || ''), { notifBtn: achAfter.notifBtn, profileOpen: achAfter.profileOpen });
  await shot('fb-v3-profile.png');
  await evalJs("document.getElementById('profile-close-btn').click()");
  await sleep(350);

  // ===== 3. DAILY CAP =====
  const capRes = await evalJs(`(() => {
    const a = window._pg.allowGameplayDiamonds(50);
    const b = window._pg.allowGameplayDiamonds(50);
    const c = window._pg.allowGameplayDiamonds(5);
    const d0 = diamonds;
    addDiamonds(100, 'play');
    const dAfterPlay = diamonds;
    addDiamonds(5, 'reward');
    return { a, b, c, cap: JSON.parse(localStorage.getItem('fruitBlastProgression')).cap, d0, dAfterPlay, dReward: diamonds };
  })()`);
  check('daily gameplay cap 60 enforced', capRes.a === 50 && capRes.b === 10 && capRes.c === 0 && capRes.cap.earned === 60, capRes);
  check('capped play diamonds add nothing, rewards exempt', capRes.dAfterPlay === capRes.d0 && capRes.dReward === capRes.d0 + 5, capRes);

  // ===== 4. STORE / PURCHASES =====
  await evalJs("document.getElementById('store-btn').click()");
  await sleep(500);
  const storeInfo = await evalJs(`(() => ({
    open: document.getElementById('store-modal').classList.contains('active'),
    cap: document.getElementById('store-daily-cap').textContent,
    prices: [...document.querySelectorAll('.booster-store-card')].map(c => c.dataset.price),
    packs: [...document.querySelectorAll('.diamond-pay-btn')].map(b => b.dataset.pack)
  }))()`);
  check('store opens with cap line and new prices', storeInfo.open && /60 \/ 60/.test(storeInfo.cap) && storeInfo.prices.join(',') === '15,25,20', storeInfo);
  check('store lists 6 diamond packs', storeInfo.packs.length === 6, storeInfo.packs);
  await shot('fb-v3-store.png');
  await evalJs("document.querySelector('.booster-store-card[data-store-booster=\"hammer\"] .store-card-add').click()");
  await sleep(300);
  check('booster purchase bar opens', await evalJs("document.getElementById('purchase-bar') && !document.getElementById('purchase-bar').classList.contains('hidden')"));
  const outsideVk = await evalJs(`(() => { window._pg.purchaseItem('hammer_pack'); return (document.querySelector('.board-message')||{}).textContent || ''; })()`);
  check('purchase outside VK shows fallback message', /только в VK/i.test(outsideVk), outsideVk);
  await evalJs("document.getElementById('store-close-btn').click()");
  await sleep(300);

  const stub = await evalJs(`(() => {
    window.__origVkAvailable = vkAvailable;
    window.__origVkBridge = window.vkBridge;
    vkAvailable = function () { return true; };
    window.vkBridge = { send: function () { return Promise.resolve({ success: true, result: true }); } };
    return { vk: vkAvailable(), bridge: typeof vkBridge.send };
  })()`);
  check('VK bridge stubbed for purchase test', stub.vk === true && stub.bridge === 'function', stub);
  const hBeforeBuy = await evalJs('boosters.hammer');
  await evalJs("window._pg.purchaseItem('hammer_pack')");
  await sleep(500);
  const buyPack = await evalJs(`({ h: boosters.hammer, d: diamonds, purchases: JSON.parse(localStorage.getItem('fruitBlastProgression')).counters.purchases,
      buyer: !!JSON.parse(localStorage.getItem('fruitBlastProgression')).achievements.unlocked.buyer_1,
      msg: (document.querySelector('.board-message')||{}).textContent || '' })`);
  check('booster pack purchase credits 6 hammers', buyPack.h === hBeforeBuy + 6 && buyPack.purchases === 1, buyPack);
  check('first purchase unlocks buyer achievement (+50)', buyPack.buyer === true, buyPack);
  const dAfterPack = buyPack.d;
  await evalJs("window._pg.purchaseItem('diam_small')");
  await sleep(500);
  const buyDiam = await evalJs(`({ d: diamonds, purchases: JSON.parse(localStorage.getItem('fruitBlastProgression')).counters.purchases })`);
  check('diamond pack purchase credits 60', buyDiam.d === dAfterPack + 60 && buyDiam.purchases === 2, { dAfterPack, buyDiam });
  await evalJs("vkAvailable = window.__origVkAvailable; window.vkBridge = window.__origVkBridge;");
  await sleep(4200);

  // ===== 5. LEADERBOARD PERIODS + WEEKLY CLAIM =====
  await evalJs("currentUser.vk_user_id = 759468054; currentUser.first_name = 'Денис'; currentUser.last_name = 'Юнацкий';");
  await evalJs("document.getElementById('leaderboard-btn').click()");
  const lbAll = await waitFor("document.querySelector('#leaderboard-modal.active') && !document.querySelector('#leaderboard-list .lb-loading')", 8000);
  check('leaderboard all-time loads', lbAll);
  const lbAllInfo = await evalJs(`(() => ({
    rows: document.querySelectorAll('#leaderboard-list .lb-list-row').length,
    podium: document.querySelectorAll('#leaderboard-list .lb-podium-slot').length,
    self: !!document.querySelector('#leaderboard-list .lb-self-card'),
    tabs: document.querySelectorAll('#lb-tabs .lb-tab').length,
    weekHidden: getComputedStyle(document.getElementById('weekly-status')).display === 'none'
  }))()`);
  check('all-time tab renders podium/rows and hides week card', lbAllInfo.rows >= 1 && lbAllInfo.tabs === 2 && lbAllInfo.weekHidden, lbAllInfo);
  await shot('fb-v3-lb-all.png');

  await evalJs("document.querySelector('#lb-tabs .lb-tab[data-period=\"week\"]').click()");
  const weekReady = await waitFor("document.querySelector('#weekly-status .weekly-card') && !document.querySelector('#weekly-status .weekly-loading')", 8000);
  check('week tab loads weekly card', weekReady);
  const weekInfo = await evalJs(`(() => ({
    chips: document.querySelectorAll('#weekly-status .weekly-reward-chip').length,
    claim: (document.querySelector('#weekly-status .weekly-claim-btn')||{}).textContent,
    active: (document.querySelector('#lb-tabs .lb-tab.active')||{}).dataset.period,
    weekCalls: window.__mockCalls.filter(c => c.path === '/weekly/status').length,
    filtered: window.__mockCalls.filter(c => c.path === '/leaderboard' && c.query.indexOf('period=week') >= 0).length
  }))()`);
  check('weekly card has 3 rewards and claim button', weekInfo.chips === 3 && weekInfo.claim === 'ЗАБРАТЬ' && weekInfo.active === 'week', weekInfo);
  check('weekly status and week leaderboard requested', weekInfo.weekCalls >= 1 && weekInfo.filtered >= 1, weekInfo);
  await shot('fb-v3-lb-week.png');
  const dBeforeWeek = await evalJs('diamonds');
  await evalJs("document.querySelector('#weekly-status .weekly-claim-btn').click()");
  await sleep(700);
  const weekAfter = await evalJs(`({ d: diamonds,
    done: !!document.querySelector('#weekly-status .weekly-claim-row.done'),
    st: JSON.parse(localStorage.getItem('fruitBlastProgression')).counters.weeklyClaims,
    toast: (document.querySelector('#pg-toast-stack .pg-toast')||{}).textContent || '' })`);
  check('weekly claim credits 150 diamonds once', weekAfter.d === dBeforeWeek + 150 && weekAfter.done && weekAfter.st === 1, { dBeforeWeek, weekAfter });
  await sleep(3600);
  await shot('fb-v3-lb-week-claimed.png');
  await evalJs("document.getElementById('leaderboard-close-btn').click()");
  await sleep(300);

  // ===== 6. ANTI-CHEAT SESSION + SUBMIT RETRY =====
  const baseline = await evalJs(`({ starts: window.__mockCalls.filter(c => c.path === '/session/start').length,
    submits: window.__mockCalls.filter(c => c.path === '/submit').length })`);
  await evalJs("window._pg.onGameStart({ resumed: false });");
  await sleep(700);
  const sess = await evalJs(`(() => { const s = window._pg.getSessionData();
    const starts = window.__mockCalls.filter(c => c.path === '/session/start');
    return { token: s.session_token, play: s.play_time,
      starts: starts.length,
      startBody: (starts[starts.length - 1] || {}).body }; })()`);
  check('game start requests anti-cheat session', /^[a-f0-9]{32}$/.test(sess.token || '') && sess.starts === baseline.starts + 1, sess);
  await sleep(2200);
  await evalJs("submitLeaderboard(1500)");
  await sleep(3200);
  const submits = await evalJs(`(() => {
    const calls = window.__mockCalls.filter(c => c.path === '/submit');
    return { n: calls.length, bodies: calls.map(c => c.body) };
  })()`);
  submits.bodies = submits.bodies.slice(baseline.submits);
  const first = submits.bodies[0] || {};
  check('submit carries session token and play_time', submits.bodies.length >= 1 && first.session_token === sess.token && Number(first.play_time) > 0, { n: submits.bodies.length, token: first.session_token, play_time: first.play_time });
  check('session_too_early retried with token', submits.bodies.length >= 2 && submits.bodies[1] && submits.bodies[1].session_token === sess.token && Number(submits.bodies[1].play_time) > 0, { n: submits.bodies.length });

  // Legacy worker (no /session/start): submit must still go out, without token.
  await evalJs("(() => { window.__failSession = true; window._pg.resetSession(); submitLeaderboard(4321); return true; })()");
  const legacySeen = await waitFor("!!window.__mockCalls.filter(c => c.path === '/submit' && c.body && c.body.score === 4321).length", 8000);
  const legacy = await evalJs(`(() => {
    const b = window.__mockCalls.filter(c => c.path === '/submit' && c.body && c.body.score === 4321).pop();
    return b ? { token: b.body.session_token, play: b.body.play_time } : null;
  })()`);
  check('legacy worker fallback submits without session token', legacySeen && !!legacy && legacy.token === null, legacy);
  await evalJs("window.__failSession = false");

  // ===== 7. ANALYTICS EVENTS =====
  const evts = await evalJs(`window.__mockCalls.filter(c => c.path === '/event').map(c => c.body && c.body.name)`);
  const wanted = ['app_open', 'game_start', 'streak_claim', 'achievement_unlock', 'daily_cap', 'purchase_success', 'leaderboard_open', 'weekly_claim'];
  const missing = wanted.filter(e => evts.indexOf(e) === -1);
  check('analytics whitelist events fired', missing.length === 0, { fired: [...new Set(evts)], missing });

  // ===== 8. LAYOUTS =====
  const layouts = [
    { name: 'mobile-390x844', w: 390, h: 844, mobile: true, wide: false },
    { name: 'mobile-360x800', w: 360, h: 800, mobile: true, wide: false },
    { name: 'desktop-1280x900', w: 1280, h: 900, mobile: false, wide: true },
    { name: 'desktop-1106x700', w: 1106, h: 700, mobile: false, wide: true },
    { name: 'desktop-1024x640', w: 1024, h: 640, mobile: false, wide: true }
  ];
  for (const l of layouts) {
    await setViewport(l.w, l.h, l.mobile);
    await sleep(650);
    const m = await evalJs(`(() => {
      const r = el => { const b = el && el.getBoundingClientRect(); return b ? { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), right: Math.round(b.right), bottom: Math.round(b.bottom) } : null; };
      return {
        inner: [innerWidth, innerHeight],
        scrollW: document.documentElement.scrollWidth,
        board: r(document.getElementById('game-board')),
        header: r(document.querySelector('.game-header')),
        controls: r(document.querySelector('.controls')),
        boost: r(document.getElementById('boost-panel')),
        chip: r(document.getElementById('daily-chip')),
        info: r(document.getElementById('user-info')),
        timer: document.getElementById('timer').textContent
      };
    })()`);
    const fits = m.board && m.board.bottom <= m.inner[1] + 1 && m.controls && m.controls.bottom <= m.inner[1] + 1 && m.boost && m.boost.bottom <= m.inner[1] + 1;
    const noScroll = m.scrollW <= m.inner[0] + 1;
    const twoCol = l.wide ? (m.board.right <= m.info.x + 2 && m.header.x >= m.board.right) : true;
    const chipInView = m.chip && m.chip.x >= 0 && m.chip.right <= m.inner[0] + 1 && m.chip.y >= 0;
    check('layout ' + l.name, fits && noScroll && twoCol && chipInView, { fits, noScroll, twoCol, chipInView, board: m.board, controls: m.controls, boost: m.boost, chip: m.chip, scrollW: m.scrollW });
    await shot('fb-v3-' + l.name + '.png');
  }

  // ===== 9. CONSOLE =====
  const realIssues = consoleIssues.filter(s => !/VKWebApp|vk-bridge|WebSocket|favicon/i.test(s));
  check('no console errors/warnings', realIssues.length === 0, realIssues);

  const passed = results.filter(r => r.ok).length;
  console.log('\n' + passed + '/' + results.length + ' checks passed');
  fs.writeFileSync(path.join(OUT, 'fb-v3-results.json'), JSON.stringify({ results, consoleIssues }, null, 2));

  await send('Browser.close').catch(() => {});
  ws.close();
  chrome.kill();
  server.close();
  process.exit(passed === results.length ? 0 : 2);
})().catch(err => {
  console.error('FAIL', err);
  try { chrome.kill(); } catch (e) {}
  try { server.close(); } catch (e) {}
  process.exit(1);
});
