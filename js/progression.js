// Fruit Blast — daily streak, achievements, weekly season, push, analytics,
// purchases and anti-cheat session glue.
(function () {
    'use strict';

    const PG_KEY = 'fruitBlastProgression';
    const PG_VERSION = 1;
    const STREAK_REWARDS = [5, 10, 15, 20, 25, 30, 40];
    const DAILY_CAP = 60;

    const ITEMS = {
        diam_small:   { kind: 'diamonds', qty: 60 },
        diam_small2:  { kind: 'diamonds', qty: 150 },
        diam_medium:  { kind: 'diamonds', qty: 300 },
        diam_big:     { kind: 'diamonds', qty: 700 },
        diam_large:   { kind: 'diamonds', qty: 1200 },
        diam_mega:    { kind: 'diamonds', qty: 2500 },
        hammer_pack:  { kind: 'booster', booster: 'hammer', qty: 6 },
        rocket_pack:  { kind: 'booster', booster: 'rocket', qty: 5 },
        swap_pack:    { kind: 'booster', booster: 'swap',   qty: 5 }
    };

    let pgReady = false;
    let capNotified = false;
    let autoStreakShown = false;
    let weeklyData = null;
    let weeklyLoading = false;
    let session = { token: null, starting: null, uid: null };
    let state = defaultState();

    function defaultState() {
        return {
            version: PG_VERSION,
            streak: { lastClaim: '', day: 0, best: 0 },
            achievements: { unlocked: {} },
            counters: { adsWatched: 0, purchases: 0, boostersUsed: 0, shares: 0, weeklyClaims: 0 },
            cap: { date: '', earned: 0 },
            notifications: false,
            updatedAt: 0
        };
    }

    // ===== helpers =====
    function pad2(n) { return String(n).padStart(2, '0'); }

    function todayKey() {
        const d = new Date();
        return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
    }

    function dateKeyToMs(key) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(key || ''))) return 0;
        const p = key.split('-').map(Number);
        return Date.UTC(p[0], p[1] - 1, p[2]);
    }

    function daysBetween(fromKey, toKey) {
        const a = dateKeyToMs(fromKey);
        const b = dateKeyToMs(toKey);
        if (!a || !b) return 999;
        return Math.round((b - a) / 86400000);
    }

    function num(v) {
        const n = Number(v);
        return isFinite(n) ? n : 0;
    }

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
        });
    }

    function workerUrl() {
        try {
            if (typeof CONFIG !== 'undefined' && CONFIG.WORKER_URL &&
                !CONFIG.WORKER_URL.includes('REPLACE_WITH_YOUR_WORKER_URL')) {
                return CONFIG.WORKER_URL.replace(/\/$/, '');
            }
        } catch (e) {}
        return null;
    }

    function uid() {
        try { return currentUser && currentUser.vk_user_id ? String(currentUser.vk_user_id) : ''; }
        catch (e) { return ''; }
    }

    function safeShowMessage(text) {
        try { if (typeof showMessage === 'function') showMessage(text); } catch (e) {}
    }

    function safeAddDiamonds(n, source) {
        try { if (typeof addDiamonds === 'function') addDiamonds(n, source); } catch (e) {}
    }

    // ===== persistence =====
    function normalizeState(raw) {
        const out = defaultState();
        if (!raw || typeof raw !== 'object') return out;
        const s = raw.streak || {};
        out.streak.lastClaim = /^\d{4}-\d{2}-\d{2}$/.test(String(s.lastClaim || '')) ? String(s.lastClaim) : '';
        out.streak.day = Math.max(0, Math.min(7, Math.floor(num(s.day))));
        out.streak.best = Math.max(out.streak.day, Math.min(7, Math.floor(num(s.best))));
        const unlocked = raw.achievements && raw.achievements.unlocked;
        if (unlocked && typeof unlocked === 'object') {
            Object.keys(unlocked).forEach(function (id) {
                if (unlocked[id]) out.achievements.unlocked[id] = num(unlocked[id]) || 1;
            });
        }
        const c = raw.counters || {};
        out.counters.adsWatched = Math.max(0, Math.floor(num(c.adsWatched)));
        out.counters.purchases = Math.max(0, Math.floor(num(c.purchases)));
        out.counters.boostersUsed = Math.max(0, Math.floor(num(c.boostersUsed)));
        out.counters.shares = Math.max(0, Math.floor(num(c.shares)));
        out.counters.weeklyClaims = Math.max(0, Math.floor(num(c.weeklyClaims)));
        const cap = raw.cap || {};
        out.cap.date = /^\d{4}-\d{2}-\d{2}$/.test(String(cap.date || '')) ? String(cap.date) : '';
        out.cap.earned = Math.max(0, Math.floor(num(cap.earned)));
        out.notifications = !!raw.notifications;
        out.updatedAt = num(raw.updatedAt);
        return out;
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(PG_KEY);
            state = normalizeState(raw ? JSON.parse(raw) : null);
        } catch (e) {
            state = defaultState();
        }
        normalizeCapDay();
    }

    function saveState(bumpCloud) {
        state.updatedAt = Date.now();
        try { localStorage.setItem(PG_KEY, JSON.stringify(state)); } catch (e) {}
        if (bumpCloud !== false) {
            try { if (typeof cloudSync_markDirty === 'function') cloudSync_markDirty(); } catch (e) {}
        }
    }

    function serialize() {
        return JSON.stringify(state);
    }

    function mergeRemote(remote) {
        if (!remote) return false;
        let r = remote;
        if (typeof remote === 'string') {
            try { r = JSON.parse(remote); } catch (e) { return false; }
        }
        if (!r || typeof r !== 'object') return false;
        const remoteState = normalizeState(r);
        let changed = false;

        // Streak: more recent claim wins; same day → stronger progress.
        const ls = state.streak;
        const rs = remoteState.streak;
        if (rs.lastClaim && (!ls.lastClaim || rs.lastClaim > ls.lastClaim)) {
            state.streak.lastClaim = rs.lastClaim;
            state.streak.day = rs.day;
            changed = true;
        } else if (rs.lastClaim && rs.lastClaim === ls.lastClaim) {
            if (rs.day > ls.day) { state.streak.day = rs.day; changed = true; }
        }
        if (rs.best > state.streak.best) { state.streak.best = rs.best; changed = true; }

        // Achievements: union (never revoke).
        Object.keys(remoteState.achievements.unlocked).forEach(function (id) {
            if (!state.achievements.unlocked[id]) {
                state.achievements.unlocked[id] = remoteState.achievements.unlocked[id];
                changed = true;
            }
        });

        // Counters: max.
        Object.keys(state.counters).forEach(function (k) {
            if (remoteState.counters[k] > state.counters[k]) {
                state.counters[k] = remoteState.counters[k];
                changed = true;
            }
        });

        // Daily cap: only today's counter matters.
        normalizeCapDay();
        if (remoteState.cap.date === state.cap.date && remoteState.cap.earned > state.cap.earned) {
            state.cap.earned = remoteState.cap.earned;
            changed = true;
        }
        if (remoteState.notifications && !state.notifications) {
            state.notifications = true;
            changed = true;
        }

        if (changed) {
            saveState(false);
            refreshUI();
        }
        return changed;
    }

    function normalizeCapDay() {
        const today = todayKey();
        if (state.cap.date !== today) {
            state.cap.date = today;
            state.cap.earned = 0;
        }
    }

    // ===== analytics =====
    function track(name, props) {
        const base = workerUrl();
        if (!base) return;
        const payload = { name: name, vk_user_id: uid() || null };
        if (props && typeof props === 'object') {
            Object.keys(props).forEach(function (k) {
                if (props[k] !== undefined && typeof props[k] !== 'object') payload[k] = props[k];
            });
        }
        try {
            fetch(base + '/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true
            }).catch(function () {});
        } catch (e) {}
    }

    // ===== anti-cheat session =====
    function startSession() {
        if (session.starting) return session.starting;
        const u = uid();
        const base = workerUrl();
        if (!u || !base) return Promise.resolve(false);
        if (session.token && session.uid === u) return Promise.resolve(true);
        session.uid = u;
        session.starting = fetch(base + '/session/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                vk_user_id: u,
                vk_sign_params: (typeof vkSignParamsStr !== 'undefined' && vkSignParamsStr) ? vkSignParamsStr : null
            })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data && data.success && data.token) {
                session.token = data.token;
                return true;
            }
            session.token = null;
            return false;
        }).catch(function () {
            session.token = null;
            return false;
        }).then(function (ok) {
            session.starting = null;
            return ok;
        });
        return session.starting;
    }

    function resetSession() {
        session.token = null;
        session.uid = null;
        session.starting = null;
    }

    function getSessionData() {
        let playTime = 0;
        try { playTime = Math.max(0, Math.floor(num(playSecondsThisGame))); } catch (e) {}
        return {
            session_token: session.token,
            play_time: playTime
        };
    }

    function onGameStart(opts) {
        resetSession();
        startSession();
        track('game_start', { resumed: !!(opts && opts.resumed) });
    }

    // ===== daily cap =====
    function allowGameplayDiamonds(n) {
        n = Math.max(0, Math.floor(num(n)));
        if (!pgReady || n <= 0) return n;
        normalizeCapDay();
        const left = Math.max(0, DAILY_CAP - state.cap.earned);
        const allowed = Math.min(n, left);
        if (allowed > 0) {
            state.cap.earned += allowed;
            saveState();
            updateCapUI();
        }
        if (allowed < n) {
            track('daily_cap', { earned: state.cap.earned });
            if (!capNotified) {
                capNotified = true;
                safeShowMessage('Дневной лимит: ' + DAILY_CAP + ' 💎. Возвращайтесь завтра!');
            }
        }
        return allowed;
    }

    function updateCapUI() {
        normalizeCapDay();
        const el = document.getElementById('store-daily-cap');
        if (el) el.textContent = 'Лимит игры: ' + state.cap.earned + ' / ' + DAILY_CAP + ' 💎';
    }

    // ===== daily streak =====
    function streakNextDay() {
        const today = todayKey();
        const last = state.streak.lastClaim;
        if (last === today) return null;
        if (!last) return 1;
        const diff = daysBetween(last, today);
        if (diff === 1) {
            if (state.streak.day >= 7) return 1;
            return Math.max(1, state.streak.day + 1);
        }
        return 1;
    }

    function refreshDailyChip() {
        const chip = document.getElementById('daily-chip');
        const dayEl = document.getElementById('daily-chip-day');
        const dot = document.getElementById('daily-chip-dot');
        if (!chip) return;
        const next = streakNextDay();
        if (dayEl) dayEl.textContent = next ? ('+' + STREAK_REWARDS[next - 1]) : (state.streak.day + '/7');
        if (dot) dot.style.display = next ? 'block' : 'none';
        chip.classList.toggle('ready', !!next);
        chip.title = next
            ? 'Забрать ежедневный бонус: +' + STREAK_REWARDS[next - 1] + ' 💎'
            : 'Ежедневный бонус получен. Серия: ' + state.streak.day + '/7';
    }

    function streakCardsHtml() {
        const next = streakNextDay();
        const claimedToday = !next;
        const activeDay = claimedToday ? state.streak.day : next;
        let html = '<div class="pg-streak-days">';
        for (let i = 1; i <= 7; i++) {
            let cls = 'pg-streak-day';
            if (claimedToday && i <= activeDay) cls += ' claimed';
            else if (!claimedToday && next !== null && i < next) cls += ' past';
            if (i === activeDay) cls += ' today';
            if (i === 7) cls += ' final';
            html += '<div class="' + cls + '">' +
                '<div class="pg-streak-day-num">День ' + i + '</div>' +
                '<div class="pg-streak-day-reward">+' + STREAK_REWARDS[i - 1] + ' 💎</div>' +
                (claimedToday && i <= activeDay ? '<div class="pg-streak-check">✓</div>' : '') +
                '</div>';
        }
        html += '</div>';
        return html;
    }

    function streakContentHtml() {
        const next = streakNextDay();
        const dayLabel = next ? ('Серия: ' + (next - 1) + ' → ' + next + ' / 7') : ('Серия: ' + state.streak.day + ' / 7');
        return '' +
            '<button class="pg-modal-x" data-pg-close aria-label="Закрыть">×</button>' +
            '<h2 class="pg-modal-title">ЕЖЕДНЕВНЫЙ БОНУС</h2>' +
            '<div class="pg-modal-sub">🔥 ' + esc(dayLabel) +
            (state.streak.best > 1 ? ' · рекорд серии: ' + state.streak.best : '') + '</div>' +
            streakCardsHtml() +
            (next
                ? '<button class="pg-primary-btn" data-pg-action="claim-streak">ЗАБРАТЬ +' + STREAK_REWARDS[next - 1] + ' 💎</button>'
                : '<button class="pg-primary-btn" disabled>БОНУС ПОЛУЧЕН · ЖДЁМ ЗАВТРА</button>') +
            '<div class="pg-modal-note">Пропущенный день сбрасывает серию. На 7-й день — ' + STREAK_REWARDS[6] + ' 💎.</div>';
    }

    function showStreak() {
        const existing = document.getElementById('pg-streak-modal');
        if (existing) existing.remove();
        openModal('pg-streak-modal', streakContentHtml());
    }

    function claimStreak() {
        const next = streakNextDay();
        if (!next) return;
        const reward = STREAK_REWARDS[next - 1];
        state.streak.lastClaim = todayKey();
        state.streak.day = next;
        state.streak.best = Math.max(state.streak.best, next);
        saveState();
        safeAddDiamonds(reward, 'reward');
        track('streak_claim', { day: next, diamonds: reward });
        toast('🔥 Бонус дня ' + next, '+' + reward + ' 💎');
        refreshDailyChip();
        evaluateAchievements();
        const modal = document.getElementById('pg-streak-modal');
        if (modal) {
            const card = modal.querySelector('.pg-modal-card');
            if (card) card.innerHTML = streakContentHtml();
        }
    }

    // ===== achievements =====
    function stat(name) {
        try { return Math.max(0, Math.floor(num(gameStats && gameStats[name]))); } catch (e) { return 0; }
    }

    const ACHIEVEMENTS = [
        { id: 'first_game',  icon: '🎮', title: 'Первый шаг',      desc: 'Сыграть первую игру',          target: 1,     reward: 10, value: function () { return stat('gamesPlayed'); } },
        { id: 'games_10',    icon: '🕹️', title: 'Завсегдатай',     desc: 'Сыграть 10 игр',               target: 10,    reward: 20, value: function () { return stat('gamesPlayed'); } },
        { id: 'games_50',    icon: '🏅', title: 'Ветеран',         desc: 'Сыграть 50 игр',               target: 50,    reward: 50, value: function () { return stat('gamesPlayed'); } },
        { id: 'score_5000',  icon: '🏆', title: 'Рекордсмен',      desc: 'Набрать 5 000 очков',          target: 5000,  reward: 20, value: function () { return stat('bestScore'); } },
        { id: 'score_10000', icon: '👑', title: 'Легенда',         desc: 'Набрать 10 000 очков',         target: 10000, reward: 50, value: function () { return stat('bestScore'); } },
        { id: 'combo_5',     icon: '🔥', title: 'Комбо-мастер',    desc: 'Собрать комбо x5',             target: 5,     reward: 20, value: function () { return stat('bestCombo'); } },
        { id: 'bombs_25',    icon: '💣', title: 'Бомбардир',       desc: 'Создать 25 бомб',              target: 25,    reward: 20, value: function () { return stat('bombsCreated'); } },
        { id: 'rainbows_10', icon: '🌈', title: 'Радужный',        desc: 'Создать 10 радуг',             target: 10,    reward: 25, value: function () { return stat('rainbowsCreated'); } },
        { id: 'stars_10',    icon: '⭐', title: 'Звездопад',       desc: 'Создать 10 звёзд',             target: 10,    reward: 25, value: function () { return stat('starsCreated'); } },
        { id: 'matches_2000',icon: '🧩', title: 'Трудяга',         desc: 'Собрать 2 000 совпадений',     target: 2000,  reward: 30, value: function () { return stat('totalMatches'); } },
        { id: 'time_10h',    icon: '⏱️', title: 'Марафонец',       desc: 'Провести в игре 10 часов',     target: 36000, reward: 30, value: function () { return stat('totalPlayTimeSec'); } },
        { id: 'boosters_25', icon: '🔨', title: 'Коллекционер',    desc: 'Использовать 25 бустеров',     target: 25,    reward: 30, value: function () { return state.counters.boostersUsed; } },
        { id: 'ads_10',      icon: '📺', title: 'Без затрат',      desc: 'Посмотреть 10 реклам',         target: 10,    reward: 20, value: function () { return state.counters.adsWatched; } },
        { id: 'streak_7',    icon: '📅', title: 'Преданный',       desc: 'Собрать серию 7 дней',         target: 7,     reward: 40, value: function () { return state.streak.best; } },
        { id: 'buyer_1',     icon: '💎', title: 'Меценат',         desc: 'Совершить первую покупку',     target: 1,     reward: 50, value: function () { return state.counters.purchases; } }
    ];

    function achievementSummary() {
        let unlocked = 0;
        ACHIEVEMENTS.forEach(function (a) { if (state.achievements.unlocked[a.id]) unlocked++; });
        return { unlocked: unlocked, total: ACHIEVEMENTS.length };
    }

    function evaluateAchievements() {
        if (!pgReady) return [];
        const newly = [];
        ACHIEVEMENTS.forEach(function (def) {
            if (state.achievements.unlocked[def.id]) return;
            let value = 0;
            try { value = def.value(); } catch (e) { value = 0; }
            if (value >= def.target) {
                state.achievements.unlocked[def.id] = Date.now();
                newly.push(def);
                safeAddDiamonds(def.reward, 'reward');
                track('achievement_unlock', { achievement: def.id });
            }
        });
        if (newly.length) {
            saveState();
            newly.forEach(function (def, idx) {
                setTimeout(function () {
                    toast('🏅 ' + def.title, '+' + def.reward + ' 💎 · достижение');
                }, idx * 650);
            });
        }
        updateAchievementsBadge();
        return newly;
    }

    function updateAchievementsBadge() {
        const el = document.getElementById('profile-ach-count');
        if (!el) return;
        const s = achievementSummary();
        el.textContent = s.unlocked + '/' + s.total;
    }

    function achievementsContentHtml() {
        const summary = achievementSummary();
        const totalReward = ACHIEVEMENTS.reduce(function (acc, a) {
            return acc + (state.achievements.unlocked[a.id] ? a.reward : 0);
        }, 0);
        let html = '' +
            '<button class="pg-modal-x" data-pg-close aria-label="Закрыть">×</button>' +
            '<h2 class="pg-modal-title">ДОСТИЖЕНИЯ</h2>' +
            '<div class="pg-modal-sub">Открыто ' + summary.unlocked + ' из ' + summary.total +
            ' · получено 💎 ' + totalReward + '</div>' +
            '<div class="pg-ach-list">';
        ACHIEVEMENTS.forEach(function (a) {
            const unlocked = !!state.achievements.unlocked[a.id];
            let value = 0;
            try { value = a.value(); } catch (e) {}
            const pct = Math.min(100, Math.round((value / a.target) * 100));
            html += '<div class="pg-ach ' + (unlocked ? 'unlocked' : '') + '">' +
                '<div class="pg-ach-icon">' + a.icon + '</div>' +
                '<div class="pg-ach-body">' +
                    '<div class="pg-ach-title">' + esc(a.title) + (unlocked ? ' <span class="pg-ach-done">✓</span>' : '') + '</div>' +
                    '<div class="pg-ach-desc">' + esc(a.desc) + '</div>' +
                    '<div class="pg-ach-bar"><span style="width:' + pct + '%"></span></div>' +
                    '<div class="pg-ach-meta"><span>' + Math.min(value, a.target) + ' / ' + a.target + '</span>' +
                    '<span class="pg-ach-reward">+' + a.reward + ' 💎</span></div>' +
                '</div>' +
            '</div>';
        });
        html += '</div>' +
            '<button class="pg-secondary-btn" data-pg-close>ЗАКРЫТЬ</button>';
        return html;
    }

    function showAchievements() {
        const existing = document.getElementById('pg-ach-modal');
        if (existing) existing.remove();
        openModal('pg-ach-modal', achievementsContentHtml());
    }

    function onBoosterUsed() {
        if (!pgReady) return;
        state.counters.boostersUsed++;
        saveState();
        track('boost_use', { total: state.counters.boostersUsed });
        evaluateAchievements();
    }

    function onAdWatched(ok) {
        if (!pgReady || !ok) return;
        state.counters.adsWatched++;
        saveState();
        evaluateAchievements();
    }

    // ===== weekly season =====
    function formatDuration(ms) {
        const totalMin = Math.max(0, Math.floor(num(ms) / 60000));
        const d = Math.floor(totalMin / 1440);
        const h = Math.floor((totalMin % 1440) / 60);
        const m = totalMin % 60;
        if (d > 0) return d + ' д ' + h + ' ч';
        if (h > 0) return h + ' ч ' + m + ' мин';
        return m + ' мин';
    }

    function weeklyContentHtml() {
        const card = document.createElement('div');
        card.className = 'weekly-card';
        if (weeklyLoading) {
            card.innerHTML = '<div class="weekly-loading">Загрузка сезона…</div>';
            return card;
        }
        if (!weeklyData) {
            card.innerHTML = '<div class="weekly-head"><span>🏆 НЕДЕЛЬНЫЙ СЕЗОН</span></div>' +
                '<div class="weekly-note">Не удалось загрузить данные сезона. Попробуйте открыть таблицу ещё раз.</div>';
            return card;
        }
        const d = weeklyData;
        const rewards = Array.isArray(d.rewards) && d.rewards.length
            ? d.rewards
            : [{ rank: 1, diamonds: 150 }, { rank: 2, diamonds: 100 }, { rank: 3, diamonds: 60 }];
        const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
        let rewardsHtml = '<div class="weekly-rewards">';
        rewards.forEach(function (r) {
            rewardsHtml += '<div class="weekly-reward-chip p' + r.rank + '">' +
                '<span class="weekly-reward-medal">' + (medals[r.rank] || '#' + r.rank) + '</span>' +
                '<span class="weekly-reward-amount">' + r.diamonds + ' 💎</span>' +
                '</div>';
        });
        rewardsHtml += '</div>';

        let prevHtml = '';
        if (d.my_reward > 0) {
            if (d.claimed) {
                prevHtml = '<div class="weekly-claim-row done">✅ Награда за прошлую неделю получена · ' + d.my_reward + ' 💎</div>';
            } else {
                prevHtml = '<div class="weekly-claim-row">' +
                    '<span>Прошлая неделя: место #' + d.my_rank + ' · +' + d.my_reward + ' 💎</span>' +
                    '<button class="weekly-claim-btn" data-pg-action="claim-weekly">ЗАБРАТЬ</button>' +
                    '</div>';
            }
        } else {
            prevHtml = '<div class="weekly-claim-row muted">В прошлой неделе вы не попали в топ-3. Играйте — награда ждёт!</div>';
        }

        card.innerHTML = '<div class="weekly-head">' +
                '<span>🏆 НЕДЕЛЬНЫЙ СЕЗОН</span>' +
                '<span class="weekly-time">до конца: ' + esc(formatDuration(num(d.current_ends_at) - Date.now())) + '</span>' +
            '</div>' +
            rewardsHtml +
            prevHtml;
        return card;
    }

    function renderWeeklyStatus() {
        const el = document.getElementById('weekly-status');
        if (!el) return;
        el.innerHTML = '';
        el.appendChild(weeklyContentHtml());
    }

    function loadWeeklyStatus(force) {
        const el = document.getElementById('weekly-status');
        if (!el) return;
        const u = uid();
        if (!u || !window._leaderboard || !window._leaderboard.fetchWeeklyStatusAsync) {
            weeklyData = null;
            weeklyLoading = false;
            renderWeeklyStatus();
            return;
        }
        if (weeklyLoading || (weeklyData && !force)) { renderWeeklyStatus(); return; }
        weeklyLoading = true;
        renderWeeklyStatus();
        window._leaderboard.fetchWeeklyStatusAsync(u).then(function (data) {
            weeklyData = data || null;
            weeklyLoading = false;
            renderWeeklyStatus();
        }).catch(function () {
            weeklyData = null;
            weeklyLoading = false;
            renderWeeklyStatus();
        });
    }

    function claimWeekly() {
        if (!weeklyData || !weeklyData.my_reward || weeklyData.claimed) return;
        if (!window._leaderboard || !window._leaderboard.claimWeeklyRewardAsync) return;
        const btn = document.querySelector('.weekly-claim-btn');
        if (btn) { btn.disabled = true; btn.textContent = '...'; }
        window._leaderboard.claimWeeklyRewardAsync(uid(), weeklyData.previous_week).then(function (res) {
            if (res && res.success) {
                weeklyData.claimed = true;
                if (res.already) {
                    safeShowMessage('Награда уже была получена');
                } else {
                    const amount = num(res.diamonds);
                    safeAddDiamonds(amount, 'reward');
                    state.counters.weeklyClaims++;
                    saveState();
                    track('weekly_claim', { diamonds: amount });
                    toast('🏆 Награда недели', '+' + amount + ' 💎');
                    evaluateAchievements();
                }
                renderWeeklyStatus();
            } else {
                safeShowMessage('Не удалось забрать награду');
                renderWeeklyStatus();
            }
        }).catch(function () {
            safeShowMessage('Не удалось забрать награду');
            renderWeeklyStatus();
        });
    }

    // ===== purchases =====
    function purchaseItem(itemId) {
        const item = ITEMS[itemId];
        if (!item) return;
        let isVk = false;
        try { isVk = typeof vkAvailable === 'function' && vkAvailable(); } catch (e) {}
        if (!isVk) {
            safeShowMessage('Покупки доступны только в VK Mini App');
            return;
        }
        track('purchase_attempt', { item: itemId });
        let promise;
        try {
            promise = vkBridge.send('VKWebAppShowOrderBox', { type: 'item', item: itemId });
        } catch (e) {
            track('purchase_cancel', { item: itemId });
            safeShowMessage('Покупки станут доступны после подключения оплаты');
            return;
        }
        promise.then(function (res) {
            if (!res || res.success !== true) {
                track('purchase_cancel', { item: itemId });
                safeShowMessage('Покупка отменена');
                return;
            }
            if (item.kind === 'diamonds') {
                safeAddDiamonds(item.qty, 'purchase');
                toast('💎 Покупка', '+' + item.qty + ' алмазов');
            } else if (item.kind === 'booster') {
                try {
                    boosters[item.booster] = (boosters[item.booster] || 0) + item.qty;
                    persistUserData();
                    updateBoostPanel();
                    renderStoreIfOpen();
                } catch (e) {}
                toast('📦 Покупка', '+' + item.qty + ' бустеров');
            }
            state.counters.purchases++;
            saveState();
            track('purchase_success', { item: itemId });
            evaluateAchievements();
        }).catch(function () {
            track('purchase_cancel', { item: itemId });
            safeShowMessage('Покупки станут доступны после подключения оплаты');
        });
    }

    // ===== push notifications =====
    function notificationsLabel() {
        return state.notifications ? '🔔 НАПОМИНАНИЯ ВКЛЮЧЕНЫ' : '🔔 ВКЛЮЧИТЬ НАПОМИНАНИЯ';
    }

    function toggleNotifications() {
        let isVk = false;
        try { isVk = typeof vkAvailable === 'function' && vkAvailable(); } catch (e) {}
        if (!isVk) {
            safeShowMessage('Напоминания доступны только в VK');
            return;
        }
        if (state.notifications) {
            state.notifications = false;
            saveState();
            registerNotifications(false);
            safeShowMessage('Напоминания выключены');
            updateNotificationsButton();
            return;
        }
        vkBridge.send('VKWebAppAllowNotifications').then(function (res) {
            const allowed = !!(res && (res.result === true || res.result === 1 || res.success === true));
            state.notifications = allowed;
            saveState();
            registerNotifications(allowed);
            track(allowed ? 'notifications_allow' : 'notifications_deny');
            if (allowed) {
                toast('🔔 Напоминания включены', 'Напомним, если пропустите бонус');
            } else {
                safeShowMessage('Уведомления не разрешены');
            }
            updateNotificationsButton();
        }).catch(function () {
            track('notifications_deny');
            safeShowMessage('Не удалось включить уведомления');
        });
    }

    function registerNotifications(enabled) {
        const base = workerUrl();
        const u = uid();
        if (!base || !u) return;
        try {
            fetch(base + (enabled ? '/notifications/register' : '/notifications/unregister'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vk_user_id: u, enabled: !!enabled }),
                keepalive: true
            }).catch(function () {});
        } catch (e) {}
    }

    function updateNotificationsButton() {
        const btn = document.getElementById('profile-notifications-btn');
        if (btn) btn.textContent = notificationsLabel();
    }

    // ===== modal / toast =====
    function openModal(id, innerHtml) {
        const overlay = document.createElement('div');
        overlay.className = 'pg-modal';
        overlay.id = id;
        overlay.innerHTML = '<div class="pg-modal-card">' + innerHtml + '</div>';
        document.body.appendChild(overlay);
        requestAnimationFrame(function () { overlay.classList.add('active'); });
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) overlay.remove();
        });
        return overlay;
    }

    function toast(title, sub) {
        let stack = document.getElementById('pg-toast-stack');
        if (!stack) {
            stack = document.createElement('div');
            stack.id = 'pg-toast-stack';
            stack.className = 'pg-toast-stack';
            document.body.appendChild(stack);
        }
        const el = document.createElement('div');
        el.className = 'pg-toast';
        el.innerHTML = '<div class="pg-toast-title">' + esc(title) + '</div>' +
            (sub ? '<div class="pg-toast-sub">' + esc(sub) + '</div>' : '');
        stack.appendChild(el);
        setTimeout(function () { el.classList.add('out'); }, 2800);
        setTimeout(function () { el.remove(); }, 3200);
    }

    // ===== UI refresh =====
    function refreshUI() {
        refreshDailyChip();
        updateCapUI();
        updateAchievementsBadge();
        updateNotificationsButton();
        const weeklyEl = document.getElementById('weekly-status');
        if (weeklyEl && weeklyData) renderWeeklyStatus();
    }

    function afterBoot(opts) {
        updateAchievementsBadge();
        updateNotificationsButton();
        updateCapUI();
        refreshDailyChip();
        evaluateAchievements();
        if (opts && opts.hasPendingGame) return;
        let tutorialSeen = false;
        try { tutorialSeen = localStorage.getItem('fruitBlastTutorialDoneV2') === '1'; } catch (e) {}
        if (!tutorialSeen) return;
        setTimeout(function () {
            if (autoStreakShown) return;
            if (!streakNextDay()) return;
            if (document.querySelector('.tutorial-root')) return;
            if (document.querySelector('.pg-modal.active')) return;
            autoStreakShown = true;
            showStreak();
        }, 1500);
    }

    // ===== init =====
    function init() {
        loadState();
        pgReady = true;

        const chip = document.getElementById('daily-chip');
        if (chip) {
            chip.addEventListener('click', function (e) {
                e.stopPropagation();
                showStreak();
            });
        }

        document.addEventListener('click', function (e) {
            const actionEl = e.target.closest('[data-pg-action]');
            if (actionEl) {
                const action = actionEl.dataset.pgAction;
                if (action === 'claim-streak') claimStreak();
                else if (action === 'claim-weekly') claimWeekly();
                else if (action === 'achievements') showAchievements();
                else if (action === 'notifications') toggleNotifications();
                return;
            }
            const closeEl = e.target.closest('[data-pg-close]');
            if (closeEl) {
                const modal = closeEl.closest('.pg-modal');
                if (modal) modal.remove();
            }
        });

        // Midnight / long session refresh.
        setInterval(function () {
            normalizeCapDay();
            refreshDailyChip();
            updateCapUI();
        }, 60000);

        track('app_open');
        refreshUI();
    }

    window._pg = {
        init: init,
        afterBoot: afterBoot,
        refreshUI: refreshUI,
        serialize: serialize,
        mergeRemote: mergeRemote,
        track: track,
        startSession: startSession,
        resetSession: resetSession,
        getSessionData: getSessionData,
        onGameStart: onGameStart,
        allowGameplayDiamonds: allowGameplayDiamonds,
        onBoosterUsed: onBoosterUsed,
        onAdWatched: onAdWatched,
        evaluateAchievements: evaluateAchievements,
        achievementSummary: achievementSummary,
        showAchievements: showAchievements,
        showStreak: showStreak,
        claimStreak: claimStreak,
        loadWeeklyStatus: loadWeeklyStatus,
        renderWeeklyStatus: renderWeeklyStatus,
        claimWeekly: claimWeekly,
        purchaseItem: purchaseItem,
        toggleNotifications: toggleNotifications,
        notificationsLabel: notificationsLabel,
        items: ITEMS
    };
})();
