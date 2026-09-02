// Fruit Blast - Match-3 Game (VK Mini Apps version)
// ===== FRUIT DEFINITIONS (SVG) =====
// Each fruit SVG uses a gradient with a placeholder {ID} so instances get unique gradient ids.
const FRUIT_SVG = {
    apple: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}" cx="30%" cy="30%" r="70%"><stop offset="0%" style="stop-color:#FF6B6B"/><stop offset="100%" style="stop-color:#C0392B"/></radialGradient></defs><ellipse cx="32" cy="36" rx="24" ry="22" fill="url(#{ID})"/><ellipse cx="32" cy="36" rx="20" ry="18" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><ellipse cx="26" cy="28" rx="6" ry="4" fill="rgba(255,255,255,0.4)"/><path d="M32 14 Q36 8 40 12" stroke="#8B4513" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="38" cy="12" rx="4" ry="3" fill="#27AE60"/></svg>`,
    orange: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}" cx="30%" cy="30%" r="70%"><stop offset="0%" style="stop-color:#FFB347"/><stop offset="100%" style="stop-color:#FF8C00"/></radialGradient></defs><circle cx="32" cy="32" r="24" fill="url(#{ID})"/><circle cx="32" cy="32" r="20" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><ellipse cx="26" cy="24" rx="6" ry="4" fill="rgba(255,255,255,0.4)"/><circle cx="8" cy="8" r="2" fill="#27AE60"/></svg>`,
    strawberry: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}" cx="30%" cy="30%" r="70%"><stop offset="0%" style="stop-color:#FF6B9D"/><stop offset="100%" style="stop-color:#C0392B"/></radialGradient></defs><path d="M32 12 Q48 20 48 40 Q48 56 32 56 Q16 56 16 40 Q16 20 32 12" fill="url(#{ID})"/><ellipse cx="28" cy="24" rx="5" ry="3" fill="rgba(255,255,255,0.4)"/><circle cx="32" cy="12" r="8" fill="#27AE60"/><circle cx="26" cy="32" r="1.5" fill="#FFE66D"/><circle cx="38" cy="32" r="1.5" fill="#FFE66D"/><circle cx="32" cy="40" r="1.5" fill="#FFE66D"/><circle cx="26" cy="48" r="1.5" fill="#FFE66D"/><circle cx="38" cy="48" r="1.5" fill="#FFE66D"/></svg>`,
    grape: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}" cx="30%" cy="30%" r="70%"><stop offset="0%" style="stop-color:#9B59B6"/><stop offset="100%" style="stop-color:#6C3483"/></radialGradient></defs><circle cx="32" cy="20" r="10" fill="url(#{ID})"/><circle cx="22" cy="30" r="10" fill="url(#{ID})"/><circle cx="42" cy="30" r="10" fill="url(#{ID})"/><circle cx="27" cy="42" r="10" fill="url(#{ID})"/><circle cx="37" cy="42" r="10" fill="url(#{ID})"/><ellipse cx="22" cy="30" rx="4" ry="3" fill="rgba(255,255,255,0.3)"/><ellipse cx="32" cy="20" rx="4" ry="3" fill="rgba(255,255,255,0.3)"/><path d="M32 10 Q32 4 36 6" stroke="#27AE60" stroke-width="2" fill="none"/></svg>`,
    watermelon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="{ID}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#27AE60"/><stop offset="50%" style="stop-color:#2ECC71"/><stop offset="100%" style="stop-color:#27AE60"/></linearGradient></defs><circle cx="32" cy="32" r="24" fill="url(#{ID})"/><circle cx="32" cy="32" r="18" fill="#E74C3C"/><circle cx="32" cy="32" r="14" fill="#C0392B"/><circle cx="28" cy="28" r="2" fill="#2C3E50"/><circle cx="36" cy="28" r="2" fill="#2C3E50"/><circle cx="32" cy="36" r="2" fill="#2C3E50"/><circle cx="28" cy="36" r="1.5" fill="#2C3E50"/><circle cx="36" cy="36" r="1.5" fill="#2C3E50"/></svg>`,
    lemon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}" cx="30%" cy="30%" r="70%"><stop offset="0%" style="stop-color:#FFE66D"/><stop offset="100%" style="stop-color:#F1C40F"/></radialGradient></defs><ellipse cx="32" cy="32" rx="22" ry="18" fill="url(#{ID})"/><ellipse cx="32" cy="32" rx="18" ry="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><ellipse cx="26" cy="24" rx="6" ry="4" fill="rgba(255,255,255,0.5)"/><circle cx="8" cy="8" r="2" fill="#27AE60"/></svg>`
};

const BONUS_SVG = {
    bomb: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="20" fill="#2C3E50"/><circle cx="32" cy="32" r="16" fill="#E74C3C"/><text x="32" y="39" text-anchor="middle" fill="white" font-size="22" font-weight="bold">💣</text></svg>`,
    rainbow: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="{ID}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#FF6B6B"/><stop offset="20%" style="stop-color:#FFE66D"/><stop offset="40%" style="stop-color:#4ECDC4"/><stop offset="60%" style="stop-color:#667eea"/><stop offset="80%" style="stop-color:#764ba2"/><stop offset="100%" style="stop-color:#FF6B6B"/></linearGradient></defs><circle cx="32" cy="32" r="22" fill="url(#{ID})"/><text x="32" y="40" text-anchor="middle" fill="white" font-size="24" font-weight="bold">🌈</text></svg>`
};

const FRUIT_TYPES = Object.keys(FRUIT_SVG);

const FRUIT_COLORS = {
    apple: '#FF6B6B',
    orange: '#FFB347',
    strawberry: '#FF6B9D',
    grape: '#9B59B6',
    watermelon: '#E74C3C',
    lemon: '#F1C40F'
};

const COMBO_COLORS = ['#27AE60', '#2ECC71', '#F1C40F', '#E67E22', '#E74C3C', '#9B59B6', '#3498DB'];

// ===== DAILY TASKS =====
const DAILY_TASK_DEFS = [
    { type: 'score',     template: 'Набери {n} очков',           targets: [500, 1000, 1500, 2000, 3000], reward: 5,  icon: '🎯' },
    { type: 'combo',     template: 'Сделай комбо x3+ {n} раз',   targets: [2, 3, 5, 7],                   reward: 8,  icon: '🔥' },
    { type: 'matches',   template: 'Сделай {n} совпадений',      targets: [20, 30, 40, 50],               reward: 5,  icon: '🧩' },
    { type: 'bombs',     template: 'Создай {n} бомб',            targets: [2, 3, 5],                      reward: 10, icon: '💣' },
    { type: 'rainbows',  template: 'Создай {n} радуг',           targets: [1, 2, 3],                      reward: 12, icon: '🌈' },
    { type: 'playtime',  template: 'Играй {n} минут',            targets: [5, 10, 15],                    reward: 3,  icon: '⏱️' }
];

// ===== BOOSTERS & DIAMONDS =====
const BOOSTER_DEFS = {
    hammer: { name: 'Молоток', icon: '🔨', price: 10 },
    rocket: { name: 'Ракета', icon: '🚀', price: 20 },
    swap: { name: 'Обмен', icon: '🔄', price: 15 }
};
const BOOSTER_IDS = Object.keys(BOOSTER_DEFS);

const DIAMOND_PACKS = {
    diam_small:  { qty: 60,  votes: 11,  price: '11 голосов' },
    diam_small2: { qty: 150, votes: 26,  price: '26 голосов' },
    diam_medium: { qty: 300, votes: 43,  price: '43 голоса' },
    diam_big:    { qty: 700, votes: 86,  price: '86 голосов' },
    diam_large:  { qty: 1200, votes: 128, price: '128 голосов' },
    diam_mega:   { qty: 2500, votes: 214, price: '214 голосов' }
};
const DIAMONDS_PER_SCORE = 250;

// Paid booster packs (VK order items priced in votes, 1 vote = 7 rubles)
const BOOSTER_PACKS = {
    hammer: { id: 'hammer_pack', qty: 3,  votes: 7 },
    rocket: { id: 'rocket_pack', qty: 3,  votes: 11 },
    swap:   { id: 'swap_pack',   qty: 3,  votes: 10 }
};

function votesLabel(n) {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return n + ' голос';
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return n + ' голоса';
    return n + ' голосов';
}

// ===== VK BRIDGE LAYER =====
let currentUser = {
    vk_user_id: null,
    first_name: '',
    last_name: '',
    photo_100: ''
};
let vkSignParamsStr = '';

function getVKLaunchParamsStr() {
    try {
        const hash = window.location.hash || '';
        const query = window.location.search || '';
        const full = (query + '&' + hash.replace(/^#/, '')).replace(/^&/, '');
        const params = new URLSearchParams(full);
        const vkKeys = [...params.keys()].filter(k => k.startsWith('vk_'));
        vkKeys.sort();
        const parts = vkKeys.map(k => `${k}=${encodeURIComponent(params.get(k) || '')}`);
        const sign = params.get('sign');
        if (sign) parts.push(`sign=${encodeURIComponent(sign)}`);
        return parts.join('&');
    } catch (e) {
        return '';
    }
}

function initVkBridge() {
    return new Promise(resolve => {
        if (typeof vkBridge !== 'undefined' && vkBridge.send) {
            vkBridge.send('VKWebAppInit', {}).then(() => resolve(true)).catch(() => resolve(false));
        } else {
            resolve(false);
        }
    });
}

function vkAvailable() {
    return typeof vkBridge !== 'undefined' && !!vkBridge.send;
}

// Storage helper: values in VK storage must be strings (max 4096 chars)
const VK_KEYS = {
    sound: 'fruitBlastSoundEnabled',
    best: 'fruitBlastBestScore',
    data: 'fruitBlastData'
};

function vkStorageGet(key) {
    return new Promise(resolve => {
        if (!vkAvailable()) { resolve(null); return; }
        vkBridge.send('VKWebAppStorageGet', { keys: [key] }).then(res => {
            if (res && res.keys && res.keys[0]) {
                resolve(res.keys[0].value);
            } else {
                resolve(null);
            }
        }).catch(() => resolve(null));
    });
}

function vkStorageSet(key, value) {
    if (!vkAvailable()) return Promise.resolve();
    return vkBridge.send('VKWebAppStorageSet', { key: key, value: String(value) }).catch(() => {});
}

function fetchUserInfo() {
    vkSignParamsStr = getVKLaunchParamsStr();
    try {
        const lp = new URLSearchParams((window.location.search || '') + '&' + (window.location.hash || '').replace(/^#/, ''));
        const uid = lp.get('vk_user_id');
        if (uid) currentUser.vk_user_id = Number(uid) || uid;
    } catch (_) {}
    if (!vkAvailable()) return;
    vkBridge.send('VKWebAppGetUserInfo', {}).then(res => {
        if (res && res.first_name) {
            currentUser.vk_user_id = currentUser.vk_user_id || (res.id != null ? res.id : null);
            currentUser.first_name = res.first_name || '';
            currentUser.last_name = res.last_name || '';
            currentUser.photo_100 = res.photo_100 || '';
            userName.textContent = res.first_name + (res.last_name ? ' ' + res.last_name : '');
            if (res.photo_100) {
                userAvatar.src = res.photo_100;
                userAvatar.hidden = false;
            }
        }
    }).catch(() => {});
}

// Leaderboard is NOT natively supported for game scores in VK Mini Apps via Bridge
// the way Yandex did. We keep score saving locally and expose a hook.
// Consult VK docs: leaderboards need to be handled via your backend or VK services.

// ===== AUDIO =====
let audioCtx = null;
let masterGain = null;

function initAudio() {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.5;
            masterGain.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) {
        console.warn('AudioContext not supported');
    }
}

function tone(freq, duration, type = 'sine', volume = 0.5, delay = 0) {
    if (!audioCtx || !soundEnabled) return;
    const start = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(start);
    osc.stop(start + duration + 0.05);
}

function gliss(freqStart, freqEnd, duration, type = 'sine', volume = 0.4) {
    if (!audioCtx || !soundEnabled) return;
    const start = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, start);
    osc.frequency.exponentialRampToValueAtTime(freqEnd, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(start);
    osc.stop(start + duration + 0.05);
}

function playSoundMatch() {
    tone(523, 0.15, 'sine', 0.5);
    tone(659, 0.15, 'sine', 0.5, 0.07);
    tone(784, 0.18, 'sine', 0.5, 0.14);
}

// ===== PLAYER COMBO SYSTEM =====
function playComboTone(level) {
    if (!audioCtx || !soundEnabled) return;
    const baseFreqs = [523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319];
    const freq = baseFreqs[Math.min(level - 1, baseFreqs.length - 1)];
    tone(freq, 0.22, 'sine', 0.45);
    if (level >= 3) {
        gliss(freq * 0.8, freq * 1.3, 0.18, 'sine', 0.3);
    }
    if (level >= 5) {
        tone(freq * 1.5, 0.15, 'triangle', 0.2, 0.08);
    }
}

function onPlayerMatch() {
    const now = Date.now();
    if (now - lastPlayerMatchTime < COMBO_TIMEOUT && lastPlayerMatchTime > 0) {
        playerCombo++;
    } else {
        playerCombo = 1;
    }
    lastPlayerMatchTime = now;
    totalCombosThisGame++;
    if (playerCombo > bestComboThisGame) bestComboThisGame = playerCombo;
    if (playerCombo > 1) {
        showPlayerCombo(playerCombo);
        playComboTone(playerCombo);
        spawnComboParticles(playerCombo);
        if (playerCombo >= 3) {
            comboHitsThisGame++;
        }
    }
    resetComboTimer();
}

function resetComboTimer() {
    if (comboResetTimer) clearTimeout(comboResetTimer);
    comboResetTimer = setTimeout(() => {
        playerCombo = 0;
    }, COMBO_TIMEOUT);
}

function showPlayerCombo(level) {
    const old = gameBoard.querySelector('.player-combo');
    if (old) old.remove();

    const el = document.createElement('div');
    el.className = 'player-combo';

    const color = COMBO_COLORS[Math.min(level - 2, COMBO_COLORS.length - 1)];
    const scale = Math.min(1 + level * 0.12, 2.2);
    const fontSize = Math.min(20 + level * 6, 52);

    el.innerHTML = `<span class="pc-text">COMBO</span><span class="pc-level" style="color:${color};font-size:${fontSize}px;">x${level}</span>`;
    el.style.transform = `translate(-50%, -50%) scale(${scale})`;

    gameBoard.appendChild(el);
    setTimeout(() => el.remove(), 1600);
}

// Legacy combo indicator (for cascade combos in processMatches)
function playSoundCombo(mult) {
    gliss(400, 800, 0.3, 'square', 0.35);
    tone(880 * mult, 0.25, 'sine', 0.5);
}
function playSoundBomb() { gliss(200, 80, 0.4, 'sawtooth', 0.5); }
function playSoundRainbow() {
    [0, 80, 160, 240, 320].forEach((d, i) => {
        tone(523 + i * 100, 0.15, 'sine', 0.4, d / 1000);
    });
}
function playSoundInvalid() { tone(200, 0.12, 'square', 0.3); }
function playSoundSelect() { tone(500, 0.06, 'triangle', 0.3); }
function playSoundShuffle() {
    [300, 350, 400, 450, 500, 550].forEach((f, i) => tone(f, 0.08, 'triangle', 0.25, i * 0.05));
}

// ===== GAME STATE =====
const BOARD_SIZE = 8;
let board = [];
let matrixCells = []; // 2D array of cell DOM elements for smooth rendering
let selectedCell = null;
let score = 0;
let bestScore = 0;
let bestScoreLoaded = false;
let isProcessing = false;
let comboCount = 0;
let isPaused = false;
let soundEnabled = false;
let vkPlayer = null;
let gameOverShown = false;
let gameStarted = false;
let boosters = { hammer: 0, rocket: 0, swap: 0 };
let diamonds = 0;
let activeBooster = null;
let swapBoostPick = null;
let storeSelectedBooster = null;
let diamondsAwardedForScore = 0;

// ===== PLAYER COMBO (5-second window) =====
let playerCombo = 0;
let lastPlayerMatchTime = 0;
const COMBO_TIMEOUT = 5000;
let comboResetTimer = null;
let bestComboThisGame = 0;
let totalCombosThisGame = 0;

// ===== DAILY STATS (this-game counters) =====
let gamesPlayedThisSession = 0;
let matchesThisGame = 0;
let bombsCreatedThisGame = 0;
let rainbowsCreatedThisGame = 0;
let comboHitsThisGame = 0;

// ===== TIMER STATE =====
const GAME_DURATION = 20 * 60; // 20 минут в секундах
let timeLeft = GAME_DURATION;
let gameTimerInterval = null;
let lastTimerTick = 0;
let savedGame = null; // автосохранённое состояние (время, счёт, доска)
let helpResumesOnClose = false;

// ===== DOM =====
const gameContainer = document.querySelector('.game-container');
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const gameOverModal = document.getElementById('game-over-modal');
const finalScore = document.getElementById('final-score');
const modalBestScore = document.getElementById('modal-best-score');
const shareGameoverBtn = document.getElementById('share-gameover-btn');
const pauseModal = document.getElementById('pause-modal');
const leaderboardModal = document.getElementById('leaderboard-modal');
const playAgainBtn = document.getElementById('play-again-btn');
const resumeBtn = document.getElementById('resume-btn');
const restartBtn = document.getElementById('restart-btn');
const pauseBtn = document.getElementById('pause-btn');
const soundBtn = document.getElementById('sound-btn');
const userInfo = document.getElementById('user-info');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const leaderboardList = document.getElementById('leaderboard-list');
const leaderboardCloseBtn = document.getElementById('leaderboard-close-btn');
const leaderboardResultsBtn = document.getElementById('leaderboard-results-btn');
const loadingOverlay = document.getElementById('loading-overlay');
const soundWaves = document.getElementById('sound-waves');
const diamondsCount = document.getElementById('diamonds-count');
const storeModal = document.getElementById('store-modal');
const storeCloseBtn = document.getElementById('store-close-btn');
const storeBtn = document.getElementById('store-btn');
const storeDiamondBalance = document.getElementById('store-diamond-balance');
const storeBoosterCards = document.querySelectorAll('.booster-store-card');
const purchaseBar = document.getElementById('purchase-bar');
const purchaseName = document.getElementById('purchase-name');
const purchaseOwned = document.getElementById('purchase-owned');
const purchaseAdBtn = document.getElementById('purchase-ad-btn');
const purchaseDmBtn = document.getElementById('purchase-dm-btn');
const purchasePackBtn = document.getElementById('purchase-pack-btn');
const purchaseClose = document.getElementById('purchase-close');
const diamondPayBtns = document.querySelectorAll('.diamond-pay-btn');
const boostPanel = document.getElementById('boost-panel');
const countEls = {
    hammer: document.getElementById('count-hammer'),
    rocket: document.getElementById('count-rocket'),
    swap: document.getElementById('count-swap')
};
const ownedEls = {
    hammer: document.getElementById('owned-hammer'),
    rocket: document.getElementById('owned-rocket'),
    swap: document.getElementById('owned-swap')
};
const timerDisplay = document.getElementById('timer');
const pauseTimeDisplay = document.getElementById('pause-time');
const resumeModal = document.getElementById('resume-modal');
const resumeTimeDisplay = document.getElementById('resume-time');
const resumeScoreDisplay = document.getElementById('resume-score');
const resumeContinueBtn = document.getElementById('resume-continue-btn');
const resumeNewBtn = document.getElementById('resume-new-btn');
const pauseRestartBtn = document.getElementById('pause-restart-btn');
const helpBtn = document.getElementById('help-btn');
const helpModal = document.getElementById('help-modal');
const helpCloseBtn = document.getElementById('help-close-btn');
const statsBtn = document.getElementById('stats-btn');
const tasksBtn = document.getElementById('tasks-btn');
const dailyTasksCount = document.getElementById('daily-tasks-count');

// ===== VK STORAGE / PLAYER =====
function getSoundSetting(defaultVal) {
    return new Promise(resolve => {
        const local = localStorage.getItem('fruitBlastSoundLocal');
        if (local !== null) {
            resolve(local === '1');
            return;
        }
        vkStorageGet(VK_KEYS.sound).then(val => {
            if (val !== null && val !== undefined && val !== '') {
                resolve(val === 'true' || val === '1');
            } else {
                resolve(defaultVal);
            }
        });
    });
}

function fetchBestScore() {
    return new Promise(resolve => {
        const local = parseInt(localStorage.getItem('fruitBlastBestScore')) || 0;
        vkStorageGet(VK_KEYS.best).then(val => {
            const vkBest = val ? parseInt(val) || 0 : 0;
            bestScore = Math.max(local, vkBest);
            resolve(bestScore);
        }).catch(() => {
            bestScore = parseInt(localStorage.getItem('fruitBlastBestScore')) || 0;
            resolve(bestScore);
        });
    });
}

function persistBestScore() {
    localStorage.setItem('fruitBlastBestScore', bestScore);
    vkStorageSet(VK_KEYS.best, bestScore);
}

function persistSoundSetting() {
    localStorage.setItem('fruitBlastSoundLocal', soundEnabled ? '1' : '0');
    vkStorageSet(VK_KEYS.sound, soundEnabled ? 'true' : 'false');
}

function loadUserData() {
    return new Promise(resolve => {
        try {
            const raw = localStorage.getItem(VK_KEYS.data);
            const localData = raw ? JSON.parse(raw) : null;
            vkStorageGet(VK_KEYS.data).then(val => {
                let vkData = null;
                if (val) {
                    try { vkData = JSON.parse(val); } catch (e) {}
                }
                resolve(vkData && localData ? { boosters: { ...vkData.boosters, ...localData.boosters }, diamonds: Math.max(vkData.diamonds || 0, localData.diamonds || 0) } : (vkData || localData));
            }).catch(() => resolve(localData));
        } catch (e) {
            resolve(null);
        }
    });
}

function persistUserData() {
    const data = { boosters, diamonds };
    try {
        localStorage.setItem(VK_KEYS.data, JSON.stringify(data));
    } catch (e) {}
    vkStorageSet(VK_KEYS.data, JSON.stringify(data));
}

function flushAllSaves() {
    persistBestScore();
    persistSoundSetting();
    persistUserData();
}

function addDiamonds(n) {
    diamonds += n;
    if (diamonds < 0) diamonds = 0;
    updateDiamondUI();
    persistUserData();
}

function updateDiamondUI() {
    diamondsCount.textContent = '💎 ' + diamonds;
    storeDiamondBalance.textContent = '💎 ' + diamonds;
}

function updateBoostPanel() {
    BOOSTER_IDS.forEach(id => {
        countEls[id].textContent = boosters[id] || 0;
        ownedEls[id].textContent = boosters[id] || 0;
    });
    document.querySelectorAll('.boost-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.booster === activeBooster);
    });
}

function rewardDiamondsForScore() {
    const target = Math.floor(score / DIAMONDS_PER_SCORE);
    if (target > diamondsAwardedForScore) {
        const gained = target - diamondsAwardedForScore;
        diamondsAwardedForScore = target;
        if (gained > 0) addDiamonds(gained);
    }
}

// ===== TIMER =====
function formatTime(totalSeconds) {
    totalSeconds = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
    timerDisplay.classList.toggle('low', timeLeft <= 60);
}

function startGameTimer() {
    stopGameTimer();
    lastTimerTick = Date.now();
    gameTimerInterval = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - lastTimerTick) / 1000;
        lastTimerTick = now;
        if (isPaused || gameOverShown) return;
        timeLeft -= elapsed;
        if (timeLeft <= 0) {
            timeLeft = 0;
            updateTimerDisplay();
            endGameByTime();
        } else {
            updateTimerDisplay();
        }
    }, 1000);
}

function stopGameTimer() {
    if (gameTimerInterval) {
        clearInterval(gameTimerInterval);
        gameTimerInterval = null;
    }
}

function endGameByTime() {
    stopGameTimer();
    gameOverShown = true;
    isPaused = false;

    const playTime = GAME_DURATION;
    recordGameEnd(score, playTime);
    trackTaskProgress('score', score);
    trackTaskProgress('bombs', bombsCreatedThisGame);
    trackTaskProgress('rainbows', rainbowsCreatedThisGame);
    trackTaskProgress('matches', matchesThisGame);
    trackTaskProgress('combo', comboHitsThisGame);
    trackTaskProgress('playtime', Math.floor(playTime / 60));

    clearSavedGame();
    finalScore.textContent = score;
    modalBestScore.textContent = bestScore;
    gameOverModal.classList.add('active');
    pauseModal.classList.remove('active');
    updateDailyTasksBadge();
}

// ===== AUTOSAVE (полное состояние игры) =====
const SAVE_KEY = 'fruitBlastActiveGame';

function saveGameState() {
    if (!gameStarted || gameOverShown) return;
    const state = {
        timeLeft: timeLeft,
        score: score,
        diamondsAwardedForScore: diamondsAwardedForScore,
        board: board,
        timestamp: Date.now()
    };
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
        savedGame = state;
    } catch (e) {}
}

function clearSavedGame() {
    savedGame = null;
    try {
        localStorage.removeItem(SAVE_KEY);
    } catch (e) {}
}

function loadSavedGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function restoreSavedGame(state) {
    score = state.score || 0;
    timeLeft = Math.max(0, state.timeLeft || 0);
    diamondsAwardedForScore = state.diamondsAwardedForScore || 0;
    if (Array.isArray(state.board) && state.board.length === BOARD_SIZE) {
        board = state.board;
    } else {
        createBoard();
        while (findMatches().length > 0) createBoard();
    }
    selectedCell = null;
    isProcessing = false;
    comboCount = 0;
    gameOverShown = false;
    isPaused = false;
    activeBooster = null;
    swapBoostPick = null;
    updateScoreDisplay();
    updateBoostPanel();
    updateTimerDisplay();
    renderBoard();
    gameOverModal.classList.remove('active');
    resumeModal.classList.remove('active');
    pauseModal.classList.remove('active');
    leaderboardModal.classList.remove('active');
    startGameTimer();
}

function showResumeModal() {
    if (gameOverShown) return;
    stopGameTimer();
    isPaused = false;
    resumeTimeDisplay.textContent = 'Осталось ' + formatTime(timeLeft);
    resumeScoreDisplay.textContent = score;
    resumeModal.classList.add('active');
    pauseModal.classList.remove('active');
}

function submitLeaderboard() {
    if (!currentUser.vk_user_id || !window._leaderboard) return Promise.resolve();
    return window._leaderboard.submitScoreAsync(bestScore, {
        vk_user_id: currentUser.vk_user_id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        photo_100: currentUser.photo_100,
        vk_sign_params: vkSignParamsStr || null
    }).then(res => {
        if (res && res.updated) {
            console.log('[leaderboard] Новый рекорд сохранён:', res.new_score);
        }
        return res;
    }).catch(err => {
        console.warn('[leaderboard] Ошибка отправки:', err);
    });
}

function showLeaderboard() {
    leaderboardModal.classList.add('active');
    if (window._leaderboard) {
        window._leaderboard.openLeaderboardUIEnhanced(
            leaderboardList,
            currentUser.vk_user_id,
            currentUser.first_name + (currentUser.last_name ? ' ' + currentUser.last_name : ''),
            currentUser.photo_100
        );
    } else {
        leaderboardList.innerHTML = '<div class="leaderboard-empty">Модуль лидерборда не загружен.</div>';
    }
}

function showFullscreenAd() {
    return new Promise(resolve => {
        if (!vkAvailable()) { resolve(); return; }
        // VK shows interstitials via VKWebAppShowNativeAds (type: interstitial)
        vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
            .then(() => resolve())
            .catch(() => resolve());
    });
}

// ===== PARTICLE SYSTEM =====
function spawnParticles(row, col, color, count, speed, sizeRange) {
    const cell = matrixCells[row] && matrixCells[row][col];
    if (!cell) return;
    const rect = cell.getBoundingClientRect();
    const boardRect = gameBoard.getBoundingClientRect();
    const cx = rect.left - boardRect.left + rect.width / 2;
    const cy = rect.top - boardRect.top + rect.height / 2;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'game-particle';
        const angle = (360 / count) * i + (Math.random() * 30 - 15);
        const dist = speed + Math.random() * speed * 0.6;
        const sz = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.width = sz + 'px';
        p.style.height = sz + 'px';
        p.style.background = color;
        p.style.setProperty('--px', Math.cos(angle * Math.PI / 180) * dist + 'px');
        p.style.setProperty('--py', Math.sin(angle * Math.PI / 180) * dist + 'px');
        gameBoard.appendChild(p);
        setTimeout(() => p.remove(), 650);
    }
}

function spawnMatchParticles(row, col, fruitType) {
    const color = FRUIT_COLORS[fruitType] || '#FF6B6B';
    spawnParticles(row, col, color, 6, 25, [4, 8]);
}

function spawnBombParticles(row, col) {
    const colors = ['#FF6B6B', '#FFB347', '#FF8E53', '#FFE66D', '#E74C3C'];
    for (let i = 0; i < 15; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        spawnParticles(row, col, c, 1, 45, [5, 10]);
    }
}

function spawnRainbowParticles(row, col) {
    const colors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#667eea', '#764ba2', '#2ECC71', '#FF6B9D'];
    for (let i = 0; i < 20; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        spawnParticles(row, col, c, 1, 35, [3, 7]);
    }
}

function spawnComboParticles(level) {
    const boardRect = gameBoard.getBoundingClientRect();
    const cx = boardRect.width / 2;
    const cy = boardRect.height / 2;
    const colors = ['#FFE66D', '#FFB347', '#27AE60', '#667eea', '#FF6B6B'];
    const count = Math.min(4 + level * 2, 20);
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'game-particle combo-particle';
        const angle = (360 / count) * i;
        const dist = 30 + level * 10 + Math.random() * 20;
        const c = colors[Math.floor(Math.random() * colors.length)];
        const sz = 4 + Math.random() * 5;
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.width = sz + 'px';
        p.style.height = sz + 'px';
        p.style.background = c;
        p.style.setProperty('--px', Math.cos(angle * Math.PI / 180) * dist + 'px');
        p.style.setProperty('--py', Math.sin(angle * Math.PI / 180) * dist + 'px');
        gameBoard.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }
}

// ===== TUTORIAL SYSTEM =====
function hasTutorialDone() {
    return localStorage.getItem('fruitBlastTutorialDone') === '1';
}

function showTutorial() {
    if (hasTutorialDone()) return;
    if (!gameStarted || gameOverShown) return;
    const validMove = findTutorialMove();
    if (!validMove) { completeTutorial(); return; }
    isPaused = true;
    stopGameTimer();

    const overlay = document.createElement('div');
    overlay.id = 'tutorial-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;pointer-events:none;';
    overlay.innerHTML = `
        <div class="tutorial-backdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.6);"></div>
        <div class="tutorial-spotlight" id="tutorial-spotlight" style="position:absolute;pointer-events:none;box-shadow:0 0 0 9999px rgba(0,0,0,0.55);border-radius:10px;"></div>
        <div class="tutorial-text" id="tutorial-text" style="position:absolute;left:50%;transform:translateX(-50%);top:30px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:12px 20px;border-radius:14px;font-weight:700;font-size:15px;box-shadow:0 6px 20px rgba(0,0,0,0.25);pointer-events:none;white-space:nowrap;"></div>
        <div class="tutorial-arrow" id="tutorial-arrow" style="position:absolute;width:40px;height:40px;pointer-events:none;z-index:201;"></div>
        <button class="tutorial-btn" id="tutorial-skip-btn" style="pointer-events:auto;position:absolute;right:16px;top:16px;background:#fff;color:#555;border:none;padding:8px 14px;border-radius:10px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);">Пропустить</button>
        <button class="tutorial-btn tutorial-next" id="tutorial-next-btn" style="pointer-events:auto;position:absolute;left:50%;transform:translateX(-50%);bottom:36px;background:linear-gradient(135deg,#FF6B6B,#FFB347);color:#fff;border:none;padding:12px 28px;border-radius:14px;font-weight:800;cursor:pointer;box-shadow:0 6px 18px rgba(255,107,107,0.4);font-size:15px;">Далее</button>
    `;
    document.body.appendChild(overlay);
    document.getElementById('tutorial-skip-btn').addEventListener('click', completeTutorial);
    document.getElementById('tutorial-next-btn').addEventListener('click', tutorialNextStep);

    tutorialCurrentStep = 0;
    tutorialMove = validMove;
    tutorialShowStep(0);
}

let tutorialCurrentStep = 0;
let tutorialMove = null;

function tutorialShowStep(step) {
    const spotlight = document.getElementById('tutorial-spotlight');
    const text = document.getElementById('tutorial-text');
    const arrow = document.getElementById('tutorial-arrow');
    const nextBtn = document.getElementById('tutorial-next-btn');
    if (!spotlight || !text) return;

    spotlight.className = 'tutorial-spotlight';
    arrow.className = 'tutorial-arrow';
    arrow.style.display = 'none';

    if (step === 0) {
        const cell = matrixCells[tutorialMove.from.row][tutorialMove.from.col];
        positionSpotlight(spotlight, cell);
        text.textContent = 'Выбери этот фрукт';
        text.className = 'tutorial-text';
        nextBtn.textContent = 'Далее';
    } else if (step === 1) {
        const cell = matrixCells[tutorialMove.from.row][tutorialMove.from.col];
        positionSpotlight(spotlight, cell);
        positionArrow(arrow, tutorialMove.from, tutorialMove.to);
        arrow.style.display = 'block';
        text.textContent = 'Поменяй его местами с соседним';
        text.className = 'tutorial-text';
        nextBtn.textContent = 'Понял!';
    } else {
        completeTutorial();
        return;
    }
    tutorialCurrentStep = step;
}

function tutorialNextStep() {
    tutorialShowStep(tutorialCurrentStep + 1);
}

function positionSpotlight(spotlight, cellEl) {
    const rect = cellEl.getBoundingClientRect();
    spotlight.style.left = (rect.left - 3) + 'px';
    spotlight.style.top = (rect.top - 3) + 'px';
    spotlight.style.width = (rect.width + 6) + 'px';
    spotlight.style.height = (rect.height + 6) + 'px';
    spotlight.classList.add('visible');
}

function positionArrow(arrow, from, to) {
    const fromCell = matrixCells[from.row][from.col];
    const toCell = matrixCells[to.row][to.col];
    const fromRect = fromCell.getBoundingClientRect();
    const toRect = toCell.getBoundingClientRect();
    const fx = fromRect.left + fromRect.width / 2;
    const fy = fromRect.top + fromRect.height / 2;
    const tx = toRect.left + toRect.width / 2;
    const ty = toRect.top + toRect.height / 2;
    const angle = Math.atan2(ty - fy, tx - fx) * 180 / Math.PI;
    const dx = (tx - fx) / 2;
    const dy = (ty - fy) / 2;
    arrow.style.left = (fx + dx - 20) + 'px';
    arrow.style.top = (fy + dy - 20) + 'px';
    arrow.innerHTML = `<svg viewBox="0 0 40 40" style="width:100%;height:100%;transform:rotate(${angle}deg);"><path d="M4 20 L30 20 M22 12 L32 20 L22 28" stroke="#FFE66D" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function findTutorialMove() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (col < BOARD_SIZE - 1) {
                swapTemp(row, col, row, col + 1);
                if (findMatches().length > 0) {
                    swapTemp(row, col, row, col + 1);
                    return { from: { row, col }, to: { row, col: col + 1 } };
                }
                swapTemp(row, col, row, col + 1);
            }
            if (row < BOARD_SIZE - 1) {
                swapTemp(row, col, row + 1, col);
                if (findMatches().length > 0) {
                    swapTemp(row, col, row + 1, col);
                    return { from: { row, col }, to: { row: row + 1, col } };
                }
                swapTemp(row, col, row + 1, col);
            }
        }
    }
    return null;
}

function completeTutorial() {
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) overlay.remove();
    localStorage.setItem('fruitBlastTutorialDone', '1');
    isPaused = false;
    updateTimerDisplay();
    startGameTimer();
}

// ===== STATISTICS =====
let gameStats = {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    bestCombo: 0,
    totalCombos: 0,
    bombsCreated: 0,
    rainbowsCreated: 0,
    totalMatches: 0,
    totalPlayTimeSec: 0
};

function loadStats() {
    try {
        const raw = localStorage.getItem('fruitBlastStats');
        if (raw) Object.assign(gameStats, JSON.parse(raw));
    } catch (e) {}
    vkStorageGet('fruitBlastStats').then(val => {
        if (val) {
            try { Object.assign(gameStats, JSON.parse(val)); } catch (e) {}
        }
    }).catch(() => {});
}

function saveStats() {
    try {
        localStorage.setItem('fruitBlastStats', JSON.stringify(gameStats));
    } catch (e) {}
    vkStorageSet('fruitBlastStats', JSON.stringify(gameStats));
}

function recordGameEnd(finalScore, playTimeSec) {
    gameStats.gamesPlayed++;
    gameStats.totalScore += finalScore;
    if (finalScore > gameStats.bestScore) gameStats.bestScore = finalScore;
    if (bestComboThisGame > gameStats.bestCombo) gameStats.bestCombo = bestComboThisGame;
    gameStats.totalCombos += totalCombosThisGame;
    gameStats.bombsCreated += bombsCreatedThisGame;
    gameStats.rainbowsCreated += rainbowsCreatedThisGame;
    gameStats.totalMatches += matchesThisGame;
    gameStats.totalPlayTimeSec += playTimeSec;
    saveStats();
}

function formatPlayTimeSec(sec) {
    sec = Math.floor(sec);
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (h > 0) return h + 'ч ' + m + 'м';
    return m + 'м';
}

function showProfileModal() {
    const existing = document.getElementById('profile-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'profile-modal active';
    modal.id = 'profile-modal';

    const stats = [
        { icon: '🎮', value: gameStats.gamesPlayed,  label: 'Игр сыграно' },
        { icon: '🏆', value: gameStats.bestScore,     label: 'Лучший счёт' },
        { icon: '📊', value: Math.floor(gameStats.totalScore / Math.max(gameStats.gamesPlayed, 1)), label: 'Средний счёт' },
        { icon: '🔥', value: 'x' + gameStats.bestCombo, label: 'Лучшее комбо' },
        { icon: '⚡', value: gameStats.totalCombos,   label: 'Всего комбо' },
        { icon: '🧩', value: gameStats.totalMatches,  label: 'Всего совпадений' },
        { icon: '💣', value: gameStats.bombsCreated,  label: 'Бомб создано' },
        { icon: '🌈', value: gameStats.rainbowsCreated, label: 'Радуг создано' },
        { icon: '⏱️', value: formatPlayTimeSec(gameStats.totalPlayTimeSec), label: 'Общее время' }
    ];

    let cardsHtml = stats.map(s =>
        `<div class="stat-card"><div class="stat-icon">${s.icon}</div><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`
    ).join('');

    const fullName = [currentUser.first_name, currentUser.last_name].filter(Boolean).join(' ').trim() || 'Игрок';
    const avatarSrc = currentUser.photo_100 || '';

    modal.innerHTML = `
        <div class="modal-content profile-content">
            <h2 class="modal-title">ПРОФИЛЬ</h2>
            <div class="profile-header">
                <div class="profile-avatar-wrap">
                    <img class="profile-avatar-large" alt="" src="${avatarSrc}" ${!avatarSrc ? 'style="display:none"' : ''}>
                    ${!avatarSrc ? `<div class="profile-avatar-large placeholder" style="display:flex;align-items:center;justify-content:center;">👤</div>` : ''}
                </div>
                <div class="profile-user-info">
                    <div class="profile-name">${fullName}</div>
                    <div class="profile-level-row">
                        <span class="profile-label">💎 Алмазы:</span>
                        <span class="profile-value">${diamonds}</span>
                    </div>
                    <div class="profile-level-row">
                        <span class="profile-label">🏆 Рекорд:</span>
                        <span class="profile-value">${bestScore}</span>
                    </div>
                </div>
            </div>
            <div class="stats-grid">${cardsHtml}</div>
            <button class="play-again-btn" id="profile-close-btn">ЗАКРЫТЬ</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('profile-close-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ===== DAILY TASKS =====
let dailyTasks = [];
let dailyTasksDate = '';

function loadDailyTasks() {
    const today = new Date().toISOString().slice(0, 10);
    dailyTasksDate = today;
    const loadFromData = (data) => {
        if (data && data.date === today && Array.isArray(data.tasks)) {
            dailyTasks = data.tasks;
            return true;
        }
        return false;
    };
    try {
        const raw = localStorage.getItem('fruitBlastDailyTasks');
        if (raw && loadFromData(JSON.parse(raw))) {
            vkStorageGet('fruitBlastDailyTasks').then(v => {
                if (v) { try { loadFromData(JSON.parse(v)); } catch (e) {} }
            }).catch(() => {});
            return;
        }
    } catch (e) {}
    vkStorageGet('fruitBlastDailyTasks').then(v => {
        if (v) {
            try {
                const data = JSON.parse(v);
                if (loadFromData(data)) return;
            } catch (e) {}
        }
        generateDailyTasks();
    }).catch(() => generateDailyTasks());
}

function generateDailyTasks() {
    const today = new Date().toISOString().slice(0, 10);
    dailyTasksDate = today;
    const shuffled = [...DAILY_TASK_DEFS].sort(() => Math.random() - 0.5);
    dailyTasks = shuffled.slice(0, 3).map((def, i) => {
        const target = def.targets[Math.floor(Math.random() * def.targets.length)];
        return {
            id: i,
            type: def.type,
            template: def.template,
            icon: def.icon,
            target: target,
            progress: 0,
            reward: def.reward,
            completed: false,
            claimed: false,
            name: def.template.replace('{n}', target)
        };
    });
    saveDailyTasks();
}

function saveDailyTasks() {
    const payload = JSON.stringify({ date: dailyTasksDate, tasks: dailyTasks });
    try {
        localStorage.setItem('fruitBlastDailyTasks', payload);
    } catch (e) {}
    vkStorageSet('fruitBlastDailyTasks', payload);
    updateDailyTasksBadge();
}

function trackTaskProgress(type, amount) {
    let changed = false;
    dailyTasks.forEach(task => {
        if (task.type === type && !task.claimed) {
            const before = task.progress;
            task.progress = Math.min(task.progress + amount, task.target);
            if (task.progress > before) changed = true;
            if (task.progress >= task.target && !task.completed) {
                task.completed = true;
                changed = true;
            }
        }
    });
    if (changed) saveDailyTasks();
}

function claimTaskReward(taskId) {
    const task = dailyTasks.find(t => t.id === taskId);
    if (!task || !task.completed || task.claimed) return;
    task.claimed = true;
    addDiamonds(task.reward);
    saveDailyTasks();
    showMessage('+' + task.reward + ' 💎');
    showTasksModal();
}

function updateDailyTasksBadge() {
    const unclaimed = dailyTasks.filter(t => t.completed && !t.claimed).length;
    if (dailyTasksCount) {
        dailyTasksCount.textContent = unclaimed;
        dailyTasksCount.style.display = unclaimed > 0 ? 'flex' : 'none';
    }
}

function showTasksModal() {
    const existing = document.getElementById('tasks-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'tasks-modal active';
    modal.id = 'tasks-modal';

    let tasksHtml = dailyTasks.map(task => {
        const pct = Math.min(100, Math.round((task.progress / task.target) * 100));
        let actionHtml = '';
        if (task.claimed) {
            actionHtml = '<div class="task-claimed">✅ Получено</div>';
        } else if (task.completed) {
            actionHtml = `<button class="task-claim-btn" data-task-id="${task.id}">💎 ЗАБРАТЬ ${task.reward}</button>`;
        } else {
            actionHtml = `<div class="task-progress-text">${task.progress}/${task.target}</div>`;
        }
        return `
            <div class="task-card ${task.completed && !task.claimed ? 'task-ready' : ''} ${task.claimed ? 'task-done' : ''}">
                <div class="task-header">
                    <span class="task-icon">${task.icon}</span>
                    <span class="task-name">${task.name}</span>
                </div>
                <div class="task-bar"><div class="task-bar-fill" style="width:${pct}%"></div></div>
                ${actionHtml}
            </div>
        `;
    }).join('');

    modal.innerHTML = `
        <div class="modal-content tasks-content">
            <h2 class="modal-title">ЕЖЕДНЕВНЫЕ ЗАДАНИЯ</h2>
            <div class="tasks-list">${tasksHtml}</div>
            <button class="play-again-btn" id="tasks-close-btn">ЗАКРЫТЬ</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('tasks-close-btn').addEventListener('click', () => modal.remove());
    modal.querySelectorAll('.task-claim-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            claimTaskReward(parseInt(btn.dataset.taskId));
        });
    });
}

// ===== BOARD LOGIC =====
let autoSaveIntervalId = null;

function initGame() {
    board = [];
    score = 0;
    comboCount = 0;
    playerCombo = 0;
    lastPlayerMatchTime = 0;
    bestComboThisGame = 0;
    totalCombosThisGame = 0;
    matchesThisGame = 0;
    bombsCreatedThisGame = 0;
    rainbowsCreatedThisGame = 0;
    comboHitsThisGame = 0;
    selectedCell = null;
    isProcessing = false;
    isPaused = false;
    gameOverShown = false;
    activeBooster = null;
    swapBoostPick = null;
    diamondsAwardedForScore = 0;
    timeLeft = GAME_DURATION;
    clearSavedGame();

    if (autoSaveIntervalId) clearInterval(autoSaveIntervalId);
    autoSaveIntervalId = setInterval(() => {
        if (gameStarted && !gameOverShown && !isPaused) saveGameState();
    }, 5000);

    updateScoreDisplay();
    updateBoostPanel();
    updateTimerDisplay();
    createBoard();

    while (findMatches().length > 0) {
        createBoard();
    }

    renderBoard();
    gameOverModal.classList.remove('active');
    resumeModal.classList.remove('active');
    leaderboardModal.classList.remove('active');
    pauseModal.classList.remove('active');
    startGameTimer();

    setTimeout(() => showTutorial(), 600);
}
function createBoard() {
    board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        board[row] = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            board[row][col] = {
                type: getRandomFruit(),
                bonus: null
            };
        }
    }
}

function getRandomFruit() {
    return FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
}

function fruitSvgHtml(type, id) {
    return FRUIT_SVG[type].split('{ID}').join(id);
}

function bonusSvgHtml(bonus, id) {
    return BONUS_SVG[bonus].split('{ID}').join(id);
}

let gradientCounter = 0;

function renderBoard() {
    gameBoard.innerHTML = '';
    matrixCells = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        matrixCells[row] = [];
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            const fruitData = board[row][col];
            if (fruitData) {
                const fruitDiv = document.createElement('div');
                fruitDiv.className = 'fruit';
                const id = 'g' + (gradientCounter++);
                if (fruitData.bonus === 'bomb') {
                    // Бомба показывает свой тип фрукта + значок бомбы,
                    // чтобы было видно, с какими фруктами её совмещать.
                    fruitDiv.innerHTML = fruitSvgHtml(fruitData.type, id)
                        + '<span class="bomb-badge">💣</span>';
                    cell.classList.add('bomb');
                } else if (fruitData.bonus === 'rainbow') {
                    fruitDiv.innerHTML = bonusSvgHtml('rainbow', id);
                    cell.classList.add('rainbow');
                } else {
                    fruitDiv.innerHTML = fruitSvgHtml(fruitData.type, id);
                }
                cell.appendChild(fruitDiv);
            }

            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
            matrixCells[row][col] = cell;
        }
    }
}

// ===== INPUT HANDLING =====
function handleCellClick(e) {
    if (isProcessing || isPaused || gameOverShown) return;

    const cell = e.currentTarget;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (activeBooster) {
        handleBoosterBoardClick(row, col);
        return;
    }

    initAudio();
    playSoundSelect();

    if (selectedCell === null) {
        selectedCell = { row, col };
        cell.classList.add('selected');
    } else {
        const prevCell = document.querySelector(`.cell[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`);
        if (prevCell) prevCell.classList.remove('selected');

        if (isAdjacent(selectedCell, { row, col })) {
            const from = selectedCell;
            selectedCell = null;
            swapFruits(from, { row, col });
        } else {
            selectedCell = { row, col };
            cell.classList.add('selected');
            return;
        }
    }
}

let touchStart = null;

function handleTouchStart(e) {
    if (isProcessing || isPaused || gameOverShown) return;
    const touch = e.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY, row: null, col: null };

    const cell = document.elementFromPoint(touch.clientX, touch.clientY);
    const cellEl = cell ? cell.closest('.cell') : null;
    if (cellEl) {
        touchStart.row = parseInt(cellEl.dataset.row);
        touchStart.col = parseInt(cellEl.dataset.col);
        if (activeBooster) {
            handleBoosterBoardClick(touchStart.row, touchStart.col);
            return;
        }
        initAudio();
        playSoundSelect();
        if (selectedCell === null) {
            selectedCell = { row: touchStart.row, col: touchStart.col };
            cellEl.classList.add('selected');
        } else if (isAdjacent(selectedCell, { row: touchStart.row, col: touchStart.col })) {
            const from = selectedCell;
            selectedCell = null;
            swapFruits(from, { row: touchStart.row, col: touchStart.col });
        } else {
            const prevCell = document.querySelector(`.cell[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`);
            if (prevCell) prevCell.classList.remove('selected');
            selectedCell = { row: touchStart.row, col: touchStart.col };
            cellEl.classList.add('selected');
        }
    }
}

function handleTouchEnd(e) {
    if (isProcessing || isPaused || gameOverShown) return;
    if (!touchStart) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 30 && touchStart.row !== null) {
        let targetRow = touchStart.row;
        let targetCol = touchStart.col;
        if (Math.abs(dx) > Math.abs(dy)) {
            targetCol += dx > 0 ? 1 : -1;
        } else {
            targetRow += dy > 0 ? 1 : -1;
        }
        if (targetRow >= 0 && targetRow < BOARD_SIZE && targetCol >= 0 && targetCol < BOARD_SIZE) {
            const from = touchStart;
            const prevCell = document.querySelector(`.cell[data-row="${from.row}"][data-col="${from.col}"]`);
            if (prevCell) prevCell.classList.remove('selected');
            if (selectedCell) selectedCell = null;
            swapFruits(from, { row: targetRow, col: targetCol });
        } else if (selectedCell) {
            const prevCell = document.querySelector(`.cell[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`);
            if (prevCell) prevCell.classList.remove('selected');
            selectedCell = null;
        }
    }
    touchStart = null;
}

function isAdjacent(cell1, cell2) {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// ===== SWAP =====
async function swapFruits(cell1, cell2) {
    isProcessing = true;
    if (selectedCell) {
        const pc = document.querySelector(`.cell[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`);
        if (pc) pc.classList.remove('selected');
        selectedCell = null;
    }

    const cell1El = matrixCells[cell1.row][cell1.col];
    const cell2El = matrixCells[cell2.row][cell2.col];

    if (cell1El && cell2El && cell1El.querySelector('.fruit') && cell2El.querySelector('.fruit')) {
        const dx = (cell2.col - cell1.col) * 100;
        const dy = (cell2.row - cell1.row) * 100;
        cell1El.querySelector('.fruit').style.transition = 'transform 0.2s ease-in-out';
        cell2El.querySelector('.fruit').style.transition = 'transform 0.2s ease-in-out';
        cell1El.querySelector('.fruit').style.transform = `translate(${dx}%, ${dy}%)`;
        cell2El.querySelector('.fruit').style.transform = `translate(${-dx}%, ${-dy}%)`;
        await sleep(200);
    }

    const temp = board[cell1.row][cell1.col];
    board[cell1.row][cell1.col] = board[cell2.row][cell2.col];
    board[cell2.row][cell2.col] = temp;

    renderBoard();

    let rainbowActivated = false;
    const rainbowPos = [cell1, cell2].find(p => board[p.row][p.col] && board[p.row][p.col].bonus === 'rainbow');
    if (rainbowPos) {
        const other = rainbowPos === cell1 ? cell2 : cell1;
        const partner = board[other.row][other.col];
        const partnerType = partner && partner.type;

        if (partnerType && partnerType === 'rainbow') {
            // Радуга + радуга: очищаем всё поле
            rainbowActivated = true;
            playSoundRainbow();
            score += 100;
            updateScoreDisplay();
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (board[r][c]) spawnRainbowParticles(r, c);
                    board[r][c] = null;
                }
            }
            showMessage('МЕГА-РАДУГА! 🌈');
            await dropFruits();
            await fillEmptySpaces();
            renderBoard();
        } else if (partnerType && partnerType !== 'rainbow') {
            rainbowActivated = true;
            playSoundRainbow();
            score += 50;
            updateScoreDisplay();
            // Радуга + бомба: взрыв всего поля
            const partnerIsBomb = partner && partner.bonus === 'bomb';
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (partnerIsBomb) {
                        board[r][c] = null;
                        spawnBombParticles(r, c);
                    } else if (board[r][c] && board[r][c].type === partnerType && board[r][c].bonus !== 'rainbow') {
                        board[r][c] = null;
                        spawnMatchParticles(r, c, partnerType);
                    }
                }
            }
            spawnRainbowParticles(rainbowPos.row, rainbowPos.col);
            board[rainbowPos.row][rainbowPos.col] = null;
            if (partnerIsBomb) {
                showMessage('Радуга + Бомба! 💥');
                playSoundBomb();
            } else {
                showMessage('Радуга! 🌈');
            }
            await dropFruits();
            await fillEmptySpaces();
            renderBoard();
        }
    }

    const matches = findMatches();

    if (matches.length > 0) {
        comboCount = 0;
        await processMatches();
        onPlayerMatch();
        matchesThisGame += matches.length;
    } else if (!rainbowActivated) {
        playSoundInvalid();
        flashInvalidCells(cell1, cell2);
        const temp2 = board[cell1.row][cell1.col];
        board[cell1.row][cell1.col] = board[cell2.row][cell2.col];
        board[cell2.row][cell2.col] = temp2;
        renderBoard();
    }

    isProcessing = false;

    if (!hasValidMoves() && !gameOverShown && !isPaused) {
        await shuffleBoard();
    }
}

function flashInvalidCells(cell1, cell2) {
    const c1 = document.querySelector(`.cell[data-row="${cell1.row}"][data-col="${cell1.col}"]`);
    const c2 = document.querySelector(`.cell[data-row="${cell2.row}"][data-col="${cell2.col}"]`);
    [c1, c2].forEach(c => {
        if (c) {
            c.classList.add('invalid');
            setTimeout(() => c.classList.remove('invalid'), 400);
        }
    });
}

// ===== MATCH DETECTION =====
function findMatches() {
    const matches = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE - 2; col++) {
            const match = checkHorizontalMatch(row, col);
            if (match.length >= 3) {
                matches.push({ cells: match, direction: 'horizontal' });
                col += match.length - 1;
            }
        }
    }

    for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = 0; row < BOARD_SIZE - 2; row++) {
            const match = checkVerticalMatch(row, col);
            if (match.length >= 3) {
                matches.push({ cells: match, direction: 'vertical' });
                row += match.length - 1;
            }
        }
    }

    return matches;
}

function checkHorizontalMatch(row, col) {
    const fruit = board[row][col];
    if (!fruit || fruit.bonus === 'rainbow') return [];
    const match = [{ row, col }];
    for (let c = col + 1; c < BOARD_SIZE; c++) {
        if (board[row][c] && board[row][c].type === fruit.type && board[row][c].bonus !== 'rainbow') {
            match.push({ row, col: c });
        } else {
            break;
        }
    }
    return match;
}

function checkVerticalMatch(row, col) {
    const fruit = board[row][col];
    if (!fruit || fruit.bonus === 'rainbow') return [];
    const match = [{ row, col }];
    for (let r = row + 1; r < BOARD_SIZE; r++) {
        if (board[r][col] && board[r][col].type === fruit.type && board[r][col].bonus !== 'rainbow') {
            match.push({ row: r, col });
        } else {
            break;
        }
    }
    return match;
}

// ===== PROCESS MATCHES =====
async function processMatches() {
    let matches = findMatches();

    while (matches.length > 0) {
        comboCount++;
        let matchScore = 0;
        const allMatchedCells = new Set();
        let createdBonuses = [];

        for (const match of matches) {
            const matchLength = match.cells.length;
            let baseScore = 0;
            const centerCell = match.cells[Math.floor(match.cells.length / 2)];
            let createdBonus = null;

            if (matchLength === 3) {
                baseScore = 10;
            } else if (matchLength === 4) {
                baseScore = 50;
                const bombType = board[centerCell.row][centerCell.col].type;
                board[centerCell.row][centerCell.col] = { type: bombType, bonus: 'bomb' };
                createdBonus = 'bomb';
                bombsCreatedThisGame++;
                addDiamonds(1);
            } else if (matchLength >= 5) {
                baseScore = 100;
                board[centerCell.row][centerCell.col] = { type: 'rainbow', bonus: 'rainbow' };
                createdBonus = 'rainbow';
                rainbowsCreatedThisGame++;
                addDiamonds(2);
            }

            matchScore += baseScore;

            for (const cell of match.cells) {
                if (matchLength < 4 || cell.row !== centerCell.row || cell.col !== centerCell.col) {
                    allMatchedCells.add(`${cell.row},${cell.col}`);
                    spawnMatchParticles(cell.row, cell.col, board[cell.row] && board[cell.row][cell.col] && board[cell.row][cell.col].type);
                }
            }

            if (createdBonus) {
                createdBonuses.push({ row: centerCell.row, col: centerCell.col, bonus: createdBonus });
            }
        }

        const comboMultiplier = comboCount >= 5 ? 5 : comboCount >= 3 ? 3 : comboCount >= 2 ? 2 : 1;
        matchScore *= comboMultiplier;
        score += matchScore;
        updateScoreDisplay();

        if (createdBonuses.length > 0) {
            playSoundMatch();
            if (createdBonuses.some(b => b.bonus === 'bomb')) {
                showMessage('💣 Бомба! Совмести 3 фрукта того же вида, чтобы взорвать');
            }
        }

        if (comboMultiplier > 1) {
            showComboIndicator(comboMultiplier);
            playSoundCombo(comboMultiplier);
        } else if (createdBonuses.length === 0) {
            playSoundMatch();
        }

        const bonusCells = [];
        allMatchedCells.forEach(key => {
            const [row, col] = key.split(',').map(Number);
            if (board[row][col] && board[row][col].bonus) {
                bonusCells.push({ row, col, bonus: board[row][col].bonus });
            }
        });

        for (const bonusCell of bonusCells) {
            if (bonusCell.bonus === 'bomb') {
                for (let r = bonusCell.row - 1; r <= bonusCell.row + 1; r++) {
                    for (let c = bonusCell.col - 1; c <= bonusCell.col + 1; c++) {
                        if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
                            allMatchedCells.add(`${r},${c}`);
                        }
                    }
                }
                spawnBombParticles(bonusCell.row, bonusCell.col);
                score += 20;
                playSoundBomb();
            } else if (bonusCell.bonus === 'rainbow') {
                const targetType = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
                for (let r = 0; r < BOARD_SIZE; r++) {
                    for (let c = 0; c < BOARD_SIZE; c++) {
                        if (board[r][c] && board[r][c].type === targetType && !board[r][c].bonus) {
                            allMatchedCells.add(`${r},${c}`);
                            spawnMatchParticles(r, c, targetType);
                        }
                    }
                }
                spawnRainbowParticles(bonusCell.row, bonusCell.col);
                score += 50;
                playSoundRainbow();
            }
        }

        updateScoreDisplay();

        allMatchedCells.forEach(key => {
            const [row, col] = key.split(',').map(Number);
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (cell && cell.querySelector('.fruit')) {
                cell.classList.add('matched');
            }
        });

        await sleep(300);

        allMatchedCells.forEach(key => {
            const [row, col] = key.split(',').map(Number);
            board[row][col] = null;
        });

        await dropFruits();
        await fillEmptySpaces();

        renderBoard();
        await sleep(150);

        matches = findMatches();
    }

    updateScoreDisplay();
}

async function dropFruits() {
    const drops = [];

    for (let col = 0; col < BOARD_SIZE; col++) {
        let emptyRow = BOARD_SIZE - 1;
        for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (board[row][col] !== null) {
                if (row !== emptyRow) {
                    drops.push({ fromRow: row, toRow: emptyRow, col });
                    board[emptyRow][col] = board[row][col];
                    board[row][col] = null;
                }
                emptyRow--;
            }
        }
    }

    if (drops.length > 0) {
        renderBoard();
        for (const drop of drops) {
            const cell = matrixCells[drop.toRow][drop.col];
            if (cell && cell.querySelector('.fruit')) {
                const distance = (drop.fromRow - drop.toRow) * 100;
                cell.querySelector('.fruit').style.transition = 'transform 0.3s ease-out';
                cell.querySelector('.fruit').style.transform = `translateY(-${distance}%)`;
            }
        }
        await sleep(30);
        for (const drop of drops) {
            const cell = matrixCells[drop.toRow][drop.col];
            if (cell && cell.querySelector('.fruit')) {
                cell.querySelector('.fruit').style.transform = 'translateY(0)';
            }
        }
        await sleep(300);
    }
}

async function fillEmptySpaces() {
    const newFruits = [];

    for (let col = 0; col < BOARD_SIZE; col++) {
        for (let row = 0; row < BOARD_SIZE; row++) {
            if (board[row][col] === null) {
                board[row][col] = { type: getRandomFruit(), bonus: null };
                newFruits.push({ row, col });
            }
        }
    }

    if (newFruits.length > 0) {
        renderBoard();
        for (const fruit of newFruits) {
            const cell = matrixCells[fruit.row][fruit.col];
            if (cell && cell.querySelector('.fruit')) {
                cell.querySelector('.fruit').style.transition = 'transform 0.4s ease-out';
                cell.querySelector('.fruit').style.transform = 'translateY(-300%)';
            }
        }
        await sleep(30);
        for (const fruit of newFruits) {
            const cell = matrixCells[fruit.row][fruit.col];
            if (cell && cell.querySelector('.fruit')) {
                cell.querySelector('.fruit').style.transform = 'translateY(0)';
            }
        }
        await sleep(400);
    }
}

// ===== SHUFFLE (instead of game over) =====
async function shuffleBoard() {
    if (gameOverShown) return;
    let attempts = 0;
    while (attempts < 50 && (!hasValidMoves() || findMatches().length > 0)) {
        shuffleBoardTiles();
        attempts++;
    }
    renderBoard();
    if (hasValidMoves()) {
        playSoundShuffle();
        showMessage('Поле перемешано!');
    } else {
        let regen = 0;
        do {
            createBoard();
            regen++;
        } while ((findMatches().length > 0 || !hasValidMoves()) && regen < 50);
        renderBoard();
        playSoundShuffle();
        showMessage('Поле перемешано!');
    }
    await sleep(400);
}

function shuffleBoardTiles() {
    const positions = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c]) {
                positions.push({ row: r, col: c, isBonus: !!board[r][c].bonus });
            }
        }
    }
    const normalTypes = positions.filter(p => !p.isBonus).map(p => board[p.row][p.col].type);

    for (let i = normalTypes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [normalTypes[i], normalTypes[j]] = [normalTypes[j], normalTypes[i]];
    }

    let idx = 0;
    for (const p of positions) {
        if (!p.isBonus) {
            board[p.row][p.col] = { type: normalTypes[idx++], bonus: null };
        }
    }
}

// ===== INPUT HANDLING =====
function hasValidMoves() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (col < BOARD_SIZE - 1) {
                swapTemp(row, col, row, col + 1);
                if (findMatches().length > 0) { swapTemp(row, col, row, col + 1); return true; }
                swapTemp(row, col, row, col + 1);
            }
            if (row < BOARD_SIZE - 1) {
                swapTemp(row, col, row + 1, col);
                if (findMatches().length > 0) { swapTemp(row, col, row + 1, col); return true; }
                swapTemp(row, col, row + 1, col);
            }
        }
    }
    return false;
}

function swapTemp(r1, c1, r2, c2) {
    const temp = board[r1][c1];
    board[r1][c1] = board[r2][c2];
    board[r2][c2] = temp;
}

// ===== UI HELPERS =====
function showMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'board-message';
    msg.textContent = text;
    gameBoard.appendChild(msg);
    setTimeout(() => msg.remove(), 1200);
}

function showComboIndicator(multiplier) {
    const indicator = document.createElement('div');
    indicator.className = 'combo-indicator';
    indicator.textContent = `COMBO x${multiplier}`;
    gameBoard.appendChild(indicator);
    setTimeout(() => indicator.remove(), 800);
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
    bestScoreDisplay.textContent = bestScore;

    if (score > bestScore && bestScoreLoaded) {
        const prevBest = bestScore;
        bestScore = score;
        persistBestScore();
        submitLeaderboard();
        bestScoreDisplay.textContent = bestScore;
        if (prevBest > 0 && score > 0) {
            showMessage('Новый рекорд! 🎉');
        }
    }

    rewardDiamondsForScore();
}

function togglePause() {
    if (gameOverShown) return;
    isPaused = !isPaused;
    if (isPaused) {
        stopGameTimer();
        pauseTimeDisplay.textContent = formatTime(timeLeft);
        saveGameState();
        pauseModal.classList.add('active');
    } else {
        pauseModal.classList.remove('active');
        updateTimerDisplay();
        startGameTimer();
    }
}

function toggleSound() {
    initAudio();
    soundEnabled = !soundEnabled;
    soundBtn.style.opacity = soundEnabled ? '1' : '0.5';
    if (soundWaves) {
        soundWaves.style.display = soundEnabled ? '' : 'none';
    }
    persistSoundSetting();
    if (soundEnabled) playSoundSelect();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== BOOSTERS (in-game use) =====
function clearSelectedCell() {
    if (selectedCell) {
        const pc = document.querySelector(`.cell[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`);
        if (pc) pc.classList.remove('selected');
        selectedCell = null;
    }
}

function clickBoostButton(id) {
    if (isProcessing || isPaused || gameOverShown) return;
    if (!boosters[id]) {
        openStore();
        showPurchaseBarFor(id);
        return;
    }
    if (activeBooster === id) {
        cancelActiveBooster();
        return;
    }
    clearSelectedCell();
    activeBooster = id;
    swapBoostPick = null;
    updateBoostPanel();
    playSoundSelect();
    showMessage('Используйте: ' + BOOSTER_DEFS[id].icon + ' ' + BOOSTER_DEFS[id].name);
}

function cancelActiveBooster() {
    if (swapBoostPick) {
        const c = document.querySelector(`.cell[data-row="${swapBoostPick.row}"][data-col="${swapBoostPick.col}"]`);
        if (c) c.classList.remove('selected');
    }
    activeBooster = null;
    swapBoostPick = null;
    updateBoostPanel();
}

function consumeBooster(id) {
    if (boosters[id] > 0) boosters[id]--;
    persistUserData();
}

async function handleBoosterBoardClick(row, col) {
    if (activeBooster === 'swap') {
        if (!swapBoostPick) {
            swapBoostPick = { row, col };
            const c = matrixCells[row][col];
            if (c) c.classList.add('selected');
            playSoundSelect();
            showMessage('Выберите вторую клетку 🔄');
            return;
        }
        if (swapBoostPick.row === row && swapBoostPick.col === col) {
            const c = matrixCells[row][col];
            if (c) c.classList.remove('selected');
            swapBoostPick = null;
            showMessage('Выберите первую клетку 🔄');
            return;
        }

        const a = swapBoostPick;
        const b = { row, col };
        const ca = matrixCells[a.row][a.col];
        if (ca) ca.classList.remove('selected');
        swapBoostPick = null;
        cancelActiveBooster();

        const tmp = board[a.row][a.col];
        board[a.row][a.col] = board[b.row][b.col];
        board[b.row][b.col] = tmp;

        consumeBooster('swap');
        isProcessing = true;
        playSoundSelect();
        renderBoard();
        if (findMatches().length > 0) {
            comboCount = 0;
            await processMatches();
        }
        isProcessing = false;
        if (!hasValidMoves() && !gameOverShown && !isPaused) await shuffleBoard();
        return;
    }

    if (activeBooster === 'hammer' || activeBooster === 'rocket') {
        const cells = [];
        if (activeBooster === 'hammer') {
            cells.push({ row, col });
        } else {
            for (let c = 0; c < BOARD_SIZE; c++) cells.push({ row, col: c });
            for (let r = 0; r < BOARD_SIZE; r++) if (r !== row) cells.push({ row: r, col });
        }
        const bonusScore = activeBooster === 'hammer' ? 10 : 45;
        const boosterId = activeBooster;
        consumeBooster(boosterId);
        cancelActiveBooster();

        isProcessing = true;
        playSoundBomb();
        await clearCellsAndCascade(cells);
        score += bonusScore;
        updateScoreDisplay();
        isProcessing = false;
        if (!hasValidMoves() && !gameOverShown && !isPaused) await shuffleBoard();
    }
}

async function clearCellsAndCascade(cells) {
    cells.forEach(({ row, col }) => {
        const cellEl = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cellEl && cellEl.querySelector('.fruit')) {
            cellEl.classList.add('matched');
        }
    });
    await sleep(280);
    cells.forEach(({ row, col }) => {
        board[row][col] = null;
    });
    await dropFruits();
    await fillEmptySpaces();
    renderBoard();
    if (findMatches().length > 0) {
        comboCount = 0;
        await processMatches();
    }
}

// ===== STORE =====
function openStore() {
    cancelActiveBooster();
    storeSelectedBooster = null;
    hidePurchaseBar();
    updateBoostPanel();
    updateDiamondUI();
    storeModal.classList.add('active');
}

function closeStore() {
    storeModal.classList.remove('active');
    hidePurchaseBar();
}

function hidePurchaseBar() {
    purchaseBar.classList.add('hidden');
}

function selectBoosterInStore(id) {
    storeSelectedBooster = storeSelectedBooster === id ? null : id;
    if (storeSelectedBooster) {
        showPurchaseBarFor(id);
    } else {
        hidePurchaseBar();
    }
}

function showPurchaseBarFor(id) {
    const def = BOOSTER_DEFS[id];
    if (!def) return;
    const pack = BOOSTER_PACKS[id];
    purchaseName.textContent = def.icon + ' ' + def.name;
    purchaseOwned.textContent = 'У вас: ' + (boosters[id] || 0);
    purchaseDmBtn.textContent = '💎 ' + def.price;
    if (pack) {
        purchasePackBtn.textContent = '📦 ПАК ' + pack.qty + ' шт · ' + votesLabel(pack.votes);
        purchasePackBtn.classList.remove('hidden');
    } else {
        purchasePackBtn.classList.add('hidden');
    }
    purchaseBar.classList.remove('hidden');
    storeSelectedBooster = id;
    updateBoostPanel();
}

// VK rewarded ads: VKWebAppShowNativeAds (ad_format: 'reward')
function watchRewardedAd() {
    return new Promise(resolve => {
        if (!vkAvailable()) { resolve(true); return; }
        vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });
}

async function purchaseBoosterByAd(id) {
    if (!storeSelectedBooster && !id) return;
    const bId = id || storeSelectedBooster;
    const ok = await watchRewardedAd();
    if (ok) {
        boosters[bId]++;
        persistUserData();
        updateBoostPanel();
        showMessage('+1 ' + BOOSTER_DEFS[bId].icon + ' ' + BOOSTER_DEFS[bId].name);
    } else {
        showMessage('Реклама не была досмотрена');
    }
}

function purchaseBoosterByDiamonds(id) {
    const bId = id || storeSelectedBooster;
    const def = BOOSTER_DEFS[bId];
    if (!def) return;
    if (diamonds < def.price) {
        showMessage('Не хватает алмазов! 💎');
        return;
    }
    addDiamonds(-def.price);
    boosters[bId]++;
    persistUserData();
    updateBoostPanel();
    showMessage('+1 ' + def.icon + ' ' + def.name);
}

// Buy a booster pack for real money via VK order box
// Монетизация пока недоступна — покупки только "Скоро" (визуал).
// Когда настроишь товары в консоли VK и станешь плательщиком, раскомментируй
// флоу ниже (VKWebAppGetOrderItems -> ShowOrderBox -> CheckOrder) и включи
// начисление товара через addDiamonds / boosters.
function buyBoosterPack(id) {
    const bId = id || storeSelectedBooster;
    const pack = BOOSTER_PACKS[bId];
    if (!pack) return;
    showMessage('🚧 Покупка пакетов скоро');
    return;

    /*
    // === РЕАЛЬНЫЙ ПЛАТЁЖНЫЙ ФЛОУ (включить при монетизации) ===
    async function buyBoosterPackReal(id) {
        const bId = id || storeSelectedBooster;
        const pack = BOOSTER_PACKS[bId];
        if (!pack) return;
        if (!vkAvailable()) {
            showMessage('Покупки доступны только в VK Mini Apps');
            return;
        }
        try {
            const itemsRes = await vkBridge.send('VKWebAppGetOrderItems', {});
            const items = itemsRes.items || [];
            if (!items.includes(pack.id)) {
                showMessage('Товар не найден. Создайте его в консоли VK');
                return;
            }
            const orderRes = await vkBridge.send('VKWebAppShowOrderBox', { type: 'item', item: pack.id });
            if (!orderRes || !orderRes.success) return;
            const check = await vkBridge.send('VKWebAppCheckOrder', { type: 'item', item: pack.id, user_id: '' });
            if (check && check.success) {
                boosters[bId] += pack.qty;
                persistUserData();
                updateBoostPanel();
                showMessage('Оплата голосами прошла! +' + pack.qty + ' ' + BOOSTER_DEFS[bId].icon + ' ' + BOOSTER_DEFS[bId].name);
            }
        } catch (e) {
            showMessage('Покупка отменена или не удалась');
        }
    }
    */
}

// Монетизация пока недоступна — покупки алмазов только "Скоро" (визуал).
// Когда настроишь товары и станешь плательщиком, используй реальный флоу ниже.
async function buyDiamondPack(packId) {
    const pack = DIAMOND_PACKS[packId];
    if (!pack) return;
    showMessage('🚧 Покупка алмазов скоро');
    return;

    /* === РЕАЛЬНЫЙ ПЛАТЁЖНЫЙ ФЛОУ (включить при монетизации) ===
    if (!vkAvailable()) {
        showMessage('Покупки доступны только в VK Mini Apps');
        return;
    }
    try {
        // 1. VKWebAppGetOrderItems - товары, настроенные в консоли VK
        const itemsRes = await vkBridge.send('VKWebAppGetOrderItems', {});
        const items = itemsRes.items || [];
        if (!items.includes(packId)) {
            showMessage('Товар не найден. Настройте его в консоли VK');
            return;
        }
        // 2. VKWebAppShowOrderBox - нативное окно оплаты
        const orderRes = await vkBridge.send('VKWebAppShowOrderBox', { type: 'item', item: packId });
        if (!orderRes || !orderRes.success) return;
        // 3. VKWebAppCheckOrder - подтверждение заказа
        const check = await vkBridge.send('VKWebAppCheckOrder', { type: 'item', item: packId, user_id: '' });
        if (check && check.success) {
            addDiamonds(pack.qty);
            showMessage('Оплата голосами прошла! +' + pack.qty + ' 💎');
        }
    } catch (e) {
        showMessage('Покупка отменена или не удалась');
    }
    */
}

// ===== HELP =====
function buildHelpExamples() {
    const g = () => 'help' + (gradientCounter++);

    // Пример: 3 яблока в ряд (совпадение) и соседний фрукт для свапа
    const matchEl = document.getElementById('help-example-match');
    let matchHtml = '<div class="h-cell hit">' + fruitSvgHtml('apple', g()) + '</div>';
    matchHtml += '<div class="h-cell hit">' + fruitSvgHtml('apple', g()) + '</div>';
    matchHtml += '<div class="h-cell hit">' + fruitSvgHtml('apple', g()) + '</div>';
    matchHtml += '<div class="h-arrow">⚡</div>';
    matchHtml += '<div class="h-cell">' + fruitSvgHtml('orange', g()) + '</div>';
    matchEl.innerHTML = matchHtml;

    // Пример: 4 яблока в ряд -> бомба (фрукт + значок)
    const bombEl = document.getElementById('help-example-bomb');
    let bombHtml = '';
    for (let i = 0; i < 4; i++) bombHtml += '<div class="h-cell hit">' + fruitSvgHtml('apple', g()) + '</div>';
    bombHtml += '<div class="h-arrow">→</div>';
    bombHtml += '<div class="h-cell hit"><span class="bomb-badge">💣</span>' + fruitSvgHtml('apple', g()) + '</div>';
    bombEl.innerHTML = bombHtml;

    // Пример: 5 клубник в ряд -> радуга
    const rainbowEl = document.getElementById('help-example-rainbow');
    let rainbowHtml = '';
    for (let i = 0; i < 5; i++) rainbowHtml += '<div class="h-cell hit">' + fruitSvgHtml('strawberry', g()) + '</div>';
    rainbowHtml += '<div class="h-arrow">→</div>';
    rainbowHtml += '<div class="h-cell hit">' + bonusSvgHtml('rainbow', g()) + '</div>';
    rainbowEl.innerHTML = rainbowHtml;
}

// ===== EVENT LISTENERS =====
playAgainBtn.addEventListener('click', () => {
    if (vkAvailable()) {
        showFullscreenAd().then(() => initGame());
    } else {
        initGame();
    }
});

resumeBtn.addEventListener('click', togglePause);
pauseBtn.addEventListener('click', () => togglePause());
pauseRestartBtn.addEventListener('click', () => {
    stopGameTimer();
    clearSavedGame();
    initGame();
});
resumeContinueBtn.addEventListener('click', () => {
    if (savedGame) {
        restoreSavedGame(savedGame);
    } else {
        resumeModal.classList.remove('active');
        startGameTimer();
    }
});
resumeNewBtn.addEventListener('click', () => {
    clearSavedGame();
    initGame();
});
restartBtn.addEventListener('click', () => {
    if (vkAvailable()) {
        showFullscreenAd().then(() => initGame());
    } else {
        initGame();
    }
});
soundBtn.addEventListener('click', toggleSound);
helpBtn.addEventListener('click', () => {
    cancelActiveBooster();
    helpResumesOnClose = gameStarted && !gameOverShown && !isPaused;
    if (helpResumesOnClose) {
        stopGameTimer();
        isPaused = true;
    }
    buildHelpExamples();
    helpModal.classList.add('active');
    pauseModal.classList.remove('active');
});
helpCloseBtn.addEventListener('click', () => {
    helpModal.classList.remove('active');
    if (helpResumesOnClose) {
        isPaused = false;
        helpResumesOnClose = false;
        updateTimerDisplay();
        startGameTimer();
    }
});
leaderboardBtn.addEventListener('click', showLeaderboard);
leaderboardCloseBtn.addEventListener('click', () => leaderboardModal.classList.remove('active'));
leaderboardResultsBtn.addEventListener('click', showLeaderboard);

if (userInfo) {
    const openProfile = () => {
        cancelActiveBooster();
        showProfileModal();
    };
    userInfo.addEventListener('click', openProfile);
    userInfo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProfile();
        }
    });
}
if (shareGameoverBtn && window._share) {
    shareGameoverBtn.addEventListener('click', () => {
        const isBest = score >= bestScore;
        window._share.shareScore(score, isBest);
    });
}

if (tasksBtn) tasksBtn.addEventListener('click', () => {
    cancelActiveBooster();
    showTasksModal();
});

storeBtn.addEventListener('click', openStore);
storeCloseBtn.addEventListener('click', closeStore);
boostPanel.addEventListener('click', (e) => {
    const btn = e.target.closest('.boost-btn');
    if (btn) clickBoostButton(btn.dataset.booster);
});
storeBoosterCards.forEach(card => {
    card.addEventListener('click', () => selectBoosterInStore(card.dataset.storeBooster));
});
purchaseAdBtn.addEventListener('click', () => purchaseBoosterByAd());
purchaseDmBtn.addEventListener('click', () => purchaseBoosterByDiamonds());
purchasePackBtn.addEventListener('click', () => buyBoosterPack());
purchaseClose.addEventListener('click', () => {
    storeSelectedBooster = null;
    hidePurchaseBar();
    updateBoostPanel();
});
diamondPayBtns.forEach(btn => {
    btn.addEventListener('click', () => buyDiamondPack(btn.dataset.pack));
});
purchaseBar.addEventListener('click', (e) => { e.stopPropagation(); });

gameBoard.addEventListener('touchstart', handleTouchStart, { passive: true });
gameBoard.addEventListener('touchend', handleTouchEnd, { passive: true });

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (gameStarted && !gameOverShown) {
            stopGameTimer();
            saveGameState();
        }
        flushAllSaves();
    } else {
        // Вернулись в приложение — если есть незавершённая игра, предложить продолжить
        if (!gameOverShown && !isPaused && gameStarted) {
            resumeModal.classList.remove('active');
        }
        if (savedGame && !gameOverShown && !isPaused && gameStarted) {
            showResumeModal();
        }
    }
});

window.addEventListener('pagehide', () => {
    if (gameStarted && !gameOverShown) {
        stopGameTimer();
        saveGameState();
    }
    flushAllSaves();
});

// ===== BOOT =====
async function boot() {
    // Init VK Bridge (required before any VK API calls)
    await initVkBridge();

    // Show the logged-in VK user
    fetchUserInfo();

    soundEnabled = await getSoundSetting(false);
    soundBtn.style.opacity = soundEnabled ? '1' : '0.5';
    if (soundWaves) soundWaves.style.display = soundEnabled ? '' : 'none';

    await fetchBestScore();
    bestScoreLoaded = true;
    bestScoreDisplay.textContent = bestScore;

    const userData = await loadUserData();
    if (userData && typeof userData === 'object') {
        const b = userData.boosters || {};
        boosters.hammer = typeof b.hammer === 'number' ? b.hammer : 0;
        boosters.rocket = typeof b.rocket === 'number' ? b.rocket : 0;
        boosters.swap = typeof b.swap === 'number' ? b.swap : 0;
        diamonds = typeof userData.diamonds === 'number' ? userData.diamonds : 0;
    } else {
        boosters = { hammer: 1, rocket: 1, swap: 1 };
        diamonds = 0;
        persistUserData();
    }

    // Обновляем отображение баланса сразу после загрузки,
    // иначе в шапке/магазине висит "💎 0" до первого открытия магазина.
    updateDiamondUI();
    updateBoostPanel();

    loadStats();
    loadDailyTasks();
    updateDailyTasksBadge();

    // Есть ли незавершённая игра (таймер остановлен, сохранено состояние)?
    const pending = loadSavedGame();
    gameStarted = true;

    if (pending && pending.timeLeft > 0 && !pending.gameOver) {
        savedGame = pending;
        restoreSavedGame(pending);
        stopGameTimer();
        showResumeModal();
    } else {
        if (pending) clearSavedGame();
        initGame();
    }

    if (!userData) {
        showMessage('🎁 Подарок: по 1 бустеру! Загляните в магазин');
    }

    if (loadingOverlay) loadingOverlay.classList.add('hidden');
    setTimeout(() => {
        if (loadingOverlay) loadingOverlay.remove();
    }, 500);

    // Report game ready to VK
    if (vkAvailable()) {
        vkBridge.send('VKWebAppUpdateConfig', {
            appearance: 'light',
            nav_bar_color: '#667eea',
            bg_color: '#667eea'
        }).catch(() => {});
    }
}

boot();
