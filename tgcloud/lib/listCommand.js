import { api } from 'sdk';
import { sendChunked } from './chunkedReply.js';
import { contactLabel, listContacts } from './contacts.js';
import { groupMessagesByUser, listDialogMessages } from './dialog.js';

function formatHistory(people, byUser) {
  return people.map((person) => {
    const msgs = byUser.get(person.userId) ?? [];
    const lines = msgs.map((m) => {
      const arrow = m.direction === 'out' ? '→' : '←';
      return `${arrow} ${m.text ?? ''}`;
    });
    return (
      `=== ${contactLabel(person)} ===\n` +
      (lines.length ? lines.join('\n') : '(нет сообщений)')
    );
  }).join('\n\n');
}

export async function handleList(adminChatId) {
  const people = await listContacts();
  if (people.length === 0) {
    await api.sendMessage({ chat_id: adminChatId, text: 'Контактов пока нет.' });
    return;
  }

  const rows = await listDialogMessages();
  const body = formatHistory(people, groupMessagesByUser(rows));
  await sendChunked(adminChatId, body);
}
