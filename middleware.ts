import { NextRequest, NextResponse } from 'next/server';

async function valid(token?: string) {
  if (!token) return false;

  const [value, sig] = token.split('.');
  if (!value || !sig) return false;

  const secret =
    process.env.SESSION_SECRET || 'change-this-session-secret';

  try {
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(value)
    );

    const expected = Array.from(new Uint8Array(signature))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');

    return sig === expected;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Public authentication routes
  if (
    path === '/admin/login' ||
    path.startsWith('/api/admin/login')
  ) {
    return NextResponse.next();
  }

  // Protect admin pages and APIs
  if (
    path.startsWith('/admin') ||
    path.startsWith('/api/admin')
  ) {
    const token = req.cookies.get(
      'virvaani_admin_session'
    )?.value;

    if (!(await valid(token))) {
      if (path.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      return NextResponse.redirect(
        new URL('/admin/login', req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};