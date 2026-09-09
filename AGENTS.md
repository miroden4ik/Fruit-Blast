# AGENTS.md — Контекст проекта Fruit Blast

Этот файл — «память» ассистента между чатами. Читай в начале каждой новой сессии,
чтобы мгновенно восстановить контекст. Обновляй его при каждом значимом изменении.

## Владелец / Юзер
- Имя: Денис (Юнацкий), ник в VK/репо: `miroden4ik`
- VK user id: `759468054`
- Пользователь разрабатывает VK Mini App игру и может давать задания из любого чата.
- Предупреждение пользователя: туториал при первом входе был удалён по его просьбе (см. ниже).

## Проект: VK Mini App игра «Fruit Blast» («Три в ряд»)
### Что это
- Игра «Три в ряд» (match-3) на HTML/CSS/JS, загружается как VK Mini App.
- Репозиторий: `miroden4ik/Fruit-Blast` (публичный). GitHub Pages: `https://miroden4ik.github.io/Fruit-Blast/`. Ветка: `main`.
- VK App ID: `54748711`. Прямая ссылка запуска: `https://vk.com/app54748711` (открывается как vk.ru оболочка, iframe игры на `https://miroden4ik.github.io/Fruit-Blast/?vk_*`).

### Локальные пути
- Основной рабочий каталог: `C:\Users\Den\Desktop\Fruit Blast\`
  - `script.js` — вся игровая логика
  - `index.html`, `style.css`, `js/config.js`, `css/`
  - `leaderboard-worker/` — Cloudflare Worker лидерборда (`worker.js`, `wrangler.toml`)
- Git-клон для git-операций: `C:\Temp\opencode\Fruit-Blast-clone\` (ветка `main`). Push/commit делать здесь.
- Рабочие/временные файлы МОЖНО класть в `C:\Temp\opencode\` (разрешено для внешнего доступа).
- Playwright-файлы (снапшоты/консоль): `C:\Users\Den\Desktop\Fruit Blast\.playwright-mcp\`

### GitHub
- `gh` CLI установлен и авторизован под `miroden4ik`.
- Обязательная 2FA на GitHub до 17 октября 2026 — юзер в курсе.
- GitHub Pages пересобирается автоматически при push в `main` (обычно 30–60 сек). После пуша проверять новый код по live-URL.

### Cloudflare Worker (лидерборд)
- URL: `https://fruit-blast-leaderboard.gamestare2008.workers.dev`
- Деплой: через wrangler. KV Namespace ID: `470a9b35743c4efc99423aa7776f35b2`, binding `FRUIT_BLAST_LB`.
- `CLIENT_SECRET` пуст — защита подписи VK отключена (по просьбе юзера).
- Роуты: `GET /leaderboard`, `POST /submit`, `DELETE /delete` (функция `deleteUser` — создана для чистки тестовых данных).
- Раньше чистился фейковый `test_roundtrip_001` — лидерборд должен быть чист: Саша Филиппов 12225, Денис Юнацкий 6760, Игрок 100.

## Сделанные правки (история)
- Каскады ускорены (реже паузы/длительности анимаций в `script.js`: processMatches 300→160, 150→80; dropFruits 0.3→0.22, 30→15, 300→200; fillEmptySpaces 0.4→0.3, 30→15, 400→250).
- Экран окончания игры расширен: бейдж «Новый рекорд» (`#modal-record-badge`), статистика партии (`#stat-diamonds`, `#stat-combo`, `#stat-matches`, `#stat-bombs`); переменные `diamondsEarnedThisGame`, `newRecordThisGame`; стили `.modal-record`, `.modal-stats`, `.modal-stat`.
- Туториал при первом входе полностью убран из `script.js` (функции showTutorial/tutorial* / completeTutorial / positionSpotlight/Arrow / findTutorialMove, вызов в initGame) и весь CSS-блок `/* ===== TUTORIAL OVERLAY ===== */` + правило в mobile media-query.
- Воркер: добавлен `/delete` роут.
- Коммиты в main (последние): `0310a27` (удаление туториала), `9ec2f9d` (каскады + экран окончания + delete-роут), `fe9b2e2` и ранее.

### Статус VK-модерации (важно)
- Пользователь заполнил настройки: название/описание/краткое описание; состояние «Включено»; URL запуска; иконки уже были.
- Загружены в VK (вкладка «Оформление → Изображения»): Большой сниппет (1120×630) и 3 скриншота книжной ориентации (600×1200) из `C:\Users\Den\Pictures\фото для вк`.
- **Заявка на модерацию ОТПРАВЛЕНА** пользователем (кнопка «Пройти модерацию»). Статус пока «Непроверенное приложение. Приложение доступно только по ссылке». Нужно отслеживать результат модерации.

## Требования/предпочтения пользователя
- Юзер не хранит претензий к языку общения: писать по-русски, кратко и по делу.
- Перед серьёзными действиями (модерация, откаты) — уточнять/спрашивать, не делать вслепую.
- Юзер может попросить откатить изменения (вернуть код до правок) — делать по команде.

## Версии моделей/инструментов
- OS: Windows (win32), shell: PowerShell 5.1.
- Браузер Playwright: Chromium `C:\Users\Den\AppData\Local\ms-playwright\chromium-1234\chrome-win64\chrome.exe`. Системный Chrome запрещён политикой abschaltung.
- Сеть машины нестабильна: периодические таймауты к внешним доменам (cloudflare.com, worker) — обычно это сетевая нестабильность, не баг кода. Сеть переодически восстанавливается.
