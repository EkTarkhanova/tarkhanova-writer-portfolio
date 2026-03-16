# Портфолио — Екатерина Тарханова

Сайт-портфолио сценариста визуальных новелл.

## Структура файлов

```
portfolio/
├── index.html          — главная страница
├── css/
│   └── style.css       — все стили
├── js/
│   └── main.js         — анимации и интерактив
└── README.md
```

## Как загрузить на GitHub Pages

1. Создай репозиторий на GitHub (например: `ekaterina-tarkhanova`)
2. Загрузи все файлы сохраняя структуру папок
3. Перейди в Settings → Pages
4. Source: Deploy from a branch → main → / (root)
5. Сохрани — через 1-2 минуты сайт будет доступен по адресу:
   `https://ТВО_ЙЮ_ЗЕРНЕЙМИМ.github.io/ekaterina-tarkhanova`

## Как добавить свои истории

В `index.html` найди блоки `<article class="story-card">`.
Для каждой истории заполни:
- `card-tags` — жанры
- `card-title` — название
- `card-meta-row` — сеттинг, персонажи, идея
- `card-quote` — цитата из текста
- В `href` у `card-link` — ссылку на Google Slides (сделай "доступно по ссылке")

## Как добавить стихи

В `index.html` найди блок `<div class="poetry-list">`.
Скопируй блок `.poem-item` и замени:
- `.poem-title` — название стихотворения
- `.poem-text` — текст стиха (каждая строфа в `<p>`)
