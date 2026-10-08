import { ADMIN_USER_ID } from './config.js';

export function isAdmin(userId) {
  return ADMIN_USER_ID !== 0 && userId === ADMIN_USER_ID;
}
