import { db } from 'sdk';
import { asc } from 'sdk/db';
import { contacts } from '../schema.js';

export function contactLabel(c) {
  const name = [c.firstName, c.lastName].filter(Boolean).join(' ');
  const user = c.username ? `@${c.username}` : null;
  return [user, name || null, `id ${c.userId}`].filter(Boolean).join(' · ');
}

export async function upsertContact(from, chatId) {
  const fields = {
    chatId,
    username: from.username ?? null,
    firstName: from.first_name ?? null,
    lastName: from.last_name ?? null,
    updatedAt: new Date(),
  };

  await db.insert(contacts)
    .values({ userId: from.id, ...fields })
    .onConflictDoUpdate({
      target: contacts.userId,
      set: fields,
    })
    .run();
}

export async function listContacts() {
  return db.select()
    .from(contacts)
    .orderBy(asc(contacts.updatedAt))
    .all();
}
