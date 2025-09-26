# 🚀 Инструкция по деплою на GitHub Pages

## Шаг 1: Создание репозитория на GitHub

1. Перейдите на [GitHub.com](https://github.com)
2. Нажмите "New repository"
3. Назовите репозиторий `plasma-pov` (или любое другое имя)
4. Выберите "Public" (для бесплатного GitHub Pages)
5. НЕ добавляйте README, .gitignore или лицензию (они уже созданы)
6. Нажмите "Create repository"

## Шаг 2: Инициализация Git и загрузка кода

Выполните команды в терминале из папки проекта:

```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: POV - Proof of Vibes website"

# Подключение к GitHub репозиторию (замените yourusername на ваш GitHub username)
git remote add origin https://github.com/yourusername/plasma-pov.git

# Переименование ветки в main (если нужно)
git branch -M main

# Загрузка кода на GitHub
git push -u origin main
```

## Шаг 3: Настройка GitHub Pages

1. Перейдите в настройки репозитория: `Settings` → `Pages`
2. В разделе "Source" выберите "GitHub Actions"
3. GitHub Actions автоматически запустится и задеплоит сайт

## Шаг 4: Проверка деплоя

- Сайт будет доступен по адресу: `https://yourusername.github.io/plasma-pov`
- Деплой займет 2-5 минут
- Статус деплоя можно отслеживать во вкладке "Actions"

## 🔄 Автоматический деплой

После настройки каждый push в ветку `main` будет автоматически деплоить обновления:

```bash
# Внесение изменений
git add .
git commit -m "Update: описание изменений"
git push origin main
```

## 🛠 Локальная разработка

Для локальной разработки:

```bash
# Установка зависимостей (опционально)
npm install

# Запуск локального сервера
npm run dev
# или
npm run serve
# или
python -m http.server 8000
```

## 📁 Структура файлов для деплоя

```
plasma-pov/
├── index.html              # Главная страница
├── style.css               # Стили
├── script.js               # JavaScript
├── package.json            # Конфигурация проекта
├── README.md               # Описание проекта
├── DEPLOY.md               # Эта инструкция
├── .gitignore              # Игнорируемые файлы
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions для деплоя
```

## ✅ Проверка готовности

Убедитесь, что все файлы созданы:
- [x] index.html
- [x] style.css  
- [x] script.js
- [x] package.json
- [x] README.md
- [x] .gitignore
- [x] .github/workflows/deploy.yml

## 🎉 Готово!

Ваш сайт POV - Proof of Vibes готов к деплою! 🌊✨
