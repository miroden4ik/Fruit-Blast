// ===== OPTIMIZED INCREMENTAL RENDER =====
// Инкрементальный рендер доски: перерисовываем только те клетки,
// где изменились type или bonus, вместо полной пересборки DOM.

/**
 * Сравнивает две доски и возвращает массив координат клеток, где есть различия
 * Сравниваются поля `type` и `bonus` каждой клетки
 *
 * @param {Array<Array<{type:string,bonus:null|string}>>} oldBoard - предыдущее состояние
 * @param {Array<Array<{type:string,bonus:null|string}>>} newBoard - новое состояние
 * @param {number} BOARD_SIZE - размер квадратной доски
 * @returns {Array<{row:number,col:number}>} список клеток для перерисовки
 */
function diffBoards(oldBoard, newBoard, BOARD_SIZE) {
    const size = typeof BOARD_SIZE === 'number' ? BOARD_SIZE :
        (Array.isArray(newBoard) ? newBoard.length : 0);

    const changes = [];

    for (let row = 0; row < size; row++) {
        const oldRow = oldBoard && oldBoard[row];
        const newRow = newBoard && newBoard[row];

        for (let col = 0; col < size; col++) {
            const oldCell = oldRow && oldRow[col];
            const newCell = newRow && newRow[col];

            let changed = false;

            if (!oldCell && newCell) {
                changed = true;
            } else if (oldCell && !newCell) {
                changed = true;
            } else if (oldCell && newCell) {
                if (oldCell.type !== newCell.type) {
                    changed = true;
                }
                if (oldCell.bonus !== newCell.bonus) {
                    changed = true;
                }
            } else if (!oldCell && !newCell) {
                // обе пустые — не изменилось
            }

            if (changed) {
                changes.push({ row: row, col: col });
            }
        }
    }

    return changes;
}

/**
 * Рендерит (обновляет) одну клетку по её координатам
 * Обновляет innerHTML у элемента .fruit внутри клетки, или создаёт его при отсутствии.
 * Управляет классами `bomb` / `rainbow` у клетки.
 *
 * @param {number} row - номер строки
 * @param {number} col - номер столбца
 * @param {Array<Array<HTMLElement>>} matrixCells - 2D-массив DOM-элементов клеток
 * @param {Array<Array<{type:string,bonus:null|string}>>} board - актуальное состояние доски
 * @param {(type:string,id:string)=>string} fruitSvgHtmlFn - функция генерации SVG обычного фрукта
 * @param {(bonus:string,id:string)=>string} [bonusSvgHtmlFn] - функция генерации SVG бонус-фрукта (опционально)
 */
function renderCell(row, col, matrixCells, board, fruitSvgHtmlFn, bonusSvgHtmlFn) {
    const cellEl = matrixCells && matrixCells[row] && matrixCells[row][col];
    if (!cellEl) return;

    const fruitData = board && board[row] && board[row][col];

    // Сбрасываем классы бонусов у контейнера клетки
    cellEl.classList.remove('bomb', 'rainbow');

    let fruitContainer = cellEl.querySelector(':scope > .fruit');

    if (!fruitData) {
        // Клетка пустая — убираем содержимое
        if (fruitContainer) {
            fruitContainer.innerHTML = '';
        }
        return;
    }

    // Создаём контейнер .fruit если его ещё нет
    if (!fruitContainer) {
        fruitContainer = document.createElement('div');
        fruitContainer.className = 'fruit';
        cellEl.appendChild(fruitContainer);
    }

    // Генератор уникального id для SVG градиентов (чтобы не пересекались)
    const gradId = 'g_opt_' + row + '_' + col + '_' + Math.floor(Math.random() * 1e6);

    const bonus = fruitData.bonus;

    if (bonus === 'bomb') {
        // Бомба: рендерим обычный фрукт + значок бомбы поверх
        let svg = '';
        try {
            svg = typeof fruitSvgHtmlFn === 'function'
                ? String(fruitSvgHtmlFn(fruitData.type, gradId) || '')
                : '';
        } catch (e) {
            svg = '';
        }
        fruitContainer.innerHTML = svg +
            '<span class="bomb-badge" style="' +
            'position:absolute;top:-4px;right:-4px;font-size:15px;z-index:2;' +
            'filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4));pointer-events:none;' +
            '">💣</span>';
        cellEl.classList.add('bomb');
    } else if (bonus === 'rainbow') {
        // Радуга: используем отдельный бонусный SVG или fallback
        let svg = '';
        try {
            if (typeof bonusSvgHtmlFn === 'function') {
                svg = String(bonusSvgHtmlFn('rainbow', gradId) || '');
            } else if (typeof fruitSvgHtmlFn === 'function') {
                svg = String(fruitSvgHtmlFn(fruitData.type, gradId) || '');
            }
        } catch (e) {
            svg = '';
        }
        if (!svg) {
            svg = '<span style="font-size:90%;line-height:1;">🌈</span>';
        }
        fruitContainer.innerHTML = svg;
        cellEl.classList.add('rainbow');
    } else {
        // Обычный фрукт
        let svg = '';
        try {
            svg = typeof fruitSvgHtmlFn === 'function'
                ? String(fruitSvgHtmlFn(fruitData.type, gradId) || '')
                : '';
        } catch (e) {
            svg = '';
        }
        fruitContainer.innerHTML = svg;
    }
}

/**
 * Массовый инкрементальный рендер: для каждой изменённой клетки
 * вызывает renderCell. Это обёртка для удобства вызова.
 *
 * @param {Array<{row:number,col:number}>} changedCells - результат diffBoards
 * @param {Array<Array<HTMLElement>>} matrixCells - 2D-массив DOM-элементов
 * @param {Array<Array<{type:string,bonus:null|string}>>} board - актуальная доска
 * @param {(type:string,id:string)=>string} fruitSvgHtmlFn - генератор обычных SVG
 * @param {(bonus:string,id:string)=>string} [bonusSvgHtmlFn] - генератор бонусных SVG (опц.)
 */
function renderBoardIncremental(changedCells, matrixCells, board, fruitSvgHtmlFn, bonusSvgHtmlFn) {
    if (!Array.isArray(changedCells)) return;

    const len = changedCells.length;
    for (let i = 0; i < len; i++) {
        const pos = changedCells[i];
        if (!pos) continue;
        renderCell(pos.row, pos.col, matrixCells, board, fruitSvgHtmlFn, bonusSvgHtmlFn);
    }
}

// ====== Экспорт функций в глобальное пространство ======
window._render = {
    diffBoards: diffBoards,
    renderCell: renderCell,
    renderBoardIncremental: renderBoardIncremental
};
