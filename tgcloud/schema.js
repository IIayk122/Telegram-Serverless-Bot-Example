import { table, integer, text, sql } from 'sdk/db';

export const messages = table('messages', {
  id:      integer('id').primaryKey({ autoIncrement: true }),
  chatId:  integer('chat_id').notNull(),
  text:    text('text'),
  created: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}).deprecated('replaced by dialog_messages');

export const todos = table('todos', {
  id:      integer('id').primaryKey({ autoIncrement: true }),
  userId:  integer('user_id').notNull(),
  text:    text('text').notNull(),
  created: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
}).deprecated('replaced by contacts + dialog_messages');

export const contacts = table('contacts', {
  userId:    integer('user_id').primaryKey(),
  chatId:    integer('chat_id').notNull(),
  username:  text('username'),
  firstName: text('first_name'),
  lastName:  text('last_name'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const dialogMessages = table('dialog_messages', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  userId:    integer('user_id').notNull(),
  chatId:    integer('chat_id').notNull(),
  direction: text('direction').notNull(),
  text:      text('text'),
  created:   integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});
