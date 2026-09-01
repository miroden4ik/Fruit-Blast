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
    if (!vkAvailable()) return;
    vkBridge.send('VKWebAppGetUserInfo', {}).then(res => {
        if (res && res.first_name) {
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

// ===== DOM =====
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const gameOverModal = document.getElementById('game-over-modal');
const pauseModal = document.getElementById('pause-modal');
const leaderboardModal = document.getElementById('leaderboard-modal');
const playAgainBtn = document.getElementById('play-again-btn');
const resumeBtn = document.getElementById('resume-btn');
const restartBtn = document.getElementById('restart-btn');
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
        let localData = null;
        try {
            const raw = localStorage.getItem(VK_KEYS.data);
            localData = raw ? JSON.parse(raw) : null;
        } catch (e) {}
        if (!vkAvailable()) {
            resolve(localData);
            return;
        }
        vkStorageGet(VK_KEYS.data).then(val => {
            let vkData = null;
            if (val) {
                try { vkData = JSON.parse(val); } catch (e) {}
            }
            // VK storage is the cross-device source of truth, localStorage is a fallback
            resolve(vkData || localData);
        }).catch(() => resolve(localData));
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

// VK leaderboards require server-side integration (VK Services) or setting up
// through the developer console. We expose a hook that can be wired to your backend.
function submitLeaderboard() {
    // TODO: wire to your VK leaderboard backend (VK Services / custom API)
    return Promise.resolve();
}

function showLeaderboard() {
    leaderboardModal.classList.add('active');
    leaderboardList.innerHTML = '<div class="leaderboard-loading">Загрузка...</div>';
    // VK Mini Apps does not have a direct Bridge method for game leaderboards.
    // Integrate via VK Services/backend. For now show a placeholder.
    leaderboardList.innerHTML = '<div class="leaderboard-empty">Таблица лидеров VK настраивается через консоль разработчика и бэкенд. Пока доступны только локальные рекорды.</div>';
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

// ===== BOARD LOGIC =====
function initGame() {
    board = [];
    score = 0;
    comboCount = 0;
    selectedCell = null;
    isProcessing = false;
    isPaused = false;
    gameOverShown = false;
    activeBooster = null;
    swapBoostPick = null;
    diamondsAwardedForScore = 0;

    updateScoreDisplay();
    updateBoostPanel();
    updateDiamondUI();
    createBoard();

    while (findMatches().length > 0) {
        createBoard();
    }

    renderBoard();
    gameOverModal.classList.remove('active');
    leaderboardModal.classList.remove('active');
    pauseModal.classList.remove('active');
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
                    fruitDiv.innerHTML = bonusSvgHtml('bomb', id);
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
        const partnerType = board[other.row][other.col] && board[other.row][other.col].type;
        if (partnerType && partnerType !== 'rainbow') {
            rainbowActivated = true;
            playSoundRainbow();
            score += 50;
            updateScoreDisplay();
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (board[r][c] && board[r][c].type === partnerType && board[r][c].bonus !== 'rainbow') {
                        board[r][c] = null;
                    }
                }
            }
            board[rainbowPos.row][rainbowPos.col] = null;
            showMessage('Радуга! 🌈');
            await dropFruits();
            await fillEmptySpaces();
            renderBoard();
        }
    }

    const matches = findMatches();

    if (matches.length > 0) {
        comboCount = 0;
        await processMatches();
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
                addDiamonds(1);
            } else if (matchLength >= 5) {
                baseScore = 100;
                board[centerCell.row][centerCell.col] = { type: 'rainbow', bonus: 'rainbow' };
                createdBonus = 'rainbow';
                addDiamonds(2);
            }

            matchScore += baseScore;

            for (const cell of match.cells) {
                if (matchLength < 4 || cell.row !== centerCell.row || cell.col !== centerCell.col) {
                    allMatchedCells.add(`${cell.row},${cell.col}`);
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
                score += 20;
                playSoundBomb();
            } else if (bonusCell.bonus === 'rainbow') {
                const targetType = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
                for (let r = 0; r < BOARD_SIZE; r++) {
                    for (let c = 0; c < BOARD_SIZE; c++) {
                        if (board[r][c] && board[r][c].type === targetType && !board[r][c].bonus) {
                            allMatchedCells.add(`${r},${c}`);
                        }
                    }
                }
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
        pauseModal.classList.add('active');
    } else {
        pauseModal.classList.remove('active');
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
async function buyBoosterPack(id) {
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
        await vkBridge.send('VKWebAppShowOrderBox', { type: 'item', item: pack.id });
        // NOTE: for production verify order on your server via VKWebAppCheckOrder
        boosters[bId] += pack.qty;
        persistUserData();
        updateBoostPanel();
        showMessage('Оплата голосами прошла! +' + pack.qty + ' ' + BOOSTER_DEFS[bId].icon + ' ' + BOOSTER_DEFS[bId].name);
    } catch (e) {
        showMessage('Покупка отменена или не удалась');
    }
}

// VK payments flow:
// 1. VKWebAppGetOrderItems - fetch available order items (must be configured in VK console)
// 2. VKWebAppShowOrderBox - show native payment popup
// 3. VKWebAppCheckOrder - verify the order on your server
async function buyDiamondPack(packId) {
    const pack = DIAMOND_PACKS[packId];
    if (!pack) return;
    if (!vkAvailable()) {
        showMessage('Покупки доступны только в VK Mini Apps');
        return;
    }
    try {
        // Get the list of order items configured in the VK developer console
        const itemsRes = await vkBridge.send('VKWebAppGetOrderItems', {});
        const items = itemsRes.items || [];
        const item = items.find(i => i === packId);
        if (!item) {
            showMessage('Товар не найден. Настройте его в консоли VK');
            return;
        }
        await vkBridge.send('VKWebAppShowOrderBox', { type: 'item', item: packId });
        showMessage('Оплата голосами прошла! +' + pack.qty + ' 💎');
    } catch (e) {
        showMessage('Покупка отменена или не удалась');
    }
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
restartBtn.addEventListener('click', () => {
    if (vkAvailable()) {
        showFullscreenAd().then(() => initGame());
    } else {
        initGame();
    }
});
soundBtn.addEventListener('click', toggleSound);
leaderboardBtn.addEventListener('click', showLeaderboard);
leaderboardCloseBtn.addEventListener('click', () => leaderboardModal.classList.remove('active'));
leaderboardResultsBtn.addEventListener('click', showLeaderboard);

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
        flushAllSaves();
        if (!gameOverShown && !isPaused && gameStarted) {
            isPaused = true;
            pauseModal.classList.add('active');
        }
    }
});

window.addEventListener('pagehide', flushAllSaves);

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
        updateDiamondUI();
    }

    initGame();
    gameStarted = true;

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
