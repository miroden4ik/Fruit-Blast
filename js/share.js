// ===== SCORE SHARING =====
// Поделиться результатом игры: VK Bridge → Web Share API → Clipboard fallback.

// URL приложения для шеринга (GitHub Pages / хостинг)
const APP_SHARE_URL = 'https://miroden4ik.github.io/Fruit-Blast/';

/**
 * Безопасный вызов глобальной showMessage с fallback,
 * если основная игра ещё не загрузила эту функцию.
 * @param {string} text
 */
function _shareShowMessageSafe(text) {
    try {
        if (typeof window.showMessage === 'function') {
            window.showMessage(text);
            return;
        }
    } catch (e) {}

    // Fallback: тостер в body
    try {
        const toast = document.createElement('div');
        toast.textContent = text;
        toast.style.cssText =
            'position:fixed;top:24px;left:50%;transform:translateX(-50%);' +
            'background:rgba(0,0,0,0.82);color:#fff;padding:10px 20px;' +
            'border-radius:24px;font-size:14px;font-weight:600;' +
            'z-index:99999;pointer-events:none;box-shadow:0 6px 20px rgba(0,0,0,0.3);' +
            'animation:shareToastPop 0.25s ease-out;';
        document.body.appendChild(toast);
        setTimeout(() => {
            if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
        }, 1400);
    } catch (e) {}
}

/**
 * Поделиться текущим счётом игры.
 * Приоритет стратегий:
 *  1. VK Mini Apps Bridge (VKWebAppShare) — если игра запущена в ВК
 *  2. Web Share API (navigator.share) — мобильные браузеры, Safari, Chrome Android
 *  3. Clipboard (navigator.clipboard.writeText) + уведомление
 *
 * @param {number} score - набранные очки
 * @param {boolean} [isBest=false] — является ли счёт новым рекордом
 * @returns {Promise<{ok:boolean, method?:string, error?:string}>}
 */
async function shareScore(score, isBest) {
    const safeScore = Math.max(0, Math.floor(Number(score) || 0));
    const bestFlag = !!isBest;

    // Тексты для разных методов
    const shortTitle = bestFlag
        ? ('🏆 Новый рекорд! ' + safeScore + ' очков в Fruit Blast')
        : ('🍎 Счёт ' + safeScore + ' очков в Fruit Blast');

    const fullText = bestFlag
        ? ('Я побил рекорд в игре Fruit Blast! 🏆\nМой результат: ' + safeScore + ' очков.\nПопробуй повторить! 🍓🍊🍇')
        : ('Я набрал ' + safeScore + ' очков в игре Fruit Blast! 🍎\nПопробуй меня обыграть! 🎮');

    const link = APP_SHARE_URL;

    // ====== 1. VK Mini Apps Bridge ======
    if (typeof vkAvailable === 'function' ? vkAvailable() : false) {
        try {
            if (typeof vkBridge !== 'undefined' && vkBridge && typeof vkBridge.send === 'function') {
                await vkBridge.send('VKWebAppShare', {
                    title: shortTitle,
                    link: link
                });
                return { ok: true, method: 'vk' };
            }
        } catch (vkErr) {
            console.warn('[share] VKWebAppShare failed, fallback to next method:',
                vkErr && vkErr.message ? vkErr.message : vkErr);
        }
    }

    // ====== 2. Web Share API ======
    if (typeof navigator !== 'undefined' && navigator.share) {
        try {
            await navigator.share({
                title: 'Fruit Blast',
                text: fullText,
                url: link
            });
            return { ok: true, method: 'webshare' };
        } catch (wsErr) {
            // AbortError — пользователь отменил шаринг, это нормально
            if (wsErr && wsErr.name === 'AbortError') {
                return { ok: false, method: 'webshare', error: 'cancelled' };
            }
            console.warn('[share] navigator.share failed, fallback to clipboard:',
                wsErr && wsErr.message ? wsErr.message : wsErr);
        }
    }

    // ====== 3. Clipboard + fallback-сообщение ======
    const clipboardMessage = fullText + '\n\n👉 ' + link;
    let copied = false;

    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
            await navigator.clipboard.writeText(clipboardMessage);
            copied = true;
        } catch (cbErr) {
            console.warn('[share] clipboard.writeText failed:',
                cbErr && cbErr.message ? cbErr.message : cbErr);
            copied = false;
        }
    }

    if (copied) {
        _shareShowMessageSafe('Результат скопирован! 📋');
        return { ok: true, method: 'clipboard' };
    }

    // ====== Фоллбек: покажем сообщение, которое можно скопировать руками ======
    _shareShowMessageSafe('Счёт: ' + safeScore + ' pts');
    return {
        ok: false,
        method: 'fallback',
        error: 'No share method available. Score displayed as toast.'
    };
}

// ====== Экспорт в глобальное пространство ======
window._share = {
    APP_SHARE_URL: APP_SHARE_URL,
    shareScore: shareScore,
    _shareShowMessageSafe: _shareShowMessageSafe
};
