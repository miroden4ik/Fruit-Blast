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

/**
 * Рендерит UI лидерборда: топ-3 с медалями + список 4-100
 * @param {HTMLElement} containerEl - контейнер для вставки разметки
 * @param {string|number} currentVkUserId - ID текущего игрока (для подсветки)
 * @param {string} userName - имя текущего игрока
 * @param {string} [userAvatarUrl] - URL аватарки текущего игрока
 */
async function openLeaderboardUIEnhanced(containerEl, currentVkUserId, userName, userAvatarUrl) {
    if (!containerEl) return;

    containerEl.innerHTML = '';

    const top3El = document.createElement('div');
    top3El.className = 'lb-top3';
    top3El.style.cssText = 'display:flex;justify-content:center;align-items:flex-end;gap:10px;margin:10px 0 18px;padding:10px 0 6px;';

    const emptyLoading = document.createElement('div');
    emptyLoading.className = 'leaderboard-loading';
    emptyLoading.textContent = 'Загрузка таблицы лидеров...';
    containerEl.appendChild(emptyLoading);

    try {
        const users = await fetchLeaderboardAsync();
        containerEl.innerHTML = '';

        const top3 = users.slice(0, 3);
        const listUsers = users.slice(3, 100);

        const rankMedals = ['🥇', '🥈', '🥉'];
        const rankClasses = ['gold', 'silver', 'bronze'];
        const rankBgGradients = [
            'linear-gradient(135deg, #FFD700 0%, #FFB347 100%)',
            'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A8A8A8 100%)',
            'linear-gradient(135deg, #CD7F32 0%, #E8A45C 50%, #A0522D 100%)'
        ];

        const displayOrder = [1, 0, 2];
        displayOrder.forEach(idx => {
            const user = top3[idx];
            const card = document.createElement('div');
            card.className = 'lb-card ' + rankClasses[idx];

            const scale = idx === 0 ? 1.15 : 1.0;
            const marginTop = idx === 0 ? '-6px' : '12px';
            card.style.cssText =
                'flex:1;max-width:110px;min-width:80px;border-radius:14px;padding:10px 6px 8px;' +
                'background:' + rankBgGradients[idx] + ';' +
                'transform:scale(' + scale + ');' +
                'margin-top:' + marginTop + ';' +
                'box-shadow:0 6px 20px rgba(0,0,0,0.22);' +
                'text-align:center;position:relative;';

            if (idx === 0) {
                const crown = document.createElement('div');
                crown.className = 'crown-top';
                crown.textContent = '👑';
                crown.style.cssText =
                    'position:absolute;top:-22px;left:50%;transform:translateX(-50%) rotate(-8deg);' +
                    'font-size:26px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.25));';
                card.appendChild(crown);
            }

            const medal = document.createElement('div');
            medal.style.cssText = 'font-size:28px;line-height:1;margin-bottom:2px;';
            medal.textContent = rankMedals[idx];
            card.appendChild(medal);

            const avatar = document.createElement('img');
            avatar.alt = '';
            avatar.src = (user && user.photo_100) || '';
            avatar.style.cssText =
                'width:48px;height:48px;border-radius:50%;object-fit:cover;' +
                'border:2px solid rgba(255,255,255,0.85);box-shadow:0 2px 6px rgba(0,0,0,0.2);margin:4px auto;display:block;';
            avatar.onerror = function() {
                avatar.style.background = '#e0e0e0';
                avatar.style.display = 'none';
            };
            card.appendChild(avatar);

            const fullName = user
                ? [user.first_name, user.last_name].filter(Boolean).join(' ').trim()
                : ('Игрок ' + (idx + 1));
            const nameEl = document.createElement('div');
            nameEl.className = 'lb-name';
            nameEl.textContent = fullName || ('Игрок ' + (idx + 1));
            nameEl.style.cssText =
                'font-weight:700;font-size:13px;color:#2c2c3a;' +
                'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:3px 2px 0;';
            card.appendChild(nameEl);

            const scoreEl = document.createElement('div');
            scoreEl.className = 'lb-score';
            scoreEl.textContent = (user && user.score != null ? user.score : 0) + ' 🏆';
            scoreEl.style.cssText =
                'font-weight:800;font-size:15px;color:#764ba2;margin-top:2px;';
            card.appendChild(scoreEl);

            if (user && currentVkUserId && String(user.vk_user_id) === String(currentVkUserId)) {
                card.style.outline = '3px solid #FF6B6B';
                card.style.outlineOffset = '2px';
            }

            top3El.appendChild(card);
        });

        containerEl.appendChild(top3El);

        const divider = document.createElement('div');
        divider.style.cssText =
            'height:1px;background:linear-gradient(90deg,transparent,#ddd,transparent);margin:4px 0 8px;';
        containerEl.appendChild(divider);

        const listEl = document.createElement('div');
        listEl.className = 'lb-list';
        listEl.style.cssText =
            'overflow-y:auto;max-height:320px;margin:4px 0 8px;border-radius:12px;' +
            'background:#f7f7fb;border:1px solid #ececf5;';
        listEl.setAttribute('role', 'list');

        if (listUsers.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'leaderboard-empty';
            empty.textContent = 'Пока только топ-3. Играйте, чтобы попасть в список!';
            empty.style.cssText = 'padding:20px 10px;color:#888;text-align:center;font-size:14px;';
            listEl.appendChild(empty);
        } else {
            listUsers.forEach((user, i) => {
                const rank = 4 + i;
                const row = document.createElement('div');
                row.className = 'lb-row';
                row.style.cssText =
                    'display:flex;align-items:center;justify-content:space-between;gap:8px;' +
                    'padding:8px 12px;border-bottom:1px solid #ececf5;font-size:14px;';
                row.dataset.userId = user && user.vk_user_id ? String(user.vk_user_id) : '';
                row.setAttribute('role', 'listitem');

                if (user && currentVkUserId && String(user.vk_user_id) === String(currentVkUserId)) {
                    row.style.background = 'linear-gradient(90deg, #fff4ec, transparent)';
                    row.style.borderRadius = '10px';
                }

                const leftPart = document.createElement('div');
                leftPart.style.cssText = 'display:flex;align-items:center;gap:10px;flex:1;min-width:0;';

                const rankEl = document.createElement('span');
                rankEl.className = 'lb-rank';
                rankEl.textContent = '#' + rank;
                rankEl.style.cssText =
                    'font-weight:700;color:#764ba2;min-width:34px;font-size:13px;';
                leftPart.appendChild(rankEl);

                if (user && user.photo_100) {
                    const smallAvatar = document.createElement('img');
                    smallAvatar.alt = '';
                    smallAvatar.src = user.photo_100;
                    smallAvatar.style.cssText =
                        'width:24px;height:24px;border-radius:50%;object-fit:cover;flex-shrink:0;';
                    smallAvatar.onerror = function() { smallAvatar.style.display = 'none'; };
                    leftPart.appendChild(smallAvatar);
                }

                const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
                const nameSpan = document.createElement('span');
                nameSpan.className = 'lb-name';
                nameSpan.textContent = fullName || ('Игрок ' + rank);
                nameSpan.style.cssText =
                    'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;color:#333;';
                leftPart.appendChild(nameSpan);

                row.appendChild(leftPart);

                const scoreSpan = document.createElement('span');
                scoreSpan.className = 'lb-score';
                scoreSpan.textContent = (user && user.score != null ? user.score : 0) + ' pts';
                scoreSpan.style.cssText =
                    'font-weight:700;color:#FF6B6B;white-space:nowrap;font-size:13px;';
                row.appendChild(scoreSpan);

                listEl.appendChild(row);
            });
        }

        containerEl.appendChild(listEl);

        if (currentVkUserId) {
            const inList = (users || []).some(u => String(u.vk_user_id) === String(currentVkUserId));
            if (!inList) {
                const selfRow = document.createElement('div');
                selfRow.className = 'lb-row lb-self';
                selfRow.style.cssText =
                    'display:flex;align-items:center;justify-content:space-between;gap:8px;' +
                    'padding:10px 12px;margin-top:6px;border-radius:14px;' +
                    'background:linear-gradient(135deg, #FFE66D 0%, #FFB347 100%);' +
                    'font-weight:700;font-size:14px;box-shadow:0 3px 12px rgba(255,179,71,0.35);';

                const left = document.createElement('div');
                left.style.cssText = 'display:flex;align-items:center;gap:10px;flex:1;min-width:0;';

                const rankSelf = document.createElement('span');
                rankSelf.className = 'lb-rank';
                rankSelf.textContent = '#…';
                rankSelf.style.cssText =
                    'font-weight:800;color:#8B4513;min-width:40px;font-size:15px;';
                left.appendChild(rankSelf);

                if (userAvatarUrl) {
                    const selfAv = document.createElement('img');
                    selfAv.alt = '';
                    selfAv.src = userAvatarUrl;
                    selfAv.style.cssText =
                        'width:26px;height:26px;border-radius:50%;object-fit:cover;' +
                        'border:2px solid rgba(255,255,255,0.7);';
                    selfAv.onerror = function() { selfAv.style.display = 'none'; };
                    left.appendChild(selfAv);
                }

                const selfName = document.createElement('span');
                selfName.className = 'lb-name';
                selfName.textContent = (userName || 'Вы') + ' (вы)';
                selfName.style.cssText =
                    'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;color:#2c2c3a;';
                left.appendChild(selfName);

                selfRow.appendChild(left);
                containerEl.appendChild(selfRow);
            }
        }
    } catch (err) {
        containerEl.innerHTML = '';
        const errEl = document.createElement('div');
        errEl.className = 'leaderboard-empty';
        errEl.textContent = 'Не удалось загрузить таблицу лидеров. Попробуйте позже.';
        errEl.style.cssText = 'padding:30px 10px;color:#E74C3C;text-align:center;font-size:14px;';
        containerEl.appendChild(errEl);
    }
}

window._leaderboard = {
    submitScoreAsync: submitScoreAsync,
    fetchLeaderboardAsync: fetchLeaderboardAsync,
    openLeaderboardUIEnhanced: openLeaderboardUIEnhanced
};
