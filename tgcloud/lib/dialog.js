import { db } from 'sdk';
import { asc } from 'sdk/db';
import { dialogMessages } from '../schema.js';

export async function saveDialogMessage({ userId, chatId, direction, text }) {
  await db.insert(dialogMessages)
    .values({ userId, chatId, direction, text })
    .run();
}

export async function listDialogMessages() {
  return db.select()
    .from(dialogMessages)
    .orderBy(asc(dialogMessages.created), asc(dialogMessages.id))
    .all();
}

/** Groups messages by userId, preserving order within each group. */
export function groupMessagesByUser(rows) {
  const byUser = new Map();
  for (const row of rows) {
    if (!byUser.has(row.userId)) byUser.set(row.userId, []);
    byUser.get(row.userId).push(row);
  }
  return byUser;
}
