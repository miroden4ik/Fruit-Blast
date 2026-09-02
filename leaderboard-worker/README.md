# 🍎 Fruit Blast — Лидерборд на Cloudflare Workers

Бэкенд таблицы лидеров для игры Fruit Blast (VK Mini App). Работает на **Cloudflare Workers** + **Workers KV** — бесплатно, без сервера, масштабируется автоматически.

---

## 📁 Структура папки

```
leaderboard-worker/
├── worker.js        # Код воркера (роуты + логика)
├── wrangler.toml    # Конфиг Cloudflare Wrangler
└── README.md        # Эта инструкция
```

---

## 🚀 Пошаговая инструкция для новичка

> 💡 **Важно:** Никакого программирования не требуется. Делай шаг за шагом — всё получится!

---

### Шаг 1. Зарегистрируйся на Cloudflare (бесплатно)

1. Открой в браузере: https://dash.cloudflare.com/sign-up
2. Введи **email** и придумай **пароль** → нажми **Create Account**.
3. На вопрос *"What would you like to do first?"* → нажми **Skip** (внизу справа).
4. Готово! Ты попадёшь в **Cloudflare Dashboard**.

> ✅ План Free Tier достаточно на 100 000 запросов в день — это больше чем хватит для игры.

---

### Шаг 2. Создай KV Namespace (база данных для рекордов)

KV Workers — это простая база данных, где будут храниться очки игроков.

1. В Dashboard Cloudflare слева в меню найди **Workers & Pages** → кликни.
2. В подменю выбери **KV**.
3. Нажми кнопку **Create a namespace**.
4. В поле *Name* введи: `fruit-blast-lb` (имя на английском, без пробелов).
5. Нажми **Add**.
6. Готово! Ты увидишь в списке `fruit-blast-lb`, а рядом будет **Namespace ID** (длинная строка символов). **Скопируй её** (нужна на следующем шаге).

---

### Шаг 3. Вставь Namespace ID в wrangler.toml

Открой файл `leaderboard-worker/wrangler.toml` в любом текстовом редакторе (Блокнот, VS Code и т.д.):

```toml
kv_namespaces = [
  { binding = "FRUIT_BLAST_LB", id = "REPLACE_WITH_YOUR_KV_NAMESPACE_ID", preview_id = "REPLACE_WITH_YOUR_KV_NAMESPACE_ID" }
]
```

🔁 Замени **обе** надписи `REPLACE_WITH_YOUR_KV_NAMESPACE_ID` на тот ID, что скопировал на Шаге 2.

Пример как должно получиться:
```toml
kv_namespaces = [
  { binding = "FRUIT_BLAST_LB", id = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6", preview_id = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6" }
]
```

Сохрани файл (Ctrl+S).

---

### Шаг 4. Установи Node.js (если ещё не стоит)

Wrangler работает через Node.js. Проверь, установлен ли он:

1. Нажми **Win+R**, введи `cmd` → Enter.
2. В черном окне напиши:
   ```
   node -v
   ```
3. Если появится версия (например `v20.x.x`) — отлично, переходи к Шагу 5.
4. Если ошибка — скачай Node.js с официального сайта: https://nodejs.org/
   - Выбери **LTS**-версию (рекомендованная)
   - Установи с настройками по умолчанию (жми "Далее" везде)
   - После установки **перезапусти** командную строку (шаг 1-2 снова).

---

### Шаг 5. Установи Wrangler CLI

Это утилита, которая загружает твой код на Cloudflare.

1. Открой командную строку (Win+R → `cmd` → Enter).
2. Введи команду и нажми Enter:
   ```
   npm install -g wrangler
   ```
3. Подожди, пока закончится установка (появится приглашение ввода).
4. Проверь, что всё установилось:
   ```
   wrangler -V
   ```
   Если выведет версию — всё хорошо!

---

### Шаг 6. Авторизуй Wrangler в Cloudflare

1. В командной строке введи:
   ```
   wrangler login
   ```
2. Откроется браузер с запросом разрешения. Нажми **Allow** (Разрешить).
3. Вернись в командную строку — там появится надпись *"Successfully logged in"*.
4. Готово! Wrangler привязан к твоему аккаунту.

---

### Шаг 7. Залей воркер на Cloudflare (deploy)

1. В командной строке перейди в папку `leaderboard-worker`.

   **Пример:** Если папка лежит на Рабочем столе:
   ```
   cd Desktop\Fruit Blast\leaderboard-worker
   ```
   *(Если путь не срабатывает, найди папку через Проводник, скопируй путь из адресной строки и напиши `cd ` + вставь путь)*

2. Как только ты в нужной папке (в приглашении будет написано `leaderboard-worker`), запусти деплой:
   ```
   wrangler deploy
   ```
3. Подожди 10–30 секунд. В конце ты увидишь что-то такое:
   ```
   ✨  Deployed your Worker to fruit-blast-leaderboard.your-username.workers.dev
   ```
4. 🎉 **Поздравляю! Бэкенд запущен!** Скопируй этот URL (в примере: `fruit-blast-leaderboard.your-username.workers.dev`) — это и есть **WORKER_URL**, нужный дальше.

---

### Шаг 8. Проверь, что всё работает

Открой в браузере твой URL + `/leaderboard`, например:
```
https://fruit-blast-leaderboard.your-username.workers.dev/leaderboard
```

Если увидишь JSON примерно такой — всё отлично:
```json
{"success":true,"leaderboard":[]}
```

---

### Шаг 9. Подключи WORKER_URL к игре

1. В корневой папке игры создай папку `js` (если её нет).
2. Внутри `js` создай файл `config.js` со следующим содержимым:

```javascript
const CONFIG = {
  WORKER_URL: "https://fruit-blast-leaderboard.your-username.workers.dev"
};
```

3. Замени адрес на тот, что получил на Шаге 7. **Важно:** в конце URL **нет** слеша `/`.
4. Открой `index.html` и добавь подключение config.js **перед** подключением script.js. Найди строку:
   ```html
   <script src="script.js"></script>
   ```
   И добавь перед ней:
   ```html
   <script src="js/config.js"></script>
   ```

5. Готово! Игра теперь знает, куда отправлять рекорды.

---

### 🔐 Опционально: Включи проверку подписи VK

По умолчанию воркер принимает запросы без проверки подписи (чтобы можно было тестировать). Для защиты от накрутки включите валидацию:

1. Открой `leaderboard-worker/worker.js` в редакторе.
2. Найди строку:
   ```javascript
   const CLIENT_SECRET = ''; // TODO: Вставьте сюда Client Secret из настроек VK Mini App
   ```
3. В кавычки вставь **Client Secret** из настроек твоего VK Mini App (раздел *Параметры* → *Защищённый ключ*).
4. Сохрани файл и заново выполни `wrangler deploy`.

Готово! Теперь воркер проверяет подпись VK и принимает только настоящие запросы от игроков.

---

## 📡 API воркера

Воркер предоставляет 2 HTTP-метода:

### `GET /leaderboard`
Возвращает топ-100 игроков, отсортированных по убыванию очков.

**Ответ:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "vk_user_id": 12345,
      "first_name": "Иван",
      "last_name": "Иванов",
      "photo_100": "https://...",
      "score": 5000,
      "updated_at": 1710000000000
    }
  ]
}
```

### `POST /submit`
Отправляет результат игрока. Рекорд обновляется только если новый счёт **выше** предыдущего.

**Тело запроса (JSON):**
```json
{
  "vk_user_id": 12345,
  "first_name": "Иван",
  "last_name": "Иванов",
  "photo_100": "https://...",
  "score": 5000,
  "vk_sign_params": "vk_access_token_settings=&vk_app_id=..."
}
```

**Ответ (новый рекорд):**
```json
{
  "success": true,
  "updated": true,
  "previous_score": 4200,
  "new_score": 5000,
  "record": { ... }
}
```

**Ответ (рекорд не побит):**
```json
{
  "success": true,
  "updated": false,
  "score": 5000,
  "message": "New score is not higher than current record"
}
```

---

## ❓ Часто возникающие вопросы

**Q: Ошибка `Failed to publish` при деплое?**
A: Проверь, что на Шаге 6 ты выполнил `wrangler login` и дал разрешение браузером.

**Q: Где найти Client Secret VK?**
A: В настройках VK Mini App → вкладка *Параметры* → блок *Ключи доступа*.

**Q: Как очистить таблицу лидеров?**
A: В Cloudflare Dashboard → Workers & Pages → KV → твой namespace → кликни по всем ключам → Delete. Затем удалить ключ `_index`.

**Q: Сколько стоит?**
A: Ничего! План Free Worker: 100 000 запросов в день, 1 GB KV-хранилища. Для игры этого хватит с головой.

---

## 🆘 Помощь

Если что-то не получается — не стесняйся спрашивать! Главное делай шаги по порядку. Удачи! 🎮🍎
