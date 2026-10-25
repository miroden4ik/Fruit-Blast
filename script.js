// Fruit Blast - Match-3 Game (VK Mini Apps version)
// ===== FRUIT DEFINITIONS (SVG) =====
// Each fruit SVG uses a gradient with a placeholder {ID} so instances get unique gradient ids.
const FRUIT_SVG = {
    apple: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}a" cx="34%" cy="26%" r="78%"><stop offset="0" stop-color="#ff9a8b"/><stop offset="46%" stop-color="#f0524a"/><stop offset="100%" stop-color="#b3152b"/></radialGradient><linearGradient id="{ID}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86df6f"/><stop offset="100%" stop-color="#2c9a45"/></linearGradient></defs><path d="M32 18C24 10 10 14 8 26c-2 12 6 26 16 30 3 1.6 5 1 8-.4 3 1.4 5 2 8 .4 10-4 18-18 16-30C54 14 40 10 32 18Z" fill="url(#{ID}a)"/><path d="M26 20c3 2 9 2 12 0" fill="none" stroke="#8d1b2c" stroke-width="2" stroke-linecap="round" opacity=".45"/><ellipse cx="21" cy="32" rx="7.5" ry="11" fill="#fff" opacity=".26" transform="rotate(-18 21 32)"/><ellipse cx="24" cy="28" rx="3" ry="4.5" fill="#fff" opacity=".5" transform="rotate(-18 24 28)"/><path d="M32 18c0-6 2-10 6-13" fill="none" stroke="#7b4a26" stroke-width="3.6" stroke-linecap="round"/><path d="M37 10c4-7 15-6 16-1-4 6-12 7-16 1Z" fill="url(#{ID}b)"/><path d="M40 10c4-2 8-2 11-1" fill="none" stroke="#e8ffe0" stroke-width="1.4" stroke-linecap="round" opacity=".7"/><path d="M12 46c3 6 8 10 13 12" fill="none" stroke="#5e0d1f" stroke-width="2" stroke-linecap="round" opacity=".22"/></svg>`,
    orange: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}a" cx="33%" cy="28%" r="76%"><stop offset="0" stop-color="#ffd166"/><stop offset="55%" stop-color="#ff9f1c"/><stop offset="100%" stop-color="#e26a00"/></radialGradient><radialGradient id="{ID}b" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffb703"/><stop offset="100%" stop-color="#e07b00"/></radialGradient></defs><circle cx="32" cy="33" r="25" fill="url(#{ID}a)"/><circle cx="32" cy="33" r="25" fill="none" stroke="#d96800" stroke-width="1.6" opacity=".5"/><g fill="#b85a00" opacity=".22"><circle cx="20" cy="20" r="1.1"/><circle cx="27" cy="17" r="1"/><circle cx="35" cy="18" r=".9"/><circle cx="43" cy="23" r="1.1"/><circle cx="47" cy="32" r="1"/><circle cx="44" cy="42" r="1.1"/><circle cx="36" cy="47" r="1"/><circle cx="27" cy="46" r=".9"/><circle cx="19" cy="38" r="1"/><circle cx="16" cy="28" r=".9"/></g><path d="M32 10c2-5 6-7 10-7" fill="none" stroke="#7b4a26" stroke-width="3" stroke-linecap="round"/><path d="M40 6c5-5 13-3 13 2-4 5-11 5-13-2Z" fill="#3fae57"/><ellipse cx="23" cy="24" rx="8" ry="5.5" fill="#fff" opacity=".36" transform="rotate(-28 23 24)"/><ellipse cx="20" cy="36" rx="3" ry="5" fill="#fff" opacity=".18" transform="rotate(-12 20 36)"/><path d="M18 45c4 6 10 9 17 9" fill="none" stroke="#b85700" stroke-width="2" stroke-linecap="round" opacity=".35"/></svg>`,
    strawberry: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}a" cx="34%" cy="24%" r="82%"><stop offset="0" stop-color="#ff8fb1"/><stop offset="48%" stop-color="#f43f5e"/><stop offset="100%" stop-color="#a80f33"/></radialGradient><linearGradient id="{ID}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fe06a"/><stop offset="100%" stop-color="#2d9c44"/></linearGradient></defs><path d="M32 15c13 0 21 9 19 22-2 13-11 21-19 24-8-3-17-11-19-24-2-13 6-22 19-22Z" fill="url(#{ID}a)"/><ellipse cx="22" cy="28" rx="7" ry="10" fill="#fff" opacity=".2" transform="rotate(-16 22 28)"/><ellipse cx="25" cy="25" rx="2.8" ry="4.2" fill="#fff" opacity=".42" transform="rotate(-16 25 25)"/><g fill="#ffe27a"><ellipse cx="27" cy="30" rx="1.35" ry="2" transform="rotate(-10 27 30)"/><ellipse cx="37" cy="29" rx="1.35" ry="2" transform="rotate(12 37 29)"/><ellipse cx="31" cy="37" rx="1.35" ry="2"/><ellipse cx="22" cy="39" rx="1.35" ry="2" transform="rotate(-12 22 39)"/><ellipse cx="42" cy="38" rx="1.35" ry="2" transform="rotate(12 42 38)"/><ellipse cx="27" cy="46" rx="1.3" ry="1.9" transform="rotate(-8 27 46)"/><ellipse cx="37" cy="46" rx="1.3" ry="1.9" transform="rotate(8 37 46)"/><ellipse cx="32" cy="53" rx="1.2" ry="1.8"/></g><path d="M32 16c-2-5-6-7-11-7 0 5 4 9 9 9M32 16c2-5 6-7 11-7 0 5-4 9-9 9M32 15c-5-2-9-1-12 2 4 3 9 3 12 0M32 15c5-2 9-1 12 2-4 3-9 3-12 0" fill="url(#{ID}b)"/><path d="M32 16c0-4 1-7 3-10" fill="none" stroke="#2d9c44" stroke-width="2.6" stroke-linecap="round"/></svg>`,
    grape: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}a" cx="34%" cy="30%" r="72%"><stop offset="0" stop-color="#c08bf0"/><stop offset="52%" stop-color="#8e44dd"/><stop offset="100%" stop-color="#5b2296"/></radialGradient><linearGradient id="{ID}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fe06a"/><stop offset="100%" stop-color="#2d9c44"/></linearGradient></defs><path d="M32 12c3-4 8-5 11-3" fill="none" stroke="#6b3f1d" stroke-width="3" stroke-linecap="round"/><path d="M33 12c4-4 12-4 14 1-4 4-11 5-14-1Z" fill="url(#{ID}b)"/><g><circle cx="32" cy="21" r="8.4" fill="url(#{ID}a)"/><circle cx="22" cy="31" r="8.4" fill="url(#{ID}a)"/><circle cx="42" cy="31" r="8.4" fill="url(#{ID}a)"/><circle cx="27" cy="42" r="8.4" fill="url(#{ID}a)"/><circle cx="37" cy="42" r="8.4" fill="url(#{ID}a)"/><circle cx="32" cy="52" r="7.4" fill="url(#{ID}a)"/></g><g fill="#fff"><ellipse cx="29" cy="17.5" rx="2.6" ry="1.7" opacity=".5" transform="rotate(-20 29 17.5)"/><ellipse cx="19" cy="27.5" rx="2.6" ry="1.7" opacity=".5" transform="rotate(-20 19 27.5)"/><ellipse cx="39" cy="27.5" rx="2.6" ry="1.7" opacity=".45" transform="rotate(-20 39 27.5)"/><ellipse cx="24" cy="38.5" rx="2.4" ry="1.6" opacity=".4" transform="rotate(-20 24 38.5)"/><ellipse cx="34" cy="38.5" rx="2.4" ry="1.6" opacity=".4" transform="rotate(-20 34 38.5)"/></g><g fill="#3f146e" opacity=".28"><circle cx="22" cy="35" r="1.2"/><circle cx="42" cy="35" r="1.2"/><circle cx="27" cy="46" r="1.2"/><circle cx="37" cy="46" r="1.2"/><circle cx="32" cy="56" r="1"/></g></svg>`,
    watermelon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="{ID}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#54e07e"/><stop offset="45%" stop-color="#2eb85c"/><stop offset="100%" stop-color="#137a3b"/></linearGradient><linearGradient id="{ID}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7b86"/><stop offset="60%" stop-color="#f43f5e"/><stop offset="100%" stop-color="#c2185b"/></linearGradient></defs><path d="M6 44a26 26 0 0 1 52 0c0 2.5-2 4-4.6 4H10.6C8 48 6 46.5 6 44Z" fill="url(#{ID}a)"/><path d="M10.5 43.5a21.5 21.5 0 0 1 43 0c0 1.6-1.4 2.5-3.2 2.5H13.7c-1.8 0-3.2-.9-3.2-2.5Z" fill="#f6ffe9"/><path d="M13.6 43.2a18.4 18.4 0 0 1 36.8 0c0 1.2-1 1.8-2.4 1.8H16c-1.4 0-2.4-.6-2.4-1.8Z" fill="url(#{ID}b)"/><g fill="#34122b"><ellipse cx="24" cy="39" rx="1.4" ry="2.1" transform="rotate(-14 24 39)"/><ellipse cx="33" cy="35" rx="1.4" ry="2.1"/><ellipse cx="42" cy="39" rx="1.4" ry="2.1" transform="rotate(14 42 39)"/><ellipse cx="29" cy="43" rx="1.4" ry="2" transform="rotate(-8 29 43)"/><ellipse cx="38" cy="43" rx="1.4" ry="2" transform="rotate(8 38 43)"/></g><path d="M14 33c4-8 11-13 20-14" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/><path d="M8.5 45.5c5 2 11 3 17 3" fill="none" stroke="#0d5c2d" stroke-width="1.8" stroke-linecap="round" opacity=".4"/></svg>`,
    lemon: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}a" cx="34%" cy="26%" r="78%"><stop offset="0" stop-color="#fff59d"/><stop offset="48%" stop-color="#ffd54f"/><stop offset="100%" stop-color="#e6a100"/></radialGradient><linearGradient id="{ID}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fe06a"/><stop offset="100%" stop-color="#2d9c44"/></linearGradient></defs><path d="M8 38C5 23 17 8 33 8c17 0 27 15 23 30-4 15-16 21-29 20C15 57 9 49 8 38Z" fill="url(#{ID}a)"/><path d="M9 37c-1-3 0-6 2-8M57 36c1-3 0-6-2-8" fill="none" stroke="#d99a00" stroke-width="2.4" stroke-linecap="round" opacity=".65"/><g fill="#d99a00" opacity=".24"><circle cx="21" cy="20" r="1.1"/><circle cx="30" cy="16" r="1"/><circle cx="40" cy="18" r="1.1"/><circle cx="48" cy="25" r="1"/><circle cx="50" cy="36" r="1.1"/><circle cx="44" cy="46" r="1"/><circle cx="34" cy="50" r=".9"/><circle cx="23" cy="47" r="1"/><circle cx="16" cy="37" r="1"/></g><ellipse cx="24" cy="24" rx="9" ry="5.5" fill="#fff" opacity=".42" transform="rotate(-26 24 24)"/><ellipse cx="19" cy="34" rx="2.8" ry="5" fill="#fff" opacity=".2" transform="rotate(-12 19 34)"/><path d="M32 9c1-4 3-6 7-7" fill="none" stroke="#6b3f1d" stroke-width="2.6" stroke-linecap="round"/><path d="M39 4c4-4 11-2 11 2-4 4-9 4-11-2Z" fill="url(#{ID}b)"/></svg>`
};

const BONUS_SVG = {
    bomb: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}a" cx="34%" cy="28%" r="76%"><stop offset="0" stop-color="#5b6472"/><stop offset="48%" stop-color="#2b3442"/><stop offset="100%" stop-color="#11151d"/></radialGradient><radialGradient id="{ID}b" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff3b0"/><stop offset="55%" stop-color="#ffb703"/><stop offset="100%" stop-color="#ff6b35"/></radialGradient></defs><circle cx="32" cy="36" r="22" fill="url(#{ID}a)"/><circle cx="32" cy="36" r="22" fill="none" stroke="#0b0e14" stroke-width="1.5" opacity=".6"/><ellipse cx="24" cy="27" rx="7" ry="5" fill="#fff" opacity=".2" transform="rotate(-28 24 27)"/><ellipse cx="22" cy="25" rx="3" ry="2.2" fill="#fff" opacity=".4" transform="rotate(-28 22 25)"/><path d="M40 18c2-6 7-8 10-8" fill="none" stroke="#c98b3b" stroke-width="3.6" stroke-linecap="round"/><path d="M50 10l3-3M51 14l4 0M47 7l1-4" stroke="#ffd166" stroke-width="2.4" stroke-linecap="round"/><circle cx="50" cy="9" r="4.4" fill="url(#{ID}b)"/><circle cx="50" cy="9" r="4.4" fill="none" stroke="#ff8c42" stroke-width="1.2"/></svg>`,
    rainbow: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="{ID}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5f6d"/><stop offset="25%" stop-color="#ffc24b"/><stop offset="50%" stop-color="#2fd6a7"/><stop offset="75%" stop-color="#4f8bff"/><stop offset="100%" stop-color="#b06bff"/></linearGradient><radialGradient id="{ID}b" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="32" r="25" fill="url(#{ID}b)"/><circle cx="32" cy="32" r="21.5" fill="none" stroke="#ff5f6d" stroke-width="4.6"/><circle cx="32" cy="32" r="16.6" fill="none" stroke="#ffc24b" stroke-width="4.4"/><circle cx="32" cy="32" r="11.9" fill="none" stroke="#2fd6a7" stroke-width="4.2"/><circle cx="32" cy="32" r="7.4" fill="none" stroke="#4f8bff" stroke-width="4"/><circle cx="32" cy="32" r="3.2" fill="#b06bff"/><g fill="#fff"><path d="M32 2l1.7 4.4L38 8l-4.3 1.6L32 14l-1.7-4.4L26 8l4.3-1.6Z"/><path d="M55 43l1.3 3.2 3.2 1.3-3.2 1.3L55 52l-1.3-3.2-3.2-1.3 3.2-1.3Z" opacity=".85"/><path d="M9 40l1.1 2.7 2.7 1.1-2.7 1.1L9 47.6l-1.1-2.7L5.2 43.8l2.7-1.1Z" opacity=".7"/></g><path d="M18 15a22 22 0 0 1 12-5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".55"/></svg>`,
    star: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="{ID}a" cx="42%" cy="34%" r="66%"><stop offset="0" stop-color="#fffde7"/><stop offset="42%" stop-color="#ffd93d"/><stop offset="100%" stop-color="#ff9f1c"/></radialGradient><radialGradient id="{ID}b" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="32" r="27" fill="url(#{ID}b)"/><path d="M32 3.5l7.6 18.5 20 1.7-15.2 13.1 4.6 19.6L32 46.2 15 56.4l4.6-19.6L4.4 23.7l20-1.7Z" fill="url(#{ID}a)" stroke="#f59e0b" stroke-width="1.6" stroke-linejoin="round"/><path d="M32 10.5l5.4 13.2 14.2 1.2-10.8 9.3 3.3 14-12.1-7.3-12.1 7.3 3.3-14L12.4 24.9l14.2-1.2Z" fill="none" stroke="#fff" stroke-width="1.4" opacity=".55"/><path d="M32 20l3.4 8.4 9 .8-6.8 5.9 2 8.9L32 39.5l-7.6 4.5 2-8.9-6.8-5.9 9-.8Z" fill="#fff8c9" opacity=".75"/><g fill="#fff"><circle cx="52" cy="12" r="2"/><circle cx="12" cy="17" r="1.5"/><circle cx="50" cy="52" r="1.6"/><circle cx="14" cy="50" r="1.3"/></g></svg>`
};

const UI_ICON_SVG = {
    hammer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4.5 19 9l-2 2-4.5-4.5z"/><path d="M13 8 4.5 16.5a2.1 2.1 0 0 0 3 3L16 11"/><path d="M12 3l2-2 7 7-2 2"/></svg>`,
    rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 14 4 12l3-3 4 .8"/><path d="M10 15l2 5 3-3-.8-4"/><path d="M9.5 14.5C7 9 11 4 19 3c1 8-4 12-9.5 11.5Z"/><circle cx="14.5" cy="8.5" r="1.6"/></svg>`,
    swap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3-3"/><path d="M20 16H7l3 3"/></svg>`,
    target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,
    matches: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6" fill="currentColor" opacity=".3"/></svg>`,
    bonus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/><path d="M19 17.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" opacity=".7"/></svg>`,
    combo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 .8-3.4 2-4.6.2 1.8 1 2.8 2.2 3.3C11 8.5 11 5.5 12 2.5Z"/><path d="M12 21.5v-1"/></svg>`,
    playtime: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12.5" r="8.5"/><path d="M12 7.5v5.3l3.4 2"/><path d="M9.5 2.5h5"/></svg>`,
    diamond: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M7 3h10l4 6-9 12L3 9Z"/><path d="M3 9h18M9.5 3 8 9l4 12 4-12-1.5-6"/></svg>`,
    trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H4.5v1.5A3.5 3.5 0 0 0 8 11M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11"/><path d="M12 13v4M8.5 21h7M10 21v-4h4v4"/></svg>`,
    lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.4"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>`,
    bomb: `<svg viewBox="0 0 24 24" fill="#2b3442" stroke="#1b2230" stroke-width="1.2"><circle cx="10.5" cy="14.5" r="7.5"/><path d="M15.5 8.5c1.5-2.5 3.4-3 5-2.8" fill="none" stroke="#c98b3b" stroke-width="2" stroke-linecap="round"/><path d="M20.5 3.5l-1 2.6M22 6l-2.6.8M19 2.2l.4 2.4" fill="none" stroke="#ffb703" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="12" r="2" fill="#fff" opacity=".3"/></svg>`
};

function iconHtml(name) {
    return UI_ICON_SVG[name] || '';
}

function hydrateDecorations() {
    document.querySelectorAll('[data-icon]').forEach(el => {
        if (!el.dataset.hydrated) {
            el.innerHTML = iconHtml(el.dataset.icon);
            el.dataset.hydrated = '1';
        }
    });
    const wrap = document.getElementById('loading-fruit');
    if (wrap && !wrap.childElementCount) {
        ['apple', 'orange', 'strawberry', 'grape', 'watermelon', 'lemon'].forEach((type, i) => {
            const span = document.createElement('span');
            span.className = 'lf';
            span.innerHTML = FRUIT_SVG[type].split('{ID}').join('lf' + i);
            wrap.appendChild(span);
        });
    }
}

const FRUIT_TYPES = Object.keys(FRUIT_SVG);

const FRUIT_COLORS = {
    apple: '#f0524a',
    orange: '#ff9f1c',
    strawberry: '#f43f5e',
    grape: '#8e44dd',
    watermelon: '#2eb85c',
    lemon: '#ffd54f'
};

const COMBO_COLORS = ['#27AE60', '#2ECC71', '#F1C40F', '#E67E22', '#E74C3C', '#9B59B6', '#3498DB'];

const DAILY_TASK_VERSION = 3;

// ===== DAILY TASKS =====
const DAILY_TASK_DEFS = [
    { type: 'score',    template: 'Набери {n} очков',        targets: [800, 1200, 1600], reward: 6 },
    { type: 'matches',  template: 'Собери {n} совпадений',    targets: [25, 35, 50],      reward: 5 },
    { type: 'bonus',    template: 'Создай {n} {word}',        targets: [3, 5, 7],         reward: 8, words: ['бонус', 'бонуса', 'бонусов'] },
    { type: 'combo',    template: 'Сделай {n} комбо подряд',  targets: [3, 5, 7],         reward: 10 },
    { type: 'playtime', template: 'Играй {n} минут',          targets: [5, 10, 15],       reward: 4 }
];
const DAILY_TASK_TYPES = DAILY_TASK_DEFS.map(d => d.type);
const DAILY_TASK_ICONS = {
    score: 'target',
    matches: 'matches',
    bonus: 'bonus',
    combo: 'combo',
    playtime: 'playtime'
};

function pluralRu(n, one, few, many) {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
    return many;
}

function buildTaskName(def, target) {
    const word = def.words ? pluralRu(target, def.words[0], def.words[1], def.words[2]) : '';
    return def.template.replace('{n}', target).replace('{word}', word);
}

// ===== BOOSTERS & DIAMONDS =====
const BOOSTER_DEFS = {
    hammer: { name: 'Молоток', icon: '🔨', price: 15 },
    rocket: { name: 'Ракета', icon: '🚀', price: 25 },
    swap: { name: 'Обмен', icon: '🔄', price: 20 }
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
const DIAMONDS_PER_SCORE = 400;

// Paid booster packs (VK order items priced in votes, 1 vote = 7 rubles)
const BOOSTER_PACKS = {
    hammer: { id: 'hammer_pack', qty: 6, votes: 7 },
    rocket: { id: 'rocket_pack', qty: 5, votes: 11 },
    swap:   { id: 'swap_pack',   qty: 5, votes: 10 }
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

const _vkLaunchParams = (() => {
    try {
        const raw = (window.location.search || '') + '&' + (window.location.hash || '').replace(/^#/, '');
        return new URLSearchParams(raw);
    } catch (e) {
        return null;
    }
})();
// Вне VK launch-параметров нет, и VKWebAppInit там не отвечает — игру нельзя вешать на него.
const IS_VK_ENV = !!(_vkLaunchParams && (_vkLaunchParams.get('vk_app_id') || _vkLaunchParams.get('vk_user_id')));

function initVkBridge() {
    return new Promise(resolve => {
        if (!IS_VK_ENV || typeof vkBridge === 'undefined' || !vkBridge.send) {
            resolve(false);
            return;
        }
        let settled = false;
        const done = ok => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolve(ok);
        };
        const timer = setTimeout(() => {
            console.warn('[vk] VKWebAppInit timeout — продолжаем без VK');
            done(false);
        }, 3000);
        try {
            vkBridge.send('VKWebAppInit', {}).then(() => done(true)).catch(() => done(false));
        } catch (e) {
            done(false);
        }
    });
}

function vkAvailable() {
    return IS_VK_ENV && typeof vkBridge !== 'undefined' && !!vkBridge.send;
}

// Storage helper: values in VK storage must be strings (max 4096 chars)
const VK_KEYS = {
    sound: 'fruitBlastSoundEnabled',
    best: 'fruitBlastBestScore',
    data: 'fruitBlastData',
    stats: 'fruitBlastStats',
    dailyTasks: 'fruitBlastDailyTasks',
    progression: 'fruitBlastProgression'
};
const _CS_ALL_KEYS = Object.values(VK_KEYS);

function vkStorageGet(key) {
    return vkStorageGetBatch([key]).then(obj => (obj && obj[key] !== undefined) ? obj[key] : null);
}

function vkStorageGetBatch(keysArr) {
    return new Promise(resolve => {
        const out = {};
        if (!vkAvailable() || !Array.isArray(keysArr) || keysArr.length === 0) { resolve(out); return; }
        const unique = [];
        keysArr.forEach(k => { if (!unique.includes(k)) unique.push(k); });
        vkBridge.send('VKWebAppStorageGet', { keys: unique }).then(res => {
            if (res && Array.isArray(res.keys)) {
                res.keys.forEach(row => { if (row && row.key !== undefined) out[row.key] = (row.value === undefined || row.value === null) ? null : row.value; });
            }
            resolve(out);
        }).catch(() => resolve(out));
    });
}

function vkStorageSet(key, value) {
    if (!vkAvailable()) return Promise.resolve();
    return vkBridge.send('VKWebAppStorageSet', { key: key, value: String(value) }).catch(() => {});
}

// =====================================================
//  CLOUD SYNC — ЕДИНАЯ ОБЛАЧНАЯ СИНХРОНИЗАЦИЯ ВСЕХ ДАННЫХ
// =====================================================
const _CS = {
    dirty: new Set(),
    dirtyAt: 0,
    pushTimer: null,
    pushMs: 1200,
    syncing: false,
    intervalId: null,
    intervalMs: 15000,
    lastPullAt: 0,
    lastPushAt: 0,
    lbRefreshId: null,
    lbMs: 10000,
    lbCacheUntil: 0,
    lbCached: null,
    lbCachedPeriod: 'all'
};

function _cs_safeParseJSON(str, fallback) {
    if (!str) return fallback;
    try { return JSON.parse(str); } catch (e) { return fallback; }
}

function _cs_mergeNumbers(a, b) {
    const an = Number(a) || 0;
    const bn = Number(b) || 0;
    return an > bn ? an : bn;
}

function _cs_mergeStats(localObj, remoteObj) {
    if (!localObj && !remoteObj) return gameStats;
    const baseL = localObj || {};
    const baseR = remoteObj || {};
    const keys = ['gamesPlayed', 'totalScore', 'bestScore', 'bestCombo', 'totalCombos', 'bombsCreated', 'rainbowsCreated', 'starsCreated', 'totalMatches', 'totalPlayTimeSec'];
    const out = Object.assign({}, gameStats || {});
    keys.forEach(k => { out[k] = Math.max(Number(baseL[k] || 0), Number(baseR[k] || 0), Number(out[k] || 0)); });
    return out;
}

function _cs_mergeUserData(localObj, remoteObj) {
    const L = localObj || {};
    const R = remoteObj || {};
    const Lb = L.boosters || {};
    const Rb = R.boosters || {};
    return {
        boosters: {
            hammer: Math.max(Number(Lb.hammer || 0), Number(Rb.hammer || 0), Number(boosters.hammer || 0)),
            rocket: Math.max(Number(Lb.rocket || 0), Number(Rb.rocket || 0), Number(boosters.rocket || 0)),
            swap:   Math.max(Number(Lb.swap   || 0), Number(Rb.swap   || 0), Number(boosters.swap   || 0))
        },
        diamonds: Math.max(Number(L.diamonds || 0), Number(R.diamonds || 0), Number(diamonds || 0))
    };
}

function _cs_mergeTasks(localObj, remoteObj) {
    const today = new Date().toISOString().slice(0, 10);
    const L = localObj || null;
    const R = remoteObj || null;
    const Ltoday = L && L.date === today;
    const Rtoday = R && R.date === today;
    if (!Ltoday && !Rtoday) return { date: today, tasks: null, stale: true };
    let A, B;
    if (Ltoday && Rtoday) { A = L.tasks || []; B = R.tasks || []; }
    else {
        const fresh = Ltoday ? L : R;
        return { date: today, tasks: (fresh && Array.isArray(fresh.tasks)) ? fresh.tasks : null, stale: false };
    }
    const merged = A.map(a => {
        const b = B.find(x => x && x.id === a.id) || {};
        return {
            id: a.id,
            type: a.type || b.type || 'score',
            template: a.template || b.template || '',
            icon: a.icon || b.icon || '',
            target: Number(a.target || b.target || 1),
            progress: Math.max(Number(a.progress || 0), Number(b.progress || 0)),
            reward: Number(a.reward || b.reward || 0),
            completed: !!a.completed || !!b.completed,
            claimed: !!a.claimed || !!b.claimed,
            name: a.name || b.name || ''
        };
    });
    if (B.length > merged.length) {
        B.forEach(b => {
            if (!b || b.id == null) return;
            if (!merged.find(m => m.id === b.id)) {
                merged.push({
                    id: b.id, type: b.type || 'score', template: b.template || '',
                    icon: b.icon || '', target: Number(b.target || 1),
                    progress: Number(b.progress || 0), reward: Number(b.reward || 0),
                    completed: !!b.completed, claimed: !!b.claimed, name: b.name || ''
                });
            }
        });
    }
    return { date: today, tasks: merged, stale: false };
}

function _cs_mergeSound(localVal, remoteVal) {
    if (localVal === '1' || localVal === '0') return localVal === '1';
    if (remoteVal === 'true' || remoteVal === '1' || remoteVal === 'false' || remoteVal === '0') return remoteVal === 'true' || remoteVal === '1';
    if (soundEnabled != null) return soundEnabled;
    return true;
}

function _cs_applyToRuntime(state) {
    if (!state) return;
    let changed = false;
    if (typeof state.best === 'number' && state.best > bestScore) {
        bestScore = state.best;
        bestScoreLoaded = true;
        changed = true;
    }
    if (typeof state.sound === 'boolean' && state.sound !== soundEnabled) {
        soundEnabled = state.sound;
        changed = true;
    }
    if (state.userData && state.userData.boosters) {
        ['hammer', 'rocket', 'swap'].forEach(id => {
            const n = Number(state.userData.boosters[id] || 0);
            if (n > (boosters[id] || 0)) { boosters[id] = n; changed = true; }
        });
    }
    if (typeof state.userDataDiamonds === 'number' && state.userDataDiamonds > diamonds) {
        diamonds = state.userDataDiamonds;
        changed = true;
    }
    if (state.stats) {
        Object.keys(state.stats).forEach(k => {
            const v = Number(state.stats[k] || 0);
            if (gameStats && (gameStats[k] == null || v > gameStats[k])) { gameStats[k] = v; changed = true; }
        });
    }
    if (state.tasks && state.tasks.date && Array.isArray(state.tasks.tasks) && state.tasks.tasks.length > 0) {
        const today = new Date().toISOString().slice(0, 10);
        if (state.tasks.date === today) {
            const rem = state.tasks.tasks;
            if (!Array.isArray(dailyTasks) || dailyTasks.length === 0) {
                dailyTasks = rem;
                dailyTasksDate = today;
                changed = true;
            } else {
                let lc = false;
                rem.forEach(b => {
                    const a = dailyTasks.find(x => x && x.id === b.id);
                    if (a) {
                        const np = Math.max(Number(a.progress || 0), Number(b.progress || 0));
                        const nc = !!a.completed || !!b.completed;
                        const ncl = !!a.claimed || !!b.claimed;
                        if (np !== a.progress) { a.progress = np; lc = true; }
                        if (nc !== a.completed) { a.completed = nc; lc = true; }
                        if (ncl !== a.claimed) { a.claimed = ncl; lc = true; }
                    } else {
                        dailyTasks.push({
                            id: b.id, type: b.type || 'score', template: b.template || '',
                            icon: b.icon || '', target: Number(b.target || 1),
                            progress: Number(b.progress || 0), reward: Number(b.reward || 0),
                            completed: !!b.completed, claimed: !!b.claimed, name: b.name || ''
                        });
                        lc = true;
                    }
                });
                if (lc) { dailyTasksDate = today; changed = true; }
            }
        }
    }
    if (!dailyTasksAreValid()) {
        generateDailyTasks();
        changed = true;
    }
    return changed;
}

function _cs_localReadAll() {
    return {
        sound: localStorage.getItem('fruitBlastSoundLocal'),
        best: localStorage.getItem('fruitBlastBestScore'),
        data: localStorage.getItem(VK_KEYS.data),
        stats: localStorage.getItem('fruitBlastStats'),
        dailyTasks: localStorage.getItem('fruitBlastDailyTasks'),
        progression: localStorage.getItem(VK_KEYS.progression)
    };
}

function cloudSync_pullAll() {
    return vkStorageGetBatch(_CS_ALL_KEYS).then(remote => {
        const local = _cs_localReadAll();
        const rSound = (remote && remote[VK_KEYS.sound] != null) ? remote[VK_KEYS.sound] : null;
        const rBest = (remote && remote[VK_KEYS.best] != null) ? remote[VK_KEYS.best] : null;
        const rData = (remote && remote[VK_KEYS.data] != null) ? remote[VK_KEYS.data] : null;
        const rStats = (remote && remote[VK_KEYS.stats] != null) ? remote[VK_KEYS.stats] : null;
        const rTasks = (remote && remote[VK_KEYS.dailyTasks] != null) ? remote[VK_KEYS.dailyTasks] : null;
        const rProgression = (remote && remote[VK_KEYS.progression] != null) ? remote[VK_KEYS.progression] : null;

        const localSound = local.sound;
        const bestSound = _cs_mergeSound(localSound, rSound);

        const localBestRaw = local.best;
        const mergedBest = Math.max(
            Number(localBestRaw || 0),
            Number(rBest || 0),
            Number(bestScore || 0)
        );

        const localDataObj = _cs_safeParseJSON(local.data, null);
        const remoteDataObj = _cs_safeParseJSON(rData, null);
        const mergedUserData = _cs_mergeUserData(localDataObj, remoteDataObj);

        const localStatsObj = _cs_safeParseJSON(local.stats, null);
        const remoteStatsObj = _cs_safeParseJSON(rStats, null);
        const mergedStats = _cs_mergeStats(localStatsObj, remoteStatsObj);

        const localTasksObj = _cs_safeParseJSON(local.dailyTasks, null);
        const remoteTasksObj = _cs_safeParseJSON(rTasks, null);
        const mergedTasks = _cs_mergeTasks(localTasksObj, remoteTasksObj);

        if (window._pg && rProgression) window._pg.mergeRemote(rProgression);

        const runtimeState = {
            sound: bestSound,
            best: mergedBest,
            userData: mergedUserData,
            userDataDiamonds: mergedUserData.diamonds,
            stats: mergedStats,
            tasks: mergedTasks.stale ? null : mergedTasks
        };
        if (mergedTasks.stale && (!Array.isArray(dailyTasks) || dailyTasks.length === 0)) {
            generateDailyTasks();
        }
        const changed = _cs_applyToRuntime(runtimeState);
        return { changed, remote, mergedStats, mergedUserData, mergedBest, mergedTasks, mergedSound: bestSound };
    });
}

function cloudSync_pushAllImmediate() {
    if (_CS.pushTimer) { clearTimeout(_CS.pushTimer); _CS.pushTimer = null; }
    const calls = [];
    const dirtyKeys = _CS_ALL_KEYS;
    dirtyKeys.forEach(key => {
        let vStr = null;
        switch (key) {
            case VK_KEYS.sound:  vStr = soundEnabled ? 'true' : 'false'; localStorage.setItem('fruitBlastSoundLocal', soundEnabled ? '1' : '0'); break;
            case VK_KEYS.best:   vStr = String(bestScore || 0); localStorage.setItem('fruitBlastBestScore', vStr); break;
            case VK_KEYS.data: {
                const obj = { boosters, diamonds };
                vStr = JSON.stringify(obj);
                try { localStorage.setItem(key, vStr); } catch (e) {}
                break;
            }
            case VK_KEYS.stats: {
                vStr = JSON.stringify(gameStats || {});
                try { localStorage.setItem('fruitBlastStats', vStr); } catch (e) {}
                break;
            }
            case VK_KEYS.dailyTasks: {
                vStr = JSON.stringify({ date: dailyTasksDate, tasks: dailyTasks });
                try { localStorage.setItem('fruitBlastDailyTasks', vStr); } catch (e) {}
                break;
            }
            case VK_KEYS.progression: {
                if (window._pg) {
                    vStr = window._pg.serialize();
                    try { localStorage.setItem(VK_KEYS.progression, vStr); } catch (e) {}
                }
                break;
            }
        }
        if (vStr != null) calls.push(vkStorageSet(key, vStr));
    });
    _CS.dirty.clear();
    _CS.dirtyAt = 0;
    _CS.lastPushAt = Date.now();
    return Promise.all(calls).catch(() => {});
}

function cloudSync_markDirty() {
    _CS.dirtyAt = Date.now();
    if (_CS.pushTimer) return;
    _CS.pushTimer = setTimeout(() => {
        _CS.pushTimer = null;
        cloudSync_pushAllImmediate();
    }, _CS.pushMs);
}

function cloudSync_flushNow() {
    return cloudSync_pushAllImmediate();
}

function cloudSync_renderUI() {
    try { updateDiamondUI(); } catch (e) {}
    try { updateBoostPanel(); } catch (e) {}
    try { if (bestScoreDisplay) bestScoreDisplay.textContent = '🏆 ' + bestScore; } catch (e) {}
    try { if (soundBtn) soundBtn.textContent = soundEnabled ? '🔊' : '🔇'; } catch (e) {}
    try { if (soundWaves) soundWaves.style.display = soundEnabled ? 'flex' : 'none'; } catch (e) {}
    try { updateDailyTasksBadge(); } catch (e) {}
    try { renderTasksModalIfOpen(); } catch (e) {}
    try { renderProfileModalIfOpen(); } catch (e) {}
    try { renderStoreIfOpen(); } catch (e) {}
    try { if (window._pg) window._pg.refreshUI(); } catch (e) {}
}

function cloudSync_fullSync(pullOnly) {
    if (_CS.syncing) return _CS.syncingPromise || Promise.resolve({ changed: false });
    _CS.syncing = true;
    _CS.syncingPromise = cloudSync_pullAll().then(res => {
        const changed = !!(res && res.changed);
        if (changed) cloudSync_renderUI();
        if (pullOnly !== true) {
            return cloudSync_pushAllImmediate().then(() => {
                _CS.lastPullAt = Date.now();
                _CS.syncing = false;
                _CS.syncingPromise = null;
                return Object.assign({}, res || {}, { pushed: true });
            });
        }
        _CS.lastPullAt = Date.now();
        _CS.syncing = false;
        _CS.syncingPromise = null;
        return res || { changed: false };
    }).catch(err => {
        console.warn('[cloudSync] fullSync error:', err);
        _CS.syncing = false;
        _CS.syncingPromise = null;
        return { changed: false, error: err };
    });
    return _CS.syncingPromise;
}

function cloudSync_prepareForModal(name) {
    const pull = cloudSync_fullSync(true);
    return pull.then(res => {
        if (window._leaderboard && name === 'leaderboard') {
            // дополнительный синхронный пуш текущего счёта перед показом
            if (score > 0) submitLeaderboard(score);
        }
        return res;
    });
}

function cloudSync_startInterval() {
    cloudSync_stopInterval();
    _CS.intervalId = setInterval(() => {
        cloudSync_fullSync(false);
    }, _CS.intervalMs);
}
function cloudSync_stopInterval() {
    if (_CS.intervalId) { clearInterval(_CS.intervalId); _CS.intervalId = null; }
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
        trackTaskProgress('combo', 1);
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
let diamondsEarnedThisGame = 0;

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
let starsCreatedThisGame = 0;
let comboHitsThisGame = 0;
let playSecondsThisGame = 0;
let playSecondsTracked = 0;
let newRecordThisGame = false;

// ===== TIMER STATE =====
const GAME_DURATION = 20 * 60; // 20 минут в секундах
let timeLeft = GAME_DURATION;
let gameTimerInterval = null;
let lastTimerTick = 0;
let savedGame = null; // автосохранённое состояние (время, счёт, доска)
let helpResumesOnClose = false;

// ===== HINT SYSTEM =====
let hintTimeoutId = null;
let hintCells = null;
const HINT_DELAY_MS = 5000;

// ===== DOM =====
const gameContainer = document.querySelector('.game-container');
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const gameOverModal = document.getElementById('game-over-modal');
const finalScore = document.getElementById('final-score');
const modalBestScore = document.getElementById('modal-best-score');
const modalRecordBadge = document.getElementById('modal-record-badge');
const statDiamonds = document.getElementById('stat-diamonds');
const statCombo = document.getElementById('stat-combo');
const statMatches = document.getElementById('stat-matches');
const statStars = document.getElementById('stat-stars');
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
const livesContainer = null;
const livesDisplay = null;

// ===== VK STORAGE / PLAYER =====
function getSoundSetting(defaultVal) {
    const local = localStorage.getItem('fruitBlastSoundLocal');
    if (local !== null) return Promise.resolve(local === '1');
    return vkStorageGet(VK_KEYS.sound).then(val => {
        if (val !== null && val !== undefined && val !== '') return val === 'true' || val === '1';
        return defaultVal;
    });
}

function fetchBestScore() {
    const local = parseInt(localStorage.getItem('fruitBlastBestScore')) || 0;
    return vkStorageGet(VK_KEYS.best).then(val => {
        const vkBest = val ? parseInt(val) || 0 : 0;
        bestScore = Math.max(local, vkBest);
        bestScoreLoaded = true;
        return bestScore;
    }).catch(() => {
        bestScore = parseInt(localStorage.getItem('fruitBlastBestScore')) || 0;
        bestScoreLoaded = true;
        return bestScore;
    });
}

function persistBestScore() {
    localStorage.setItem('fruitBlastBestScore', String(bestScore));
    cloudSync_markDirty();
}

function persistSoundSetting() {
    localStorage.setItem('fruitBlastSoundLocal', soundEnabled ? '1' : '0');
    cloudSync_markDirty();
    try { if (soundBtn) soundBtn.textContent = soundEnabled ? '🔊' : '🔇'; } catch (e) {}
    try { if (soundWaves) soundWaves.style.display = soundEnabled ? 'flex' : 'none'; } catch (e) {}
}

function loadUserData() {
    return new Promise(resolve => {
        try {
            const raw = localStorage.getItem(VK_KEYS.data);
            const localData = raw ? JSON.parse(raw) : null;
            vkStorageGet(VK_KEYS.data).then(val => {
                let vkData = null;
                if (val) try { vkData = JSON.parse(val); } catch (e) {}
                resolve(vkData && localData ? { boosters: { ...vkData.boosters, ...localData.boosters }, diamonds: Math.max(vkData.diamonds || 0, localData.diamonds || 0) } : (vkData || localData));
            }).catch(() => resolve(localData));
        } catch (e) { resolve(null); }
    });
}

function persistUserData() {
    const data = { boosters, diamonds };
    try { localStorage.setItem(VK_KEYS.data, JSON.stringify(data)); } catch (e) {}
    cloudSync_markDirty();
}

function flushAllSaves() {
    return cloudSync_flushNow();
}

function addDiamonds(n, source) {
    if (n > 0 && source === 'play' && window._pg) {
        n = window._pg.allowGameplayDiamonds(n);
        if (n <= 0) return;
    }
    diamonds += n;
    if (diamonds < 0) diamonds = 0;
    if (n > 0 && gameStarted && !gameOverShown) diamondsEarnedThisGame += n;
    updateDiamondUI();
    persistUserData();
}

function renderTasksModalIfOpen() {
    const m = document.getElementById('tasks-modal');
    if (!m || !m.classList.contains('active')) return;
    showTasksModal();
}

function renderProfileModalIfOpen() {
    const m = document.getElementById('profile-modal');
    if (!m || !m.classList.contains('active')) return;
    showProfileModal();
}

function renderStoreIfOpen() {
    if (!storeModal || !storeModal.classList.contains('active')) return;
    try {
        if (storeDiamondBalance) storeDiamondBalance.textContent = '💎 ' + diamonds;
        if (purchaseOwned && storeSelectedBooster != null) {
            purchaseOwned.textContent = 'У вас: ' + (boosters[storeSelectedBooster] || 0);
        }
    } catch (e) {}
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
        if (gained > 0) addDiamonds(gained, 'play');
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
        playSecondsThisGame += elapsed;
        const playedMinutes = Math.floor(playSecondsThisGame / 60);
        if (playedMinutes > playSecondsTracked) {
            trackTaskProgress('playtime', playedMinutes - playSecondsTracked);
            playSecondsTracked = playedMinutes;
        }
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

// ===== LIVES =====
function getLivesFromStorage() {
    try {
        const raw = localStorage.getItem('fruitBlastLives');
        if (raw) {
            const data = JSON.parse(raw);
            return {
                lives: Math.max(0, Math.min(MAX_LIVES, Number(data.lives) || MAX_LIVES)),
                lastLost: Number(data.lastLost) || 0
            };
        }
    } catch (e) {}
    return { lives: MAX_LIVES, lastLost: 0 };
}

function saveLivesToStorage() {
    try {
        localStorage.setItem('fruitBlastLives', JSON.stringify({
            lives: lives,
            lastLost: lastLifeLostAt
        }));
    } catch (e) {}
}

function updateLivesDisplay() {
    if (!livesDisplay) return;
    const hearts = '❤️'.repeat(lives) + '🖤'.repeat(MAX_LIVES - lives);
    livesDisplay.textContent = hearts;
    livesDisplay.classList.toggle('lives-low', lives === 1);
}

function startLifeRegenTimer() {
    if (lifeRegenTimerId) clearInterval(lifeRegenTimerId);
    lifeRegenTimerId = setInterval(() => {
        if (lives >= MAX_LIVES) return;
        const now = Date.now();
        const elapsed = now - lastLifeLostAt;
        const regenInterval = LIFE_REGEN_MS;
        if (elapsed >= regenInterval) {
            const oldLives = lives;
            lives = Math.min(MAX_LIVES, lives + 1);
            if (lives !== oldLives) {
                lastLifeLostAt = lives >= MAX_LIVES ? 0 : lastLifeLostAt + regenInterval;
                saveLivesToStorage();
                updateLivesDisplay();
                if (lives > 0 && lives < MAX_LIVES) {
                    showMessage('❤️ +1 жизнь восстановлена');
                }
            }
        }
    }, 10000);
}

function loseLife() {
    if (lives <= 0) return false;
    lives--;
    lastLifeLostAt = Date.now();
    saveLivesToStorage();
    updateLivesDisplay();
    startLifeRegenTimer();
    if (lives === 0) {
        return true; // game over
    }
    return false;
}

function endGameByTime() {
    stopGameTimer();
    stopLeaderboardRealtimeSync();
    gameOverShown = true;
    isPaused = false;

    const playTime = Math.max(0, Math.floor(playSecondsThisGame));
    recordGameEnd(score, playTime);
    setTaskProgress('score', score);
    const playedMinutes = Math.floor(playTime / 60);
    if (playedMinutes > playSecondsTracked) {
        trackTaskProgress('playtime', playedMinutes - playSecondsTracked);
        playSecondsTracked = playedMinutes;
    }

    clearSavedGame();
    finalScore.textContent = score;
    modalBestScore.textContent = bestScore;
    modalRecordBadge.style.display = newRecordThisGame ? 'block' : 'none';
    statDiamonds.textContent = '💎 ' + diamondsEarnedThisGame;
    statCombo.textContent = 'x' + bestComboThisGame;
    statMatches.textContent = matchesThisGame;
    statStars.textContent = starsCreatedThisGame;
    gameOverModal.classList.add('active');
    pauseModal.classList.remove('active');
    updateDailyTasksBadge();

    if (window._pg) {
        window._pg.track('game_end', { score: score, play_time: playTime });
        window._pg.evaluateAchievements();
    }

    if (score > 0) {
        setTimeout(() => submitLeaderboard(score), 400);
    }
}

// ===== AUTOSAVE (полное состояние игры) =====
const SAVE_KEY = 'fruitBlastActiveGame';

function saveGameState() {
    if (!gameStarted || gameOverShown) return;
    const state = {
        timeLeft: timeLeft,
        score: score,
        diamondsAwardedForScore: diamondsAwardedForScore,
        playSecondsThisGame: playSecondsThisGame,
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
    playSecondsThisGame = Math.max(0, Number(state.playSecondsThisGame) || 0);
    playSecondsTracked = Math.floor(playSecondsThisGame / 60);
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
    startLeaderboardRealtimeSync();
    updateScoreDisplay();
    updateBoostPanel();
    updateTimerDisplay();
    renderBoard();
    gameOverModal.classList.remove('active');
    resumeModal.classList.remove('active');
    pauseModal.classList.remove('active');
    leaderboardModal.classList.remove('active');
    startGameTimer();
    if (window._pg) window._pg.onGameStart({ resumed: true });
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

// ===== РЕАЛТАЙМ СИНХРОНИЗАЦИЯ ЛИДЕРБОРДА =====
let _lbSubmitThrottleUntil = 0;
let _lbSubmitPending = false;
let _lbLastSubmittedScore = -1;
let _lbSyncIntervalId = null;
let _lbSessionRetry = false;
const LB_SUBMIT_MIN_INTERVAL_MS = 15000;
const LB_SYNC_PERIODIC_MS = 20000;

function submitLeaderboard(forceScore, skipSession) {
    if (!currentUser.vk_user_id || !window._leaderboard) return Promise.resolve();

    const scoreToSend = typeof forceScore === 'number' ? forceScore : score;
    if (scoreToSend < 0) return Promise.resolve();

    const sessionData = window._pg ? window._pg.getSessionData() : {};
    if (window._pg && !sessionData.session_token && !_lbSessionRetry && !skipSession) {
        _lbSessionRetry = true;
        window._pg.startSession().then(ok => {
            _lbSessionRetry = false;
            if (ok) setTimeout(() => submitLeaderboard(forceScore), 2200);
            else submitLeaderboard(forceScore, true); // воркер без /session/start — шлём как раньше
        });
        return Promise.resolve({ queued: true });
    }

    const now = Date.now();
    if (now < _lbSubmitThrottleUntil && scoreToSend <= _lbLastSubmittedScore && !forceScore) {
        return Promise.resolve({ throttled: true });
    }

    if (_lbSubmitPending) {
        return Promise.resolve({ pending: true });
    }

    _lbSubmitPending = true;
    _lbSubmitThrottleUntil = now + LB_SUBMIT_MIN_INTERVAL_MS;

    return window._leaderboard.submitScoreAsync(scoreToSend, {
        vk_user_id: currentUser.vk_user_id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        photo_100: currentUser.photo_100,
        vk_sign_params: vkSignParamsStr || null,
        session_token: sessionData.session_token || null,
        play_time: sessionData.play_time || 0
    }).then(res => {
        if (res && res.success === false && res.error === 'session_too_early' && !_lbSessionRetry) {
            _lbSessionRetry = true;
            setTimeout(() => {
                _lbSessionRetry = false;
                submitLeaderboard(forceScore);
            }, 2300);
            return res;
        }
        if (res && res.success === false && /^session_/.test(res.error || '') && !_lbSessionRetry) {
            _lbSessionRetry = true;
            if (window._pg) window._pg.resetSession();
            const start = window._pg ? window._pg.startSession() : Promise.resolve(false);
            start.then(ok => {
                _lbSessionRetry = false;
                if (ok) setTimeout(() => submitLeaderboard(forceScore), 2300);
            });
            return res;
        }
        if (res) {
            if (res.updated) {
                console.log('[leaderboard] ✓ Новый рекорд сохранён:', res.new_score);
                _lbLastSubmittedScore = Math.max(_lbLastSubmittedScore, res.new_score || 0);
            } else if (res.score != null) {
                _lbLastSubmittedScore = Math.max(_lbLastSubmittedScore, res.score);
            } else if (res.success !== false) {
                _lbLastSubmittedScore = Math.max(_lbLastSubmittedScore, scoreToSend);
            }
        } else {
            _lbLastSubmittedScore = Math.max(_lbLastSubmittedScore, scoreToSend);
        }
        return res;
    }).catch(err => {
        console.warn('[leaderboard] Ошибка отправки:', err);
    }).finally(() => {
        _lbSubmitPending = false;
    });
}

function startLeaderboardRealtimeSync() {
    stopLeaderboardRealtimeSync();
    _lbSyncIntervalId = setInterval(() => {
        if (gameStarted && !gameOverShown && !isPaused && score > 0 && score > _lbLastSubmittedScore) {
            submitLeaderboard(score);
        }
    }, LB_SYNC_PERIODIC_MS);
}

function stopLeaderboardRealtimeSync() {
    if (_lbSyncIntervalId) {
        clearInterval(_lbSyncIntervalId);
        _lbSyncIntervalId = null;
    }
}

let _lbPeriod = 'all';

function syncLeaderboardTabs() {
    document.querySelectorAll('#lb-tabs .lb-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.period === _lbPeriod);
    });
    const weeklyEl = document.getElementById('weekly-status');
    if (weeklyEl) weeklyEl.style.display = _lbPeriod === 'week' ? '' : 'none';
    const content = leaderboardModal ? leaderboardModal.querySelector('.leaderboard-content') : null;
    if (content) content.classList.toggle('week-mode', _lbPeriod === 'week');
}

function renderLeaderboardPeriod() {
    if (!window._leaderboard) {
        leaderboardList.innerHTML = '<div class="leaderboard-empty">Модуль лидерборда не загружен.</div>';
        return;
    }
    window._leaderboard.openLeaderboardUIEnhanced(
        leaderboardList,
        currentUser.vk_user_id,
        currentUser.first_name + (currentUser.last_name ? ' ' + currentUser.last_name : ''),
        currentUser.photo_100,
        score,
        (users) => {
            _CS.lbCached = Array.isArray(users) ? users : [];
            _CS.lbCachedPeriod = _lbPeriod;
            _CS.lbCacheUntil = Date.now() + _CS.lbMs;
        },
        _lbPeriod
    );
    if (_lbPeriod === 'week' && window._pg) window._pg.loadWeeklyStatus(false);
}

function showLeaderboard() {
    _lbPeriod = 'all';
    syncLeaderboardTabs();
    leaderboardModal.classList.add('active');
    renderLeaderboardPeriod();
    if (window._pg) window._pg.track('leaderboard_open', { period: _lbPeriod });
    startLeaderboardRefresh();
}

function switchLeaderboardPeriod(period) {
    if (period !== 'week' && period !== 'all') return;
    if (_lbPeriod === period) return;
    _lbPeriod = period;
    syncLeaderboardTabs();
    renderLeaderboardPeriod();
    if (window._pg) window._pg.track('leaderboard_open', { period: _lbPeriod });
    startLeaderboardRefresh();
}

function startLeaderboardRefresh() {
    stopLeaderboardRefresh();
    if (!window._leaderboard) return;
    _CS.lbRefreshId = setInterval(async () => {
        if (!leaderboardModal.classList.contains('active')) {
            stopLeaderboardRefresh();
            return;
        }
        try {
            let users;
            const now = Date.now();
            const cacheValid = _CS.lbCached && _CS.lbCachedPeriod === _lbPeriod && now < _CS.lbCacheUntil;
            if (cacheValid) {
                users = _CS.lbCached;
            } else {
                users = await window._leaderboard.fetchLeaderboardAsync(_lbPeriod);
                if (!Array.isArray(users)) return;
                _CS.lbCached = users;
                _CS.lbCachedPeriod = _lbPeriod;
                _CS.lbCacheUntil = now + _CS.lbMs;
            }
            if (!Array.isArray(users)) return;
            const ok = window._leaderboard.diffUpdateLeaderboard(
                leaderboardList, users, currentUser.vk_user_id, score
            );
            if (!ok) {
                window._leaderboard.openLeaderboardUIEnhanced(
                    leaderboardList,
                    currentUser.vk_user_id,
                    currentUser.first_name + (currentUser.last_name ? ' ' + currentUser.last_name : ''),
                    currentUser.photo_100,
                    score,
                    (fresh) => {
                        _CS.lbCached = Array.isArray(fresh) ? fresh : [];
                        _CS.lbCachedPeriod = _lbPeriod;
                        _CS.lbCacheUntil = Date.now() + _CS.lbMs;
                    },
                    _lbPeriod
                );
            }
        } catch (e) {
            console.warn('[leaderboard] refresh error:', e);
        }
    }, _CS.lbMs);
}

function stopLeaderboardRefresh() {
    if (_CS.lbRefreshId) {
        clearInterval(_CS.lbRefreshId);
        _CS.lbRefreshId = null;
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

function spawnStarParticles(row, col) {
    const colors = ['#FFD700', '#FFFACD', '#FFA500', '#FFFF00', '#FFE66D'];
    for (let i = 0; i < 6; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        spawnParticles(row, col, c, 1, 40, [4, 9]);
    }
}

function playSoundStar() {
    [0, 60, 120, 180, 240, 300].forEach((d, i) => {
        tone(880 + i * 80, 0.12, 'sine', 0.4, d / 1000);
    });
    tone(1200, 0.2, 'triangle', 0.3, 0.3);
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

// ===== STATISTICS =====
let gameStats = {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    bestCombo: 0,
    totalCombos: 0,
    bombsCreated: 0,
    rainbowsCreated: 0,
    starsCreated: 0,
    totalMatches: 0,
    totalPlayTimeSec: 0
};

function loadStats() {
    try {
        const raw = localStorage.getItem('fruitBlastStats');
        if (raw) Object.assign(gameStats, JSON.parse(raw));
    } catch (e) {}
    vkStorageGet(VK_KEYS.stats).then(val => {
        if (val) try { Object.assign(gameStats, JSON.parse(val)); } catch (e) {}
    }).catch(() => {});
}

function saveStats() {
    try { localStorage.setItem('fruitBlastStats', JSON.stringify(gameStats)); } catch (e) {}
    cloudSync_markDirty();
}

function recordGameEnd(finalScore, playTimeSec) {
    gameStats.gamesPlayed++;
    gameStats.totalScore += finalScore;
    if (finalScore > gameStats.bestScore) gameStats.bestScore = finalScore;
    if (bestComboThisGame > gameStats.bestCombo) gameStats.bestCombo = bestComboThisGame;
    gameStats.totalCombos += totalCombosThisGame;
    gameStats.bombsCreated += bombsCreatedThisGame;
    gameStats.rainbowsCreated += rainbowsCreatedThisGame;
    gameStats.starsCreated = (Number(gameStats.starsCreated) || 0) + starsCreatedThisGame;
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
            <div class="profile-pg-actions">
                <button class="pg-profile-btn" type="button" data-pg-action="achievements">🏅 ДОСТИЖЕНИЯ <span id="profile-ach-count">0/0</span></button>
                <button class="pg-profile-btn" type="button" data-pg-action="notifications" id="profile-notifications-btn">🔔 ВКЛЮЧИТЬ НАПОМИНАНИЯ</button>
            </div>
            <button class="play-again-btn" id="profile-close-btn">ЗАКРЫТЬ</button>
        </div>
    `;
    document.body.appendChild(modal);
    if (window._pg) window._pg.refreshUI();
    document.getElementById('profile-close-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ===== DAILY TASKS =====
let dailyTasks = [];
let dailyTasksDate = '';
let tasksCountdownId = null;

function todayStamp() {
    return new Date().toISOString().slice(0, 10);
}

function seedFromString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function dailyTasksAreValid() {
    return dailyTasksDate === todayStamp() &&
        Array.isArray(dailyTasks) &&
        dailyTasks.length === 3 &&
        dailyTasks.every(t => {
            if (!t || !DAILY_TASK_TYPES.includes(t.type)) return false;
            if (typeof t.target !== 'number' || t.target <= 0) return false;
            const def = DAILY_TASK_DEFS.find(d => d.type === t.type);
            return !!def && t.name === buildTaskName(def, t.target);
        });
}

function ensureDailyTasksValid() {
    if (!dailyTasksAreValid()) {
        generateDailyTasks();
        return true;
    }
    return false;
}

function loadDailyTasks() {
    const today = todayStamp();
    dailyTasksDate = today;

    const loadFromData = data => {
        if (!data || data.version !== DAILY_TASK_VERSION) return false;
        if (data.date !== today || !Array.isArray(data.tasks)) return false;
        if (data.tasks.length !== 3) return false;
        if (!data.tasks.every(t => t && DAILY_TASK_TYPES.includes(t.type))) return false;
        dailyTasks = data.tasks;
        return true;
    };

    let loadedLocal = false;
    try {
        const raw = localStorage.getItem('fruitBlastDailyTasks');
        if (raw && loadFromData(JSON.parse(raw))) loadedLocal = true;
    } catch (e) {}

    vkStorageGet(VK_KEYS.dailyTasks).then(v => {
        let loadedVk = false;
        if (v && !loadedLocal) {
            try { loadedVk = loadFromData(JSON.parse(v)); } catch (e) {}
        }
        if (!loadedLocal && !loadedVk) generateDailyTasks();
        else updateDailyTasksBadge();
    }).catch(() => {
        if (!loadedLocal) generateDailyTasks();
    });

    if (loadedLocal) updateDailyTasksBadge();
}

function generateDailyTasks() {
    const today = todayStamp();
    dailyTasksDate = today;
    const rand = mulberry32(seedFromString(today + ':fruit-blast'));
    const defs = [...DAILY_TASK_DEFS];

    for (let i = defs.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [defs[i], defs[j]] = [defs[j], defs[i]];
    }

    dailyTasks = defs.slice(0, 3).map((def, i) => {
        const target = def.targets[Math.floor(rand() * def.targets.length)];
        return {
            id: i,
            type: def.type,
            template: def.template,
            target,
            progress: 0,
            reward: def.reward,
            completed: false,
            claimed: false,
            notified: false,
            name: buildTaskName(def, target)
        };
    });
    saveDailyTasks();
}

function saveDailyTasks() {
    const payload = JSON.stringify({
        version: DAILY_TASK_VERSION,
        date: dailyTasksDate,
        tasks: dailyTasks
    });
    try { localStorage.setItem('fruitBlastDailyTasks', payload); } catch (e) {}
    cloudSync_markDirty();
    updateDailyTasksBadge();
}

function notifyTaskCompleted(task) {
    if (task.notified) return;
    task.notified = true;
    showMessage('✅ Задание выполнено: ' + task.name);
}

function applyTaskProgress(task, nextValue) {
    if (task.claimed) return false;
    const clamped = Math.max(0, Math.min(nextValue, task.target));
    if (clamped === task.progress) return false;
    task.progress = clamped;
    if (task.progress >= task.target && !task.completed) {
        task.completed = true;
        task.completedAt = Date.now();
        notifyTaskCompleted(task);
    }
    return true;
}

function trackTaskProgress(type, amount) {
    if (!Array.isArray(dailyTasks) || dailyTasks.length === 0) return;
    if (!amount || amount <= 0) return;
    let changed = false;
    dailyTasks.forEach(task => {
        if (task.type !== type) return;
        if (applyTaskProgress(task, (Number(task.progress) || 0) + amount)) changed = true;
    });
    if (changed) saveDailyTasks();
}

function setTaskProgress(type, value) {
    if (!Array.isArray(dailyTasks) || dailyTasks.length === 0) return;
    let changed = false;
    dailyTasks.forEach(task => {
        if (task.type !== type) return;
        if (applyTaskProgress(task, Math.max(Number(task.progress) || 0, value))) changed = true;
    });
    if (changed) saveDailyTasks();
}

function claimTaskReward(taskId) {
    const task = dailyTasks.find(t => t.id === taskId);
    if (!task || !task.completed || task.claimed) return;
    task.claimed = true;
    task.claimedAt = Date.now();
    addDiamonds(task.reward);
    saveDailyTasks();
    showMessage('+' + task.reward + ' 💎 за задание!');
    showTasksModal();
}

function claimAllTaskRewards() {
    const ready = dailyTasks.filter(t => t.completed && !t.claimed);
    if (ready.length === 0) return;
    const total = ready.reduce((sum, t) => sum + (Number(t.reward) || 0), 0);
    ready.forEach(t => { t.claimed = true; t.claimedAt = Date.now(); });
    addDiamonds(total);
    saveDailyTasks();
    showMessage('+' + total + ' 💎 за все задания!');
    showTasksModal();
}

function updateDailyTasksBadge() {
    if (!Array.isArray(dailyTasks)) return;
    const unclaimed = dailyTasks.filter(t => t.completed && !t.claimed).length;
    if (dailyTasksCount) {
        dailyTasksCount.textContent = unclaimed;
        dailyTasksCount.style.display = unclaimed > 0 ? 'flex' : 'none';
    }
}

function getTasksResetText() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(24, 0, 0, 0);
    const ms = Math.max(0, end.getTime() - now.getTime());
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return 'Обновление через ' + h + ' ч ' + m + ' мин';
}

function showTasksModal() {
    ensureDailyTasksValid();

    const existing = document.getElementById('tasks-modal');
    if (existing) existing.remove();
    if (tasksCountdownId) { clearInterval(tasksCountdownId); tasksCountdownId = null; }

    const modal = document.createElement('div');
    modal.className = 'tasks-modal active';
    modal.id = 'tasks-modal';

    const readyCount = dailyTasks.filter(t => t.completed && !t.claimed).length;
    const readyDiamonds = dailyTasks.filter(t => t.completed && !t.claimed)
        .reduce((sum, t) => sum + (Number(t.reward) || 0), 0);

    let tasksHtml = dailyTasks.map(task => {
        const pct = Math.min(100, Math.round(((Number(task.progress) || 0) / task.target) * 100));
        const icon = iconHtml(DAILY_TASK_ICONS[task.type] || 'bonus');
        let actionHtml = '';
        if (task.claimed) {
            actionHtml = '<div class="task-claimed">✅ Получено</div>';
        } else if (task.completed) {
            actionHtml = `<button class="task-claim-btn" data-task-id="${task.id}">💎 ЗАБРАТЬ ${task.reward}</button>`;
        }
        return `
            <div class="task-card ${task.completed && !task.claimed ? 'task-ready' : ''} ${task.claimed ? 'task-done' : ''}" data-type="${task.type}">
                <div class="task-header">
                    <span class="task-icon">${icon}</span>
                    <span class="task-name">${task.name}</span>
                    <span class="task-reward">💎 ${task.reward}</span>
                </div>
                <div class="task-bar"><div class="task-bar-fill" style="width:${pct}%"></div></div>
                <div class="task-card-actions">
                    <span class="task-progress-text">${task.progress} / ${task.target}</span>
                    ${actionHtml}
                </div>
            </div>
        `;
    }).join('');

    modal.innerHTML = `
        <div class="modal-content tasks-content">
            <h2 class="modal-title">ЕЖЕДНЕВНЫЕ ЗАДАНИЯ</h2>
            <div class="tasks-subtitle">
                <span>Выполняй и получай алмазы</span>
                <span class="tasks-reset" id="tasks-reset-text">${getTasksResetText()}</span>
            </div>
            <div class="tasks-list">${tasksHtml}</div>
            ${readyCount > 0 ? `<button class="tasks-claim-all" id="tasks-claim-all">ЗАБРАТЬ ВСЁ · 💎 ${readyDiamonds}</button>` : ''}
            <button class="play-again-btn secondary" id="tasks-close-btn">ЗАКРЫТЬ</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('tasks-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.remove());

    const claimAllBtn = document.getElementById('tasks-claim-all');
    if (claimAllBtn) claimAllBtn.addEventListener('click', claimAllTaskRewards);

    modal.querySelectorAll('.task-claim-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            claimTaskReward(parseInt(btn.dataset.taskId, 10));
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    tasksCountdownId = setInterval(() => {
        const el = document.getElementById('tasks-reset-text');
        if (!el || !document.getElementById('tasks-modal')) {
            if (tasksCountdownId) { clearInterval(tasksCountdownId); tasksCountdownId = null; }
            return;
        }
        el.textContent = getTasksResetText();
    }, 60000);
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
    starsCreatedThisGame = 0;
    comboHitsThisGame = 0;
    playSecondsThisGame = 0;
    playSecondsTracked = 0;
    newRecordThisGame = false;
    selectedCell = null;
    isProcessing = false;
    isPaused = false;
    gameOverShown = false;
    activeBooster = null;
    swapBoostPick = null;
    diamondsAwardedForScore = 0;
    diamondsEarnedThisGame = 0;
    timeLeft = GAME_DURATION;
    clearSavedGame();

    if (autoSaveIntervalId) clearInterval(autoSaveIntervalId);
    autoSaveIntervalId = setInterval(() => {
        if (gameStarted && !gameOverShown && !isPaused) saveGameState();
    }, 5000);

    startLeaderboardRealtimeSync();

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

    resetHintTimer();

    if (window._pg) window._pg.onGameStart({ resumed: false });
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
                        + '<span class="bomb-badge">' + iconHtml('bomb') + '</span>';
                    cell.classList.add('bomb');
                } else if (fruitData.bonus === 'rainbow') {
                    fruitDiv.innerHTML = bonusSvgHtml('rainbow', id);
                    cell.classList.add('rainbow');
                } else if (fruitData.bonus === 'star') {
                    fruitDiv.innerHTML = bonusSvgHtml('star', id);
                    cell.classList.add('star');
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
    resetHintTimer();

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

// ===== BONUS / EXPLOSION HELPERS =====
function cellKey(row, col) { return row + ',' + col; }
function keyToPos(key) { const p = key.split(','); return { row: parseInt(p[0], 10), col: parseInt(p[1], 10) }; }
function isInsideBoard(row, col) { return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE; }

function elementCenter(row, col) {
    const cell = matrixCells[row] && matrixCells[row][col];
    if (!cell) return null;
    const rect = cell.getBoundingClientRect();
    const boardRect = gameBoard.getBoundingClientRect();
    return { x: rect.left - boardRect.left + rect.width / 2, y: rect.top - boardRect.top + rect.height / 2 };
}

function spawnEffectRing(row, col, kind) {
    const p = elementCenter(row, col);
    if (!p) return;
    const ring = document.createElement('div');
    ring.className = 'effect-ring ring-' + kind;
    ring.style.left = p.x + 'px';
    ring.style.top = p.y + 'px';
    gameBoard.appendChild(ring);
    setTimeout(() => ring.remove(), 620);
}

function spawnEffectBeam(row, col, direction) {
    const p = elementCenter(row, col);
    if (!p) return;
    const boardRect = gameBoard.getBoundingClientRect();
    const beam = document.createElement('div');
    beam.className = 'effect-beam ' + (direction === 'row' ? 'beam-row' : 'beam-col');
    if (direction === 'row') {
        beam.style.left = '4px';
        beam.style.width = Math.max(0, boardRect.width - 8) + 'px';
        beam.style.top = (p.y - 4) + 'px';
    } else {
        beam.style.top = '4px';
        beam.style.height = Math.max(0, boardRect.height - 8) + 'px';
        beam.style.left = (p.x - 4) + 'px';
    }
    gameBoard.appendChild(beam);
    setTimeout(() => beam.remove(), 520);
}

function shakeBoard(kind) {
    const cls = kind === 'hard' ? 'shake-hard' : 'shake-soft';
    gameBoard.classList.remove('shake-soft', 'shake-hard');
    void gameBoard.offsetWidth;
    gameBoard.classList.add(cls);
    setTimeout(() => gameBoard.classList.remove(cls), 520);
}

function mostCommonFruitType() {
    const counts = {};
    let bestType = FRUIT_TYPES[0];
    let bestCount = -1;
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const f = board[r][c];
            if (!f || f.bonus || !FRUIT_COLORS[f.type]) continue;
            counts[f.type] = (counts[f.type] || 0) + 1;
            if (counts[f.type] > bestCount) {
                bestCount = counts[f.type];
                bestType = f.type;
            }
        }
    }
    return bestType;
}

/**
 * Собирает множество клеток к очистке, рекурсивно активируя все бонусы,
 * которые в это множество попали. Возвращает { cells:Set<"row,col">, scoreGain, activatedList }.
 */
function collectClearCascade(seedCells, opts = {}) {
    const protect = opts.protect || null;
    const rainbowTargets = opts.rainbowTargets || null;
    const cells = new Set();
    const queue = [];
    const activated = new Set();
    const activatedList = [];
    let scoreGain = 0;

    const addCell = (row, col) => {
        if (!isInsideBoard(row, col)) return;
        if (!board[row][col]) return;
        const key = cellKey(row, col);
        if (protect && protect.has(key)) return;
        if (cells.has(key)) return;
        cells.add(key);
        queue.push({ row, col });
    };

    (seedCells || []).forEach(pos => {
        if (!pos) return;
        addCell(pos.row, pos.col);
    });

    while (queue.length > 0) {
        const { row, col } = queue.shift();
        const fruit = board[row] && board[row][col];
        if (!fruit || !fruit.bonus) continue;
        const key = cellKey(row, col);
        if (activated.has(key)) continue;
        activated.add(key);
        activatedList.push({ row, col, bonus: fruit.bonus });

        if (fruit.bonus === 'bomb') {
            scoreGain += 30;
            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) addCell(r, c);
            }
            spawnBombParticles(row, col);
            spawnEffectRing(row, col, 'bomb');
            shakeBoard('soft');
            if (soundEnabled) playSoundBomb();
        } else if (fruit.bonus === 'star') {
            scoreGain += 80;
            for (let c = 0; c < BOARD_SIZE; c++) addCell(row, c);
            for (let r = 0; r < BOARD_SIZE; r++) addCell(r, col);
            spawnEffectBeam(row, col, 'row');
            spawnEffectBeam(row, col, 'col');
            spawnEffectRing(row, col, 'star');
            spawnStarParticles(row, col);
            for (let c = 0; c < BOARD_SIZE; c += 2) spawnStarParticles(row, c);
            for (let r = 0; r < BOARD_SIZE; r += 2) spawnStarParticles(r, col);
            shakeBoard('hard');
            if (soundEnabled) playSoundStar();
        } else if (fruit.bonus === 'rainbow') {
            scoreGain += 50;
            const target = (rainbowTargets && rainbowTargets.get(key)) || mostCommonFruitType();
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    const f = board[r][c];
                    if (f && f.type === target && f.bonus !== 'rainbow') addCell(r, c);
                }
            }
            spawnRainbowParticles(row, col);
            spawnEffectRing(row, col, 'rainbow');
            shakeBoard('soft');
            if (soundEnabled) playSoundRainbow();
        }
    }

    scoreGain += cells.size * 5;
    return { cells, scoreGain, activatedList };
}

async function detonateCells(seedCells, opts = {}) {
    const result = collectClearCascade(seedCells, opts);
    if (result.cells.size === 0) return { cleared: 0, activated: [] };

    score += result.scoreGain + (opts.extraScore || 0);
    updateScoreDisplay();

    const keys = [...result.cells];
    keys.forEach(key => {
        const { row, col } = keyToPos(key);
        const el = matrixCells[row] && matrixCells[row][col];
        if (el && el.querySelector('.fruit')) el.classList.add('matched');
    });

    const sampleStep = keys.length > 24 ? 3 : 1;
    keys.forEach((key, i) => {
        if (i % sampleStep !== 0) return;
        const { row, col } = keyToPos(key);
        const f = board[row][col];
        if (f && f.type) spawnMatchParticles(row, col, f.type);
    });

    await sleep(190);
    keys.forEach(key => {
        const { row, col } = keyToPos(key);
        board[row][col] = null;
    });
    await dropFruits();
    await fillEmptySpaces();
    renderBoard();

    if (findMatches().length > 0) {
        comboCount = 0;
        await processMatches();
    }
    return { cleared: result.cells.size, activated: result.activatedList };
}

function buildSpecialPairDetonation(a, b) {
    const fa = board[a.row] && board[a.row][a.col];
    const fb = board[b.row] && board[b.row][b.col];
    if (!fa || !fb) return null;

    const ba = fa.bonus;
    const bb = fb.bonus;
    if (ba !== 'rainbow' && bb !== 'rainbow' && (!ba || !bb)) return null;

    const seeds = [];
    const rainbowTargets = new Map();
    const push = (row, col) => { if (isInsideBoard(row, col)) seeds.push({ row, col }); };
    const pushArea = (row, col, radius) => {
        for (let r = row - radius; r <= row + radius; r++) {
            for (let c = col - radius; c <= col + radius; c++) push(r, c);
        }
    };
    const pushType = type => {
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (board[r][c] && board[r][c].type === type) push(r, c);
            }
        }
    };
    const pushCross = (row, col) => {
        for (let c = 0; c < BOARD_SIZE; c++) push(row, c);
        for (let r = 0; r < BOARD_SIZE; r++) push(r, col);
    };

    let extraScore = 0;
    let message = '';

    if (ba === 'rainbow' && bb === 'rainbow') {
        for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) push(r, c);
        extraScore = 300;
        message = 'МЕГА-РАДУГА! 🌈';
    } else if (ba === 'rainbow' || bb === 'rainbow') {
        const rainbowPos = ba === 'rainbow' ? a : b;
        const otherPos = ba === 'rainbow' ? b : a;
        const partner = board[otherPos.row][otherPos.col];
        push(rainbowPos.row, rainbowPos.col);
        push(otherPos.row, otherPos.col);
        if (partner.bonus === 'bomb') {
            pushArea(otherPos.row, otherPos.col, 2);
            pushType(partner.type);
            extraScore = 120;
            message = 'Радуга + Бомба! 💥';
        } else if (partner.bonus === 'star') {
            pushCross(otherPos.row, otherPos.col);
            pushType(partner.type);
            extraScore = 150;
            message = 'Радуга + Звезда! ⭐';
        } else {
            pushType(partner.type);
            rainbowTargets.set(cellKey(rainbowPos.row, rainbowPos.col), partner.type);
            extraScore = 80;
            message = 'Радуга! 🌈';
        }
    } else if (ba === 'bomb' && bb === 'bomb') {
        pushArea(a.row, a.col, 2);
        pushArea(b.row, b.col, 2);
        extraScore = 100;
        message = 'Двойной взрыв! 💥';
    } else if (ba === 'star' && bb === 'star') {
        pushCross(a.row, a.col);
        pushCross(b.row, b.col);
        extraScore = 200;
        message = 'Звёздный крест! ✨';
    } else if ((ba === 'bomb' && bb === 'star') || (ba === 'star' && bb === 'bomb')) {
        const bombPos = ba === 'bomb' ? a : b;
        const starPos = ba === 'star' ? a : b;
        pushArea(bombPos.row, bombPos.col, 1);
        pushCross(starPos.row, starPos.col);
        extraScore = 150;
        message = 'Бомба + Звезда! 💥';
    } else {
        return null;
    }

    return { seeds, rainbowTargets, extraScore, message };
}

// ===== SWAP =====
async function swapFruits(cell1, cell2) {
    if (isProcessing) return;
    isProcessing = true;
    clearSelectedCell();

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

    const special = buildSpecialPairDetonation(cell1, cell2);
    if (special) {
        playSoundBomb();
        showMessage(special.message);
        await detonateCells(special.seeds, {
            rainbowTargets: special.rainbowTargets,
            extraScore: special.extraScore
        });
        onPlayerMatch();
        isProcessing = false;
        resetHintTimer();
        if (!hasValidMoves() && !gameOverShown && !isPaused) await shuffleBoard();
        return;
    }

    const matches = findMatches();
    if (matches.length > 0) {
        comboCount = 0;
        await processMatches();
        onPlayerMatch();
    } else {
        // Бонус (бомба/звезда), которым ударили по обычному фрукту, срабатывает.
        const bonusCells = [cell1, cell2].filter(pos => {
            const f = board[pos.row][pos.col];
            return f && (f.bonus === 'bomb' || f.bonus === 'star');
        });
        if (bonusCells.length > 0) {
            await detonateCells(bonusCells);
            onPlayerMatch();
        } else {
            playSoundInvalid();
            flashInvalidCells(cell1, cell2);
            const temp2 = board[cell1.row][cell1.col];
            board[cell1.row][cell1.col] = board[cell2.row][cell2.col];
            board[cell2.row][cell2.col] = temp2;
            renderBoard();
        }
    }

    isProcessing = false;
    resetHintTimer();

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

// Find L/T/T-shapes: when horizontal and vertical matches share a cell and total >= 5 fruits
function findLTForms(allMatches) {
    const ltForms = [];
    if (allMatches.length < 2) return ltForms;

    for (let i = 0; i < allMatches.length; i++) {
        for (let j = i + 1; j < allMatches.length; j++) {
            const m1 = allMatches[i];
            const m2 = allMatches[j];

            if (m1.direction === m2.direction) continue;

            const m1Keys = new Set(m1.cells.map(c => c.row + ',' + c.col));
            const intersection = m2.cells.filter(c => m1Keys.has(c.row + ',' + c.col));

            if (intersection.length === 0) continue;

            const totalCells = m1.cells.length + m2.cells.length - intersection.length;
            if (totalCells < 5) continue;

            const ltCells = [];
            const seen = new Set();
            m1.cells.forEach(c => { const k = c.row + ',' + c.col; if (!seen.has(k)) { seen.add(k); ltCells.push(c); } });
            m2.cells.forEach(c => { const k = c.row + ',' + c.col; if (!seen.has(k)) { seen.add(k); ltCells.push(c); } });

            ltForms.push({
                cells: ltCells,
                center: intersection[0],
                totalLength: totalCells,
                indices: [i, j]
            });
        }
    }
    return ltForms;
}

// ===== PROCESS MATCHES =====
async function processMatches() {
    let matches = findMatches();
    let guard = 0;

    while (matches.length > 0 && guard++ < 60) {
        comboCount++;
        matchesThisGame += matches.length;
        trackTaskProgress('matches', matches.length);

        const ltForms = findLTForms(matches);
        const ltMatchIndices = new Set();
        const starForms = new Map();

        ltForms.forEach(lt => {
            lt.indices.forEach(i => ltMatchIndices.add(i));
            const key = cellKey(lt.center.row, lt.center.col);
            if (!starForms.has(key)) starForms.set(key, lt);
        });

        const clearKeys = new Set();
        const creationByKey = new Map();
        let matchScore = 0;
        let createdCount = 0;

        const addMatchCells = cells => {
            cells.forEach(c => clearKeys.add(cellKey(c.row, c.col)));
        };

        // 1) Фигуры L/T дают звезду в точке пересечения.
        starForms.forEach((lt, key) => {
            const centerFruit = board[lt.center.row] && board[lt.center.row][lt.center.col];
            if (centerFruit && !centerFruit.bonus) {
                creationByKey.set(key, 'star');
            }
            addMatchCells(lt.cells);
            matchScore += 150;
        });

        // 2) Прямые линии: 4 → бомба, 5+ → радуга.
        for (let i = 0; i < matches.length; i++) {
            if (ltMatchIndices.has(i)) continue;

            const match = matches[i];
            const len = match.cells.length;
            matchScore += len >= 5 ? 120 : len === 4 ? 60 : 15;
            addMatchCells(match.cells);

            const wantBonus = len >= 5 ? 'rainbow' : len === 4 ? 'bomb' : null;
            if (!wantBonus) continue;

            const center = match.cells[Math.floor(len / 2)];
            const ordered = [...match.cells].sort((a, b) => {
                const da = Math.abs(a.row - center.row) + Math.abs(a.col - center.col);
                const db = Math.abs(b.row - center.row) + Math.abs(b.col - center.col);
                return da - db;
            });
            const freeCell = ordered.find(c => {
                const f = board[c.row][c.col];
                return f && !f.bonus && !creationByKey.has(cellKey(c.row, c.col));
            });
            if (freeCell) {
                creationByKey.set(cellKey(freeCell.row, freeCell.col), wantBonus);
            }
        }

        creationByKey.forEach((bonus, key) => clearKeys.delete(key));

        // Сначала создаём бонусы, чтобы они не были стёрты очисткой.
        creationByKey.forEach((bonus, key) => {
            const { row, col } = keyToPos(key);
            const base = board[row][col];
            if (!base) return;
            if (bonus === 'bomb') {
                board[row][col] = { type: base.type, bonus: 'bomb' };
                bombsCreatedThisGame++;
                addDiamonds(1, 'play');
                createdCount++;
            } else if (bonus === 'rainbow') {
                board[row][col] = { type: 'rainbow', bonus: 'rainbow' };
                rainbowsCreatedThisGame++;
                addDiamonds(2, 'play');
                createdCount++;
            } else if (bonus === 'star') {
                board[row][col] = { type: base.type, bonus: 'star' };
                starsCreatedThisGame++;
                addDiamonds(3, 'play');
                createdCount++;
            }
        });

        if (createdCount > 0) trackTaskProgress('bonus', createdCount);

        const seedCells = [...clearKeys].map(keyToPos);
        const cascade = collectClearCascade(seedCells, {
            protect: new Set(creationByKey.keys())
        });

        const multiplier = comboCount >= 5 ? 5 : comboCount >= 3 ? 3 : comboCount >= 2 ? 2 : 1;
        score += matchScore * multiplier + cascade.scoreGain;
        updateScoreDisplay();

        cascade.cells.forEach((key, idx) => {
            if (cascade.cells.size > 22 && idx % 2 !== 0) return;
            const { row, col } = keyToPos(key);
            const f = board[row][col];
            if (f && f.type) spawnMatchParticles(row, col, f.type);
        });

        cascade.cells.forEach(key => {
            const { row, col } = keyToPos(key);
            const el = matrixCells[row] && matrixCells[row][col];
            if (el && el.querySelector('.fruit')) el.classList.add('matched');
        });

        if (createdCount > 0) {
            playSoundMatch();
            const types = [...creationByKey.values()];
            if (types.includes('star')) showMessage('⭐ Звезда! Сносит ряд и колонку');
            else if (types.includes('rainbow')) showMessage('🌈 Радуга! Свапни с любым фруктом');
            else showMessage('💣 Бомба! Совмести с фруктом, чтобы взорвать');
        } else if (multiplier > 1) {
            showComboIndicator(multiplier);
            playSoundCombo(multiplier);
        } else {
            playSoundMatch();
        }

        await sleep(190);

        cascade.cells.forEach(key => {
            const { row, col } = keyToPos(key);
            board[row][col] = null;
        });

        await dropFruits();
        await fillEmptySpaces();
        renderBoard();
        await sleep(70);

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
                cell.querySelector('.fruit').style.transition = 'transform 0.22s ease-out';
                cell.querySelector('.fruit').style.transform = `translateY(-${distance}%)`;
            }
        }
        await sleep(15);
        for (const drop of drops) {
            const cell = matrixCells[drop.toRow][drop.col];
            if (cell && cell.querySelector('.fruit')) {
                cell.querySelector('.fruit').style.transform = 'translateY(0)';
            }
        }
        await sleep(200);
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
                cell.querySelector('.fruit').style.transition = 'transform 0.3s ease-out';
                cell.querySelector('.fruit').style.transform = 'translateY(-300%)';
            }
        }
        await sleep(15);
        for (const fruit of newFruits) {
            const cell = matrixCells[fruit.row][fruit.col];
            if (cell && cell.querySelector('.fruit')) {
                cell.querySelector('.fruit').style.transform = 'translateY(0)';
            }
        }
        await sleep(250);
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
// ===== HINT SYSTEM =====
function findValidMove() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (col < BOARD_SIZE - 1) {
                swapTemp(row, col, row, col + 1);
                if (findMatches().length > 0) { swapTemp(row, col, row, col + 1); return [{row, col}, {row, col: col + 1}]; }
                swapTemp(row, col, row, col + 1);
            }
            if (row < BOARD_SIZE - 1) {
                swapTemp(row, col, row + 1, col);
                if (findMatches().length > 0) { swapTemp(row, col, row + 1, col); return [{row, col}, {row: row + 1, col}]; }
                swapTemp(row, col, row + 1, col);
            }
        }
    }
    return null;
}

function showHint() {
    hideHint();
    const move = findValidMove();
    if (!move) return;
    move.forEach(cell => {
        const el = document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
        if (el) el.classList.add('hint');
    });
    hintCells = move;
}

function hideHint() {
    if (hintCells) {
        hintCells.forEach(cell => {
            const el = document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            if (el) el.classList.remove('hint');
        });
        hintCells = null;
    }
}

function resetHintTimer() {
    hideHint();
    if (hintTimeoutId) clearTimeout(hintTimeoutId);
    hintTimeoutId = setTimeout(showHint, HINT_DELAY_MS);
}

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

    setTaskProgress('score', score);

    if (score > bestScore && bestScoreLoaded) {
        const prevBest = bestScore;
        bestScore = score;
        newRecordThisGame = true;
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
        hideHint();
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
    if (window._pg) window._pg.onBoosterUsed();
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

        const special = buildSpecialPairDetonation(a, b);
        if (special) {
            playSoundBomb();
            showMessage(special.message);
            await detonateCells(special.seeds, {
                rainbowTargets: special.rainbowTargets,
                extraScore: special.extraScore
            });
            onPlayerMatch();
        } else if (findMatches().length > 0) {
            comboCount = 0;
            await processMatches();
            onPlayerMatch();
        }

        isProcessing = false;
        resetHintTimer();
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
        const boosterId = activeBooster;
        const bonusScore = boosterId === 'hammer' ? 10 : 45;
        consumeBooster(boosterId);
        cancelActiveBooster();

        isProcessing = true;
        playSoundBomb();
        if (boosterId === 'rocket') {
            spawnEffectBeam(row, col, 'row');
            spawnEffectBeam(row, col, 'col');
            shakeBoard('hard');
        }
        await detonateCells(cells, { extraScore: bonusScore });
        isProcessing = false;
        resetHintTimer();
        if (!hasValidMoves() && !gameOverShown && !isPaused) await shuffleBoard();
    }
}

async function clearCellsAndCascade(cells) {
    await detonateCells(cells);
}

// ===== STORE =====
function openStore() {
    cancelActiveBooster();
    storeSelectedBooster = null;
    hidePurchaseBar();
    updateBoostPanel();
    updateDiamondUI();
    if (window._pg) window._pg.refreshUI();
    storeModal.classList.add('active');
    if (window._pg) window._pg.track('store_open');
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
        if (!vkAvailable()) { resolve(false); return; }
        vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });
}

async function purchaseBoosterByAd(id) {
    if (!storeSelectedBooster && !id) return;
    const bId = id || storeSelectedBooster;
    const ok = await watchRewardedAd();
    if (window._pg) window._pg.track('ad_watch', { booster: bId, success: ok });
    if (ok) {
        boosters[bId]++;
        persistUserData();
        updateBoostPanel();
        if (window._pg) window._pg.onAdWatched(true);
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

// Покупка пакета бустеров за голоса VK (VKWebAppShowOrderBox).
// Товары описаны в Worker (PAYMENT_ITEMS), оплата приходит в /vk-pay.
function buyBoosterPack(id) {
    const bId = id || storeSelectedBooster;
    const pack = BOOSTER_PACKS[bId];
    if (!pack) return;
    if (window._pg) window._pg.purchaseItem(pack.id);
}

// Покупка пакета алмазов за голоса VK.
function buyDiamondPack(packId) {
    const pack = DIAMOND_PACKS[packId];
    if (!pack) return;
    if (window._pg) window._pg.purchaseItem(packId);
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
    bombHtml += '<div class="h-cell hit"><span class="bomb-badge">' + iconHtml('bomb') + '</span>' + fruitSvgHtml('apple', g()) + '</div>';
    bombEl.innerHTML = bombHtml;

    // Пример: фигура T из лимонов -> звезда
    const starEl = document.getElementById('help-example-star');
    if (starEl) {
        const shape = [
            ['lemon', 'lemon', 'lemon'],
            [null, 'lemon', null],
            [null, 'lemon', null]
        ];
        let grid = '<div style="display:grid;grid-template-columns:repeat(3,34px);gap:3px;">';
        shape.forEach(row => {
            row.forEach(type => {
                grid += type
                    ? '<div class="h-cell hit" style="width:34px;height:34px;flex:none;">' + fruitSvgHtml(type, g()) + '</div>'
                    : '<div style="width:34px;height:34px;"></div>';
            });
        });
        grid += '</div>';
        grid += '<div class="h-arrow">→</div>';
        grid += '<div class="h-cell hit" style="width:44px;height:44px;flex:none;">' + bonusSvgHtml('star', g()) + '</div>';
        starEl.innerHTML = grid;
    }

    // Пример: 5 клубник в ряд -> радуга
    const rainbowEl = document.getElementById('help-example-rainbow');
    let rainbowHtml = '';
    for (let i = 0; i < 5; i++) rainbowHtml += '<div class="h-cell hit">' + fruitSvgHtml('strawberry', g()) + '</div>';
    rainbowHtml += '<div class="h-arrow">→</div>';
    rainbowHtml += '<div class="h-cell hit">' + bonusSvgHtml('rainbow', g()) + '</div>';
    rainbowEl.innerHTML = rainbowHtml;
}

// ===== TUTORIAL (v2) =====
const TUTORIAL_KEY = 'fruitBlastTutorialDoneV2';
let tutorialActive = false;
let tutorialStepIndex = 0;
let tutorialRoot = null;
let tutorialResumeTimer = false;
let tutorialResizeTimer = null;
let tutorialSteps = [];

const TUTORIAL_HAND_SVG = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M26 7a6 6 0 0 1 6 6v16h2V15a5 5 0 0 1 10 0v14h2v-7a5 5 0 0 1 10 0v19c0 10-7.5 18-17 18h-5c-6.5 0-12-3.5-15-9l-6.5-12a5 5 0 0 1 8-6L26 37V13a6 6 0 0 1 0-6Z" fill="#fffdf7" stroke="#3a2158" stroke-width="3" stroke-linejoin="round"/><path d="M32 29V13a3 3 0 0 1 6 0v16" fill="none" stroke="#d9c9f2" stroke-width="1.6"/><circle cx="24" cy="52" r="10" fill="none" stroke="#ffc24b" stroke-width="2.6" opacity=".9"/></svg>`;

function buildTutorialSteps() {
    return [
        {
            badge: 'ЦЕЛЬ ИГРЫ',
            title: 'Добро пожаловать в Fruit Blast!',
            text: 'За 20 минут собери как можно больше очков. Меняй соседние фрукты местами, чтобы собрать 3 и больше одинаковых в ряд.',
            target: '.game-board',
            placement: 'bottom'
        },
        {
            badge: 'СВАЙП',
            title: 'Меняй фрукты местами',
            text: 'Проведи пальцем по фрукту в сторону соседнего или нажми на два соседних фрукта по очереди. Совпадение исчезнет, а сверху упадут новые.',
            target: '.game-board',
            placement: 'bottom',
            hand: true
        },
        {
            badge: 'БОНУСЫ',
            title: 'Бомба · Звезда · Радуга',
            text: 'Собери 4 в ряд — получишь бомбу, фигуру L/T — звезду, 5 в ряд — радугу. Свапни бонус с фруктом, чтобы активировать его. Взрывы запускают цепную реакцию!',
            target: '.game-board',
            placement: 'center',
            bonusRow: true
        },
        {
            badge: 'КОМБО',
            title: 'Держи серию',
            text: 'Собирай совпадения подряд: каждое следующее в течение 5 секунд увеличивает множитель очков — до x5. Каскады тоже приносят больше очков.',
            target: '.game-header',
            placement: 'bottom'
        },
        {
            badge: 'БУСТЕРЫ',
            title: 'Помощники на поле',
            text: 'Молоток разбивает клетку, ракета сносит ряд и колонку, обмен меняет любые две клетки. Если под удар попал бонус — он тоже сработает.',
            target: '.boost-panel',
            placement: 'top'
        },
        {
            badge: 'ЗАДАНИЯ',
            title: 'Играй и получай алмазы',
            text: 'Каждый день — 3 новых задания. Выполняй их и забирай алмазы, а в магазине покупай бустеры. Удачи!',
            target: '#tasks-btn',
            placement: 'bottom'
        }
    ];
}

function hasSeenTutorial() {
    return new Promise(resolve => {
        try {
            if (localStorage.getItem(TUTORIAL_KEY) === '1') { resolve(true); return; }
        } catch (e) {}
        if (!vkAvailable()) { resolve(false); return; }
        vkStorageGet(TUTORIAL_KEY).then(v => resolve(v === '1')).catch(() => resolve(false));
    });
}

function maybeShowTutorial(force) {
    let seenLocally = false;
    try { seenLocally = localStorage.getItem(TUTORIAL_KEY) === '1'; } catch (e) {}
    if (!force && seenLocally) return;
    (force ? Promise.resolve(false) : hasSeenTutorial()).then(seen => {
        if (!seen) setTimeout(() => startTutorial(), 350);
    });
}

function startTutorial() {
    if (tutorialActive || gameOverShown) return;
    tutorialActive = true;
    tutorialStepIndex = 0;
    tutorialSteps = buildTutorialSteps();

    tutorialResumeTimer = gameStarted && !isPaused && !gameOverShown;
    if (tutorialResumeTimer) {
        stopGameTimer();
        isPaused = true;
        cancelActiveBooster();
        hideHint();
    }

    tutorialRoot = document.createElement('div');
    tutorialRoot.className = 'tutorial-root';
    tutorialRoot.id = 'tutorial-root';
    document.body.appendChild(tutorialRoot);

    window.addEventListener('resize', scheduleTutorialLayout);
    window.addEventListener('scroll', scheduleTutorialLayout, true);
    document.addEventListener('keydown', handleTutorialKey);

    renderTutorialStep();
}

function scheduleTutorialLayout() {
    if (!tutorialActive) return;
    if (tutorialResizeTimer) clearTimeout(tutorialResizeTimer);
    tutorialResizeTimer = setTimeout(() => {
        if (tutorialActive) renderTutorialStep();
    }, 130);
}

function handleTutorialKey(e) {
    if (!tutorialActive) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextTutorialStep();
    } else if (e.key === 'Escape') {
        e.preventDefault();
        finishTutorial();
    }
}

function renderTutorialStep() {
    if (!tutorialActive || !tutorialRoot) return;
    const step = tutorialSteps[tutorialStepIndex];
    if (!step) { finishTutorial(); return; }

    tutorialRoot.innerHTML = '';

    const targetEl = step.target ? document.querySelector(step.target) : null;
    const rect = targetEl ? targetEl.getBoundingClientRect() : null;
    const hasSpot = !!rect && rect.width > 0 && rect.height > 0;

    const dim = document.createElement('div');
    dim.className = 'tutorial-dim';
    if (hasSpot) dim.style.background = 'transparent';
    tutorialRoot.appendChild(dim);

    if (hasSpot) {
        const spot = document.createElement('div');
        spot.className = 'tutorial-spotlight';
        spot.style.left = (rect.left - 6) + 'px';
        spot.style.top = (rect.top - 6) + 'px';
        spot.style.width = (rect.width + 12) + 'px';
        spot.style.height = (rect.height + 12) + 'px';
        tutorialRoot.appendChild(spot);

        if (step.hand) {
            const hand = document.createElement('div');
            hand.className = 'tutorial-hand';
            hand.innerHTML = TUTORIAL_HAND_SVG;
            hand.style.left = (rect.left + rect.width * 0.30) + 'px';
            hand.style.top = (rect.top + rect.height * 0.45) + 'px';
            tutorialRoot.appendChild(hand);
        }
    }

    const card = document.createElement('div');
    card.className = 'tutorial-card';

    let bonusRow = '';
    if (step.bonusRow) {
        const items = [
            { type: 'bomb', label: '4 в ряд' },
            { type: 'star', label: 'L / T' },
            { type: 'rainbow', label: '5 в ряд' }
        ];
        bonusRow = '<div class="tutorial-bonus-row">' + items.map((it, i) =>
            `<div class="tutorial-bonus">${BONUS_SVG[it.type].split('{ID}').join('tut' + i)}<span>${it.label}</span></div>`
        ).join('') + '</div>';
    }

    const dots = tutorialSteps.map((_, i) =>
        `<span class="tutorial-dot ${i === tutorialStepIndex ? 'active' : ''}"></span>`
    ).join('');

    card.innerHTML = `
        <div class="tutorial-badge">${step.badge}</div>
        <div class="tutorial-title">${step.title}</div>
        <div class="tutorial-text">${step.text}</div>
        ${bonusRow}
        <div class="tutorial-actions">
            <div class="tutorial-dots">${dots}</div>
            <div style="display:flex;align-items:center;gap:6px;">
                <button class="tutorial-skip" id="tutorial-skip">Пропустить</button>
                <button class="tutorial-next" id="tutorial-next">${tutorialStepIndex === tutorialSteps.length - 1 ? 'ПОЕХАЛИ!' : 'ДАЛЕЕ'}</button>
            </div>
        </div>
    `;
    tutorialRoot.appendChild(card);

    // Позиционируем карточку после вставки, когда известна её высота.
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cardW = Math.min(vw * 0.88, 370);
    const cardH = card.offsetHeight;
    let left = (vw - cardW) / 2;
    let top;

    if (!hasSpot) {
        top = (vh - cardH) / 2;
    } else if (step.placement === 'center') {
        top = Math.max(14, (vh - cardH) / 2);
    } else if (step.placement === 'top') {
        top = rect.top - cardH - 16;
        if (top < 14) top = Math.min(rect.bottom + 16, vh - cardH - 14);
    } else {
        top = rect.bottom + 16;
        if (top + cardH > vh - 14) top = Math.max(14, rect.top - cardH - 16);
    }

    if (hasSpot) {
        left = Math.min(Math.max(12, rect.left + rect.width / 2 - cardW / 2), vw - cardW - 12);
    }
    top = Math.min(Math.max(14, top), Math.max(14, vh - cardH - 14));

    card.style.left = left + 'px';
    card.style.top = top + 'px';
    card.style.width = cardW + 'px';

    const nextBtn = document.getElementById('tutorial-next');
    if (nextBtn) nextBtn.addEventListener('click', nextTutorialStep);
    const skipBtn = document.getElementById('tutorial-skip');
    if (skipBtn) skipBtn.addEventListener('click', finishTutorial);
}

function nextTutorialStep() {
    if (!tutorialActive) return;
    if (tutorialStepIndex >= tutorialSteps.length - 1) {
        finishTutorial();
        return;
    }
    tutorialStepIndex++;
    renderTutorialStep();
}

function finishTutorial() {
    if (!tutorialActive) return;
    tutorialActive = false;
    try { localStorage.setItem(TUTORIAL_KEY, '1'); } catch (e) {}
    vkStorageSet(TUTORIAL_KEY, '1');

    window.removeEventListener('resize', scheduleTutorialLayout);
    window.removeEventListener('scroll', scheduleTutorialLayout, true);
    document.removeEventListener('keydown', handleTutorialKey);

    if (tutorialRoot) {
        tutorialRoot.remove();
        tutorialRoot = null;
    }
    if (tutorialResizeTimer) {
        clearTimeout(tutorialResizeTimer);
        tutorialResizeTimer = null;
    }

    if (tutorialResumeTimer) {
        tutorialResumeTimer = false;
        isPaused = false;
        updateTimerDisplay();
        if (!gameOverShown) startGameTimer();
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
    setTimeout(() => maybeShowTutorial(false), 420);
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
leaderboardBtn.addEventListener('click', () => {
    cancelActiveBooster();
    cloudSync_prepareForModal('leaderboard').finally(() => showLeaderboard());
});
leaderboardCloseBtn.addEventListener('click', () => {
    leaderboardModal.classList.remove('active');
    stopLeaderboardRefresh();
});
document.querySelectorAll('#lb-tabs .lb-tab').forEach(btn => {
    btn.addEventListener('click', () => switchLeaderboardPeriod(btn.dataset.period));
});
leaderboardResultsBtn.addEventListener('click', () => {
    cloudSync_prepareForModal('leaderboard').finally(() => showLeaderboard());
});

if (userInfo) {
    const openProfile = () => {
        cancelActiveBooster();
        cloudSync_prepareForModal('profile').finally(() => showProfileModal());
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
        if (window._pg) window._pg.track('share', { score: score });
        window._share.shareScore(score, isBest);
    });
}

if (tasksBtn) tasksBtn.addEventListener('click', () => {
    cancelActiveBooster();
    cloudSync_prepareForModal('tasks').finally(() => showTasksModal());
});

storeBtn.addEventListener('click', () => {
    cancelActiveBooster();
    cloudSync_prepareForModal('store').finally(() => openStore());
});
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
    if (document.visibilityState === 'hidden' || document.hidden) {
        if (gameStarted && !gameOverShown && !isPaused) {
            stopGameTimer();
            saveGameState();
        }
        stopLeaderboardRealtimeSync();
        stopLeaderboardRefresh();
        if (score > 0 && score > _lbLastSubmittedScore) {
            submitLeaderboard(score);
        }
        flushAllSaves();
    } else {
        if (!gameOverShown && !isPaused && gameStarted) {
            resumeModal.classList.remove('active');
        }
        if (savedGame && !gameOverShown && !isPaused && gameStarted) {
            showResumeModal();
        }
        if (gameStarted && !gameOverShown && !isPaused && !gameTimerInterval) {
            startGameTimer();
        }
        if (leaderboardModal.classList.contains('active') && window._leaderboard) {
            startLeaderboardRefresh();
        }
    }
});

window.addEventListener('pagehide', () => {
    if (gameStarted && !gameOverShown) {
        stopGameTimer();
        saveGameState();
    }
    stopLeaderboardRealtimeSync();
    stopLeaderboardRefresh();
    flushAllSaves();
    if (score > 0 && currentUser.vk_user_id && window._leaderboard) {
        try {
            const workerUrl = (typeof CONFIG !== 'undefined' && CONFIG.WORKER_URL)
                ? CONFIG.WORKER_URL.replace(/\/$/, '')
                : null;
            const sessionData = window._pg ? window._pg.getSessionData() : {};
            if (workerUrl && !workerUrl.includes('REPLACE_WITH_YOUR_WORKER_URL') &&
                navigator.sendBeacon && sessionData.session_token) {
                const payload = {
                    vk_user_id: currentUser.vk_user_id,
                    first_name: currentUser.first_name,
                    last_name: currentUser.last_name,
                    photo_100: currentUser.photo_100,
                    score: Math.max(score, bestScore || 0),
                    vk_sign_params: vkSignParamsStr || null,
                    session_token: sessionData.session_token,
                    play_time: sessionData.play_time || 0
                };
                const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' });
                navigator.sendBeacon(workerUrl + '/submit', blob);
            }
        } catch (_) {}
    }
});

// ===== BOOT =====
hydrateDecorations();

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

    if (window._pg) window._pg.init();

    // Cloud sync: полная синхронизация после загрузки, затем периодический интервал
    cloudSync_fullSync(false);
    cloudSync_startInterval();

    // Есть ли незавершённая игра (таймер остановлен, сохранено состояние)?
    const pending = loadSavedGame();
    gameStarted = true;
    const hasPendingGame = !!(pending && pending.timeLeft > 0 && !pending.gameOver);

    if (hasPendingGame) {
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

    if (!hasPendingGame) {
        let forceTutorial = false;
        try {
            const params = new URLSearchParams((window.location.search || '') + '&' + (window.location.hash || '').replace(/^#/, ''));
            forceTutorial = params.get('tutorial') === '1';
        } catch (e) {}
        setTimeout(() => maybeShowTutorial(forceTutorial), 560);
    }

    // Report game ready to VK
    if (vkAvailable()) {
        vkBridge.send('VKWebAppUpdateConfig', {
            appearance: 'light',
            nav_bar_color: '#667eea',
            bg_color: '#667eea'
        }).catch(() => {});
    }

    if (window._pg) window._pg.afterBoot({ hasPendingGame: hasPendingGame });
}

boot();
