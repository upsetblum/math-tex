import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;

  const expiry = parseInt(payload, 10);
  if (isNaN(expiry) || Date.now() > expiry) return false;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const sigBytes = Uint8Array.from(Buffer.from(signature, 'hex'));
  const msgBytes = encoder.encode(payload);
  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, msgBytes);
  return valid;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;
  const secret = process.env.TOKEN_SECRET ?? '';

  if (!token || !secret) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const valid = await verifyToken(token, secret);
  if (!valid) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}
