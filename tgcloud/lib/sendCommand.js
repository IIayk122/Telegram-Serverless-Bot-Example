import { api } from 'sdk';
import { listContacts } from './contacts.js';
import { saveDialogMessage } from './dialog.js';

export async function handleSend(adminChatId, text) {
  if (!text) {
    await api.sendMessage({
      chat_id: adminChatId,
      text: 'Использование: /send текст сообщения',
    });
    return;
  }

  const people = await listContacts();
  if (people.length === 0) {
    await api.sendMessage({ chat_id: adminChatId, text: 'Некому отправлять — контактов нет.' });
    return;
  }

  let ok = 0;
  let fail = 0;
  for (const person of people) {
    try {
      await api.sendMessage({ chat_id: person.chatId, text });
      await saveDialogMessage({
        userId: person.userId,
        chatId: person.chatId,
        direction: 'out',
        text,
      });
      ok += 1;
    } catch {
      fail += 1;
    }
  }

  await api.sendMessage({
    chat_id: adminChatId,
    text: `Рассылка: доставлено ${ok}, ошибок ${fail}.`,
  });
}
