import { NextResponse } from 'next/server';
import { createSessionToken, sessionCookieName } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || '');
  const password = String(body.password || '');
  if (email !== (process.env.ADMIN_EMAIL || 'admin@virvaaniart.com') ||
      password !== (process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!')) {
    return NextResponse.json({error:'Invalid email or password'}, {status:401});
  }
  const res = NextResponse.json({ok:true});
  res.cookies.set(sessionCookieName, createSessionToken(), {
    httpOnly:true, sameSite:'lax', secure:process.env.NODE_ENV==='production',
    path:'/', maxAge:60*60*8
  });
  return res;
}
