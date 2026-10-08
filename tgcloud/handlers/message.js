import { api } from 'sdk';
import { isAdmin } from '../lib/admin.js';
import { commandArgs, commandName } from '../lib/command.js';
import { upsertContact } from '../lib/contacts.js';
import { saveDialogMessage } from '../lib/dialog.js';
import { handleList } from '../lib/listCommand.js';
import { handleSend } from '../lib/sendCommand.js';

async function denyUnlessAdmin(chatId, userId) {
  if (isAdmin(userId)) return false;
  await api.sendMessage({ chat_id: chatId, text: 'Команда только для администратора.' });
  return true;
}

export default async function (message) {
  const chatId = message.chat.id;
  const from = message.from;
  if (!from) return;

  await upsertContact(from, chatId);

  const cmd = commandName(message.text);

  if (cmd === 'list') {
    if (await denyUnlessAdmin(chatId, from.id)) return;
    await handleList(chatId);
    return;
  }

  if (cmd === 'send') {
    if (await denyUnlessAdmin(chatId, from.id)) return;
    await handleSend(chatId, commandArgs(message.text));
    return;
  }

  if (cmd != null) {
    const hint = isAdmin(from.id)
      ? 'Команды: /list — история, /send текст — рассылка всем.'
      : 'Напишите сообщение — бот его сохранит.';
    await api.sendMessage({ chat_id: chatId, text: hint });
    return;
  }

  const text = message.text?.trim();
  if (!text) return;

  await saveDialogMessage({
    userId: from.id,
    chatId,
    direction: 'in',
    text,
  });

  if (!isAdmin(from.id)) {
    await api.sendMessage({
      chat_id: chatId,
      text: 'Сообщение получено.',
    });
  }
}
