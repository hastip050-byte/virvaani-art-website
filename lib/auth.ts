import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'virvaani_admin_session';

function secret() {
  return process.env.SESSION_SECRET || 'change-this-session-secret';
}
function sign(value: string) {
  return crypto.createHmac('sha256', secret()).update(value).digest('hex');
}
export function createSessionToken() {
  const value = `admin:${Date.now()}`;
  return `${value}.${sign(value)}`;
}
export function isValidToken(token?: string) {
  if (!token) return false;
  const [value, signature] = token.split('.');
  if (!value || !signature) return false;
  const expected = sign(value);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
export function isAdmin() {
  return isValidToken(cookies().get(COOKIE)?.value);
}
export const sessionCookieName = COOKIE;
