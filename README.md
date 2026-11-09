# TollyClient — GitHub Pages

Готовая папка для публикации сайта. Всё, что внутри `docs`, — это корень статического сайта.

## Как опубликовать

1. Залей папку `docs` в репозиторий GitHub (например, `Nomadvorga/phaze-client`).
2. Открой **Settings → Pages → Build and deployment**.
3. Укажи:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/docs`
4. Нажми **Save**.
5. Через 1–2 минуты сайт откроется по адресу:
   `https://<username>.github.io/<repository>/`

## Если сайт в отдельном репозитории

Залей содержимое `docs` в корень репозитория и выбери папку `/ (root)`.

## Важно

- `index.html` уже лежит в корне — GitHub Pages сразу его подхватит.
- `.nojekyll` добавлен, чтобы GitHub не обрабатывал файлы через Jekyll.
- Jar для скачивания: `downloads/TollyClient-1.21.11-v1.12.jar` (21 МБ).
  Лимит GitHub Pages — 100 МБ на файл, так что всё в порядке.
- Все пути относительные, сайт работает и в подпапке `/<repository>/`.
- Telegram: `https://t.me/TollyWorldq`.

## Локальная проверка

Запусти из этой папки любой статический сервер:

```bash
python -m http.server 8081
```

И открой `http://127.0.0.1:8081/`.
