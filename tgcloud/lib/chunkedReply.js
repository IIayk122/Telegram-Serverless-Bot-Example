import { api } from 'sdk';

const TG_TEXT_LIMIT = 4000;

/** Sends `body` as one or more Telegram messages, splitting on newlines when needed. */
export async function sendChunked(chatId, body, { emptyText = 'История пуста.' } = {}) {
  if (!body) {
    await api.sendMessage({ chat_id: chatId, text: emptyText });
    return;
  }

  let rest = body;
  while (rest.length > 0) {
    let chunk = rest.slice(0, TG_TEXT_LIMIT);
    if (chunk.length === TG_TEXT_LIMIT) {
      const cut = chunk.lastIndexOf('\n');
      if (cut > TG_TEXT_LIMIT / 2) chunk = chunk.slice(0, cut);
    }
    await api.sendMessage({ chat_id: chatId, text: chunk });
    rest = rest.slice(chunk.length).replace(/^\n/, '');
  }
}
