// ===== LEADERBOARD CLIENT (для Cloudflare Worker Fruit Blast) =====
// Использует CONFIG.WORKER_URL из js/config.js
// Поля: vk_user_id, first_name, last_name, photo_100, score

/**
 * Отправляет счёт пользователя на сервер лидерборда
 * Обновляет рекорд только если новый score выше старого
 * @param {number} score - набранные очки
 * @param {Object} userInfoObj - данные пользователя { vk_user_id, first_name, last_name, photo_100, vk_sign_params }
 * @returns {Promise<Object>} - ответ сервера
 */
async function submitScoreAsync(score, userInfoObj) {
    const workerUrl = (typeof CONFIG !== 'undefined' && CONFIG.WORKER_URL)
        ? CONFIG.WORKER_URL.replace(/\/$/, '')
        : null;

    if (!workerUrl || workerUrl.includes('REPLACE_WITH_YOUR_WORKER_URL')) {
        console.warn('[leaderboard] WORKER_URL не настроен в js/config.js. Рекорд не отправлен.');
        return { success: false, error: 'WORKER_URL not configured' };
    }

    try {
        const info = userInfoObj || {};
        const payload = {
            vk_user_id: info.vk_user_id != null ? info.vk_user_id : info.vkUserId,
            first_name: info.first_name != null ? info.first_name : info.name,
            last_name: info.last_name != null ? info.last_name : '',
            photo_100: info.photo_100 != null ? info.photo_100 : info.avatar,
            score: Number(score) || 0,
            vk_sign_params: info.vk_sign_params || info.signParams || null
        };

        if (!payload.vk_user_id) {
            return { success: false, error: 'vk_user_id required' };
        }

        const response = await fetch(workerUrl + '/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('HTTP ' + response.status + ' ' + response.statusText);
        }

        const data = await response.json();
        return data || {};
    } catch (err) {
        console.warn('[leaderboard] submitScore failed:', err && err.message ? err.message : err);
        return { success: false, error: err && err.message ? err.message : String(err) };
    }
}

/**
 * Загружает топ-100 лидеров с сервера
 * @returns {Promise<Array>} - массив игроков [{ vk_user_id, first_name, last_name, photo_100, score }]
 */
async function fetchLeaderboardAsync() {
    const workerUrl = (typeof CONFIG !== 'undefined' && CONFIG.WORKER_URL)
        ? CONFIG.WORKER_URL.replace(/\/$/, '')
        : null;

    if (!workerUrl || workerUrl.includes('REPLACE_WITH_YOUR_WORKER_URL')) {
        console.warn('[leaderboard] WORKER_URL не настроен в js/config.js.');
        return [];
    }

    try {
        const response = await fetch(workerUrl + '/leaderboard', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('HTTP ' + response.status + ' ' + response.statusText);
        }

        const data = await response.json();
        if (data && data.success && Array.isArray(data.leaderboard)) {
            return data.leaderboard;
        }
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.warn('[leaderboard] fetchLeaderboard failed:', err && err.message ? err.message : err);
        return [];
    }
}

function _fullName(user) {
    if (!user) return '';
    return [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
}

function _avatarEl(src, size, borderStyle) {
    const img = document.createElement('img');
    img.alt = '';
    img.className = 'lb-avatar-img';
    if (src) {
        img.src = src;
    } else {
        img.src = '';
        img.style.display = 'none';
    }
    img.style.cssText =
        'width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover;flex-shrink:0;' +
        (borderStyle || 'border:2px solid rgba(255,255,255,0.85);box-shadow:0 2px 8px rgba(0,0,0,0.15);');
    img.onerror = function () {
        img.style.display = 'none';
    };
    return img;
}

function _avatarPlaceholder(size) {
    const ph = document.createElement('div');
    ph.className = 'lb-avatar-ph';
    ph.textContent = '👤';
    ph.style.cssText =
        'width:' + size + 'px;height:' + size + 'px;border-radius:50%;flex-shrink:0;' +
        'display:flex;align-items:center;justify-content:center;' +
        'background:linear-gradient(135deg,#f0f0fa 0%,#e0e0f0 100%);' +
        'font-size:' + Math.round(size * 0.55) + 'px;' +
        'border:2px solid rgba(255,255,255,0.85);box-shadow:0 2px 8px rgba(0,0,0,0.1);';
    return ph;
}

function _hasAvatar(user) {
    return !!(user && user.photo_100);
}

/**
 * Рендерит UI лидерборда: подиум топ-3 + список 4..100 со скроллом + карточка себя
 * @param {HTMLElement} containerEl - контейнер для вставки разметки
 * @param {string|number} currentVkUserId - ID текущего игрока (для подсветки)
 * @param {string} userNameFull - полное имя текущего игрока (для карточки себя если вне списка)
 * @param {string} [userAvatarUrl] - URL аватарки текущего игрока
 * @param {number} [currentScoreNow] - текущий счёт игрока (не обязательно рекорд)
 */
async function openLeaderboardUIEnhanced(containerEl, currentVkUserId, userNameFull, userAvatarUrl, currentScoreNow) {
    if (!containerEl) return;

    containerEl.innerHTML = '';
    containerEl.className = 'lb-container';

    const loading = document.createElement('div');
    loading.className = 'lb-loading';
    loading.innerHTML =
        '<div class="lb-spinner"></div>' +
        '<div class="lb-loading-text">Загрузка таблицы лидеров...</div>';
    containerEl.appendChild(loading);

    try {
        const users = await fetchLeaderboardAsync();
        containerEl.innerHTML = '';

        const allUsers = Array.isArray(users) ? users : [];

        const myIdx = currentVkUserId
            ? allUsers.findIndex(u => String(u.vk_user_id) === String(currentVkUserId))
            : -1;
        const myRank = myIdx >= 0 ? (myIdx + 1) : null;
        const myRecord = myIdx >= 0 ? (allUsers[myIdx].score || 0) : 0;

        const top3 = allUsers.slice(0, 3);
        const listUsers = allUsers.slice(3, 100);

        // ===== ПОДИУМ ТОП-3 =====
        const podium = document.createElement('div');
        podium.className = 'lb-podium';
        podium.style.cssText =
            'display:flex;justify-content:center;align-items:flex-end;gap:8px;' +
            'padding:18px 4px 6px;margin-bottom:6px;';

        const slots = [
            { rank: 2, idx: 1 },
            { rank: 1, idx: 0 },
            { rank: 3, idx: 2 }
        ];

        slots.forEach(slot => {
            const user = top3[slot.idx];
            const placeCard = document.createElement('div');
            placeCard.className = 'lb-podium-slot lb-place-' + slot.rank;
            const isFirst = slot.rank === 1;
            const scale = isFirst ? '1.0' : '0.9';
            const cardHeight = isFirst ? '160px' : '130px';
            const platformH = isFirst ? '54px' : '34px';
            const platformGrad =
                slot.rank === 1 ? 'linear-gradient(180deg,#FFE066 0%,#FFB347 60%,#F2994A 100%)' :
                slot.rank === 2 ? 'linear-gradient(180deg,#ECECEC 0%,#C0C0C0 60%,#9A9A9A 100%)' :
                                   'linear-gradient(180deg,#F2C498 0%,#CD7F32 60%,#A0522D 100%)';
            const medal =
                slot.rank === 1 ? '🥇' :
                slot.rank === 2 ? '🥈' : '🥉';

            placeCard.style.cssText =
                'flex:1;max-width:110px;min-width:80px;display:flex;flex-direction:column;align-items:center;' +
                'transform:scale(' + scale + ');';

            if (isFirst) {
                const crown = document.createElement('div');
                crown.className = 'lb-crown';
                crown.textContent = '👑';
                crown.style.cssText =
                    'font-size:28px;line-height:1;margin-bottom:-6px;z-index:2;' +
                    'filter:drop-shadow(0 3px 6px rgba(255,179,71,0.5));' +
                    'transform:rotate(-8deg);';
                placeCard.appendChild(crown);
            }

            const playerWrap = document.createElement('div');
            playerWrap.className = 'lb-podium-player';
            playerWrap.style.cssText =
                'position:relative;display:flex;flex-direction:column;align-items:center;' +
                'padding:10px 8px 8px;border-radius:16px 16px 0 0;' +
                'background:linear-gradient(180deg,#ffffff 0%,#fafaff 100%);' +
                'width:100%;box-sizing:border-box;margin-bottom:-1px;' +
                'border:2px solid ' + (slot.rank === 1 ? '#FFD700' : slot.rank === 2 ? '#C0C0C0' : '#CD7F32') + ';' +
                'border-bottom:none;';

            const avWrap = document.createElement('div');
            avWrap.className = 'lb-podium-avatar';
            avWrap.style.cssText = 'position:relative;margin-bottom:6px;';
            if (_hasAvatar(user)) {
                avWrap.appendChild(_avatarEl(user.photo_100, 56,
                    'border:3px solid ' + (slot.rank === 1 ? '#FFD700' : slot.rank === 2 ? '#C0C0C0' : '#CD7F32') + ';' +
                    'box-shadow:0 4px 14px rgba(0,0,0,0.2);'));
            } else {
                const ph = _avatarPlaceholder(56);
                ph.style.border = '3px solid ' + (slot.rank === 1 ? '#FFD700' : slot.rank === 2 ? '#C0C0C0' : '#CD7F32');
                avWrap.appendChild(ph);
            }

            const medalBadge = document.createElement('div');
            medalBadge.className = 'lb-medal-badge';
            medalBadge.textContent = medal;
            medalBadge.style.cssText =
                'position:absolute;bottom:-4px;right:-6px;font-size:20px;line-height:1;' +
                'filter:drop-shadow(0 2px 4px rgba(0,0,0,0.25));';
            avWrap.appendChild(medalBadge);
            playerWrap.appendChild(avWrap);

            const nameP = document.createElement('div');
            nameP.className = 'lb-podium-name';
            nameP.textContent = _fullName(user) || ('Игрок ' + slot.rank);
            nameP.title = nameP.textContent;
            nameP.style.cssText =
                'font-weight:800;font-size:13px;color:#2c2c3a;text-align:center;' +
                'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;' +
                'width:100%;max-width:100px;margin-bottom:2px;';
            playerWrap.appendChild(nameP);

            const scoreP = document.createElement('div');
            scoreP.className = 'lb-podium-score';
            scoreP.innerHTML =
                '<span class="lb-podium-score-num">' + (user ? (user.score || 0) : 0) + '</span>' +
                '<span class="lb-podium-score-trophy">🏆</span>';
            scoreP.style.cssText =
                'display:flex;align-items:center;justify-content:center;gap:4px;' +
                'font-weight:900;font-size:15px;color:#764ba2;';
            playerWrap.appendChild(scoreP);

            if (user && currentVkUserId && String(user.vk_user_id) === String(currentVkUserId)) {
                playerWrap.style.boxShadow = '0 0 0 3px #FF6B6B inset, 0 8px 22px rgba(255,107,107,0.3);';
            }

            placeCard.appendChild(playerWrap);

            const platform = document.createElement('div');
            platform.className = 'lb-podium-platform';
            platform.style.cssText =
                'width:100%;height:' + platformH + ';background:' + platformGrad + ';' +
                'border-radius:0 0 14px 14px;' +
                'box-shadow:0 8px 20px rgba(0,0,0,0.22),inset 0 2px 0 rgba(255,255,255,0.5);' +
                'display:flex;align-items:center;justify-content:center;';
            const rankText = document.createElement('div');
            rankText.className = 'lb-podium-rank';
            rankText.textContent = '#' + slot.rank;
            rankText.style.cssText =
                'font-weight:900;font-size:22px;color:#fff;' +
                'text-shadow:0 2px 4px rgba(0,0,0,0.35);letter-spacing:1px;';
            platform.appendChild(rankText);
            placeCard.appendChild(platform);

            podium.appendChild(placeCard);
        });

        containerEl.appendChild(podium);

        // ===== РАЗДЕЛИТЕЛЬ =====
        const divider = document.createElement('div');
        divider.className = 'lb-divider';
        divider.style.cssText =
            'height:1px;margin:8px 4px 10px;' +
            'background:linear-gradient(90deg,transparent,#d8d8e8,transparent);';
        containerEl.appendChild(divider);

        // ===== СПИСОК 4..100 СО СКРОЛЛОМ =====
        const listScroll = document.createElement('div');
        listScroll.className = 'lb-list-scroll';
        listScroll.style.cssText =
            'max-height:360px;overflow-y:auto;overflow-x:hidden;' +
            'margin:0 -4px 4px;padding:2px 4px 6px;' +
            '-webkit-overflow-scrolling:touch;';

        if (allUsers.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'lb-empty';
            empty.innerHTML =
                '<div class="lb-empty-icon">🎮</div>' +
                '<div class="lb-empty-title">Пока нет игроков</div>' +
                '<div class="lb-empty-sub">Станьте первым! Играйте, чтобы попасть в рейтинг.</div>';
            empty.style.cssText =
                'padding:28px 16px;text-align:center;';
            empty.querySelector('.lb-empty-icon').style.cssText = 'font-size:42px;margin-bottom:8px;';
            empty.querySelector('.lb-empty-title').style.cssText =
                'font-weight:800;font-size:16px;color:#2c2c3a;margin-bottom:4px;';
            empty.querySelector('.lb-empty-sub').style.cssText =
                'font-size:13px;color:#888;line-height:1.45;';
            listScroll.appendChild(empty);
        } else if (listUsers.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'lb-empty lb-empty-small';
            empty.innerHTML =
                '<div class="lb-empty-sub">Пока только топ-3. Играйте, чтобы попасть в список!</div>';
            empty.style.cssText = 'padding:18px 12px;text-align:center;';
            empty.querySelector('.lb-empty-sub').style.cssText =
                'font-size:13px;color:#888;line-height:1.45;';
            listScroll.appendChild(empty);
        } else {
            listUsers.forEach((user, i) => {
                const rank = 4 + i;
                const row = document.createElement('div');
                row.className = 'lb-list-row';
                row.dataset.userId = user && user.vk_user_id ? String(user.vk_user_id) : '';
                row.setAttribute('role', 'listitem');
                const isMe = currentVkUserId && user && String(user.vk_user_id) === String(currentVkUserId);
                row.style.cssText =
                    'display:flex;align-items:center;gap:10px;' +
                    'padding:10px 12px;margin-bottom:6px;border-radius:14px;' +
                    'background:' + (isMe
                        ? 'linear-gradient(90deg, rgba(255,230,109,0.35) 0%, rgba(255,179,71,0.15) 100%);border:2px solid #FFB347;'
                        : '#f7f7fb;border:1px solid #ececf5;') +
                    'transition:transform 0.15s ease;';

                const rankEl = document.createElement('div');
                rankEl.className = 'lb-list-rank';
                rankEl.textContent = '#' + rank;
                rankEl.style.cssText =
                    'min-width:42px;font-weight:800;font-size:14px;color:#764ba2;text-align:center;';
                row.appendChild(rankEl);

                const avWrap = document.createElement('div');
                avWrap.className = 'lb-list-avatar-wrap';
                avWrap.style.cssText = 'position:relative;flex-shrink:0;';
                if (_hasAvatar(user)) {
                    avWrap.appendChild(_avatarEl(user.photo_100, 36,
                        'border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.12);'));
                } else {
                    avWrap.appendChild(_avatarPlaceholder(36));
                }
                row.appendChild(avWrap);

                const infoCol = document.createElement('div');
                infoCol.className = 'lb-list-info';
                infoCol.style.cssText =
                    'flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;';

                const nameEl = document.createElement('div');
                nameEl.className = 'lb-list-name';
                nameEl.textContent = _fullName(user) || ('Игрок ' + rank);
                nameEl.title = nameEl.textContent;
                nameEl.style.cssText =
                    'font-weight:700;font-size:14px;color:#2c2c3a;' +
                    'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
                infoCol.appendChild(nameEl);

                const metaEl = document.createElement('div');
                metaEl.className = 'lb-list-meta';
                metaEl.innerHTML =
                    '<span class="lb-meta-current">Счёт: <b>' + (user.score || 0) + '</b></span>' +
                    '<span class="lb-meta-dot">•</span>' +
                    '<span class="lb-meta-best">Рекорд: <b>' + (user.score || 0) + '</b></span>';
                metaEl.style.cssText =
                    'font-size:11px;color:#888;display:flex;align-items:center;gap:5px;flex-wrap:wrap;';
                infoCol.appendChild(metaEl);

                row.appendChild(infoCol);

                const scoreCol = document.createElement('div');
                scoreCol.className = 'lb-list-score-col';
                scoreCol.style.cssText =
                    'flex-shrink:0;text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:2px;';
                const sBig = document.createElement('div');
                sBig.className = 'lb-list-score';
                sBig.innerHTML = '<b>' + (user.score || 0) + '</b> 🏆';
                sBig.style.cssText =
                    'font-weight:900;font-size:15px;color:#FF6B6B;white-space:nowrap;';
                scoreCol.appendChild(sBig);
                row.appendChild(scoreCol);

                listScroll.appendChild(row);
            });
        }

        containerEl.appendChild(listScroll);

        // ===== КАРТОЧКА ТЕКУЩЕГО ИГРОКА =====
        if (currentVkUserId) {
            const selfCard = document.createElement('div');
            const showRecord = myRecord > 0;
            const displayScore = (typeof currentScoreNow === 'number' && currentScoreNow > 0)
                ? currentScoreNow
                : (showRecord ? myRecord : 0);
            const isBetter = (typeof currentScoreNow === 'number') && currentScoreNow > myRecord;

            selfCard.className = 'lb-self-card';
            selfCard.style.cssText =
                'display:flex;align-items:center;gap:10px;' +
                'padding:12px 14px;margin-top:8px;border-radius:16px;' +
                'background:linear-gradient(135deg, #FFE66D 0%, #FFB347 100%);' +
                'box-shadow:0 6px 20px rgba(255,179,71,0.45);' +
                'border:2px solid rgba(255,255,255,0.5);';

            const rankSelf = document.createElement('div');
            rankSelf.className = 'lb-self-rank';
            rankSelf.innerHTML = myRank
                ? ('<span class="lb-self-rank-num">#' + myRank + '</span>')
                : '<span class="lb-self-rank-placeholder">Вне топ-100</span>';
            rankSelf.style.cssText =
                'min-width:70px;text-align:center;';
            if (myRank) {
                rankSelf.querySelector('.lb-self-rank-num').style.cssText =
                    'font-weight:900;font-size:18px;color:#8B4513;' +
                    'text-shadow:0 1px 0 rgba(255,255,255,0.5);';
            } else {
                rankSelf.querySelector('.lb-self-rank-placeholder').style.cssText =
                    'font-weight:700;font-size:11px;color:#8B4513;opacity:0.9;';
            }
            selfCard.appendChild(rankSelf);

            const avS = document.createElement('div');
            avS.className = 'lb-self-avatar-wrap';
            avS.style.cssText = 'flex-shrink:0;';
            if (userAvatarUrl) {
                avS.appendChild(_avatarEl(userAvatarUrl, 40,
                    'border:3px solid #fff;box-shadow:0 4px 12px rgba(139,69,19,0.25);'));
            } else {
                const ph = _avatarPlaceholder(40);
                ph.style.border = '3px solid #fff';
                avS.appendChild(ph);
            }
            selfCard.appendChild(avS);

            const infoS = document.createElement('div');
            infoS.className = 'lb-self-info';
            infoS.style.cssText = 'flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;';
            const nameS = document.createElement('div');
            nameS.className = 'lb-self-name';
            nameS.textContent = (userNameFull || 'Вы') + ' (вы)';
            nameS.title = nameS.textContent;
            nameS.style.cssText =
                'font-weight:800;font-size:14px;color:#2c2c3a;' +
                'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
            infoS.appendChild(nameS);

            const metaS = document.createElement('div');
            metaS.className = 'lb-self-meta';
            let metaParts = [];
            if (typeof currentScoreNow === 'number') {
                metaParts.push('<span class="lb-meta-current">Сейчас: <b>' + currentScoreNow + '</b></span>');
            }
            if (showRecord) {
                metaParts.push('<span class="lb-meta-best">Рекорд: <b>' + myRecord + '</b></span>');
            } else {
                metaParts.push('<span class="lb-meta-best" style="opacity:0.85">Рекорд пока не сохранён</span>');
            }
            metaS.innerHTML = metaParts.join('<span class="lb-meta-dot">•</span>');
            metaS.style.cssText =
                'font-size:11px;color:#5a3a18;display:flex;align-items:center;gap:5px;flex-wrap:wrap;';
            infoS.appendChild(metaS);
            selfCard.appendChild(infoS);

            const scS = document.createElement('div');
            scS.className = 'lb-self-score-col';
            scS.style.cssText =
                'flex-shrink:0;text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:2px;';
            const scBig = document.createElement('div');
            scBig.className = 'lb-self-score';
            scBig.innerHTML = '<b>' + displayScore + '</b> 🏆';
            scBig.style.cssText = 'font-weight:900;font-size:16px;color:#8B4513;white-space:nowrap;';
            scS.appendChild(scBig);
            if (isBetter) {
                const beatBadge = document.createElement('div');
                beatBadge.className = 'lb-new-best';
                beatBadge.textContent = '🔥 НОВЫЙ!';
                beatBadge.style.cssText =
                    'font-size:10px;font-weight:900;color:#fff;' +
                    'background:linear-gradient(135deg,#FF6B6B,#C0392B);' +
                    'padding:2px 7px;border-radius:10px;letter-spacing:0.3px;';
                scS.appendChild(beatBadge);
            }
            selfCard.appendChild(scS);

            containerEl.appendChild(selfCard);
        }
    } catch (err) {
        console.error('[leaderboard] render error:', err);
        containerEl.innerHTML = '';
        const errEl = document.createElement('div');
        errEl.className = 'lb-error';
        errEl.innerHTML =
            '<div class="lb-error-icon">⚠️</div>' +
            '<div class="lb-error-title">Не удалось загрузить таблицу лидеров</div>' +
            '<div class="lb-error-sub">Попробуйте открыть позже</div>';
        errEl.style.cssText = 'padding:30px 16px;text-align:center;';
        errEl.querySelector('.lb-error-icon').style.cssText = 'font-size:40px;margin-bottom:8px;';
        errEl.querySelector('.lb-error-title').style.cssText =
            'font-weight:800;font-size:15px;color:#C0392B;margin-bottom:4px;';
        errEl.querySelector('.lb-error-sub').style.cssText =
            'font-size:13px;color:#888;';
        containerEl.appendChild(errEl);
    }
}

window._leaderboard = {
    submitScoreAsync: submitScoreAsync,
    fetchLeaderboardAsync: fetchLeaderboardAsync,
    openLeaderboardUIEnhanced: openLeaderboardUIEnhanced
};
