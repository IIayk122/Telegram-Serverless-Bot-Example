# DiVeritas bot

Бот в Telegram: [@DiVeritas_bot](https://t.me/DiVeritas_bot)

Telegram-бот на [tgcloud](https://tgcloud.ai): сохраняет всех, кто когда-либо писал боту, ведёт историю переписки и даёт администратору команды для просмотра и рассылки.

## Возможности

- Любое текстовое сообщение от пользователя сохраняется в БД (контакт + история).
- **`/list`** (только админ) — полная история переписок со всеми контактами.
- **`/send текст`** (только админ) — рассылка сообщения всем, кто когда-либо общался с ботом.

## Структура

```
tgcloud/
  schema.js              # contacts, dialog_messages
  handlers/message.js    # маршрутизация апдейтов
  lib/
    config.js            # ADMIN_USER_ID
    admin.js             # проверка админа
    command.js           # разбор команд
    contacts.js          # контакты
    dialog.js            # история сообщений
    listCommand.js       # /list
    sendCommand.js       # /send
    chunkedReply.js      # нарезка длинных ответов
```

## Настройка

1. Установите зависимости и привяжите бота:

```bash
npm install
npx tgcloud login
```

2. Укажите свой Telegram user id в `tgcloud/lib/config.js` (`ADMIN_USER_ID`). Узнать id можно у [@userinfobot](https://t.me/userinfobot).

3. Задеплойте код и примените схему БД:

```bash
npx tgcloud fetch          # если локальный snapshot отстаёт от сервера
npx tgcloud push
npx tgcloud migrate --yes
```

Если `push` ругается на расхождение ревизий, сначала `fetch`, затем снова `push`. Перезаписать облако своими файлами: `npx tgcloud push --force` (осторожно).

## Локальные команды

| Команда | Описание |
|---------|----------|
| `npm run status` / `npx tgcloud status` | Локальные изменения vs snapshot |
| `npm run deploy` / `npx tgcloud push` | Деплой модулей |
| `npx tgcloud migrate` | Миграции БД |
| `npx tgcloud run handlers/message '{...}'` | Прогон хендлера в облаке |

Подробности по SDK и правилам проекта — в [`AGENTS.md`](AGENTS.md) и [`docs/tgcloud-sdk.md`](docs/tgcloud-sdk.md).
