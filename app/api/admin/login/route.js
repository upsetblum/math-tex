import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();

  await new Promise((r) => setTimeout(r, 200));

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, msg: 'Invalid password' }, { status: 401 });
  }

  const secret = process.env.TOKEN_SECRET;
  const expiry = Date.now() + 8 * 60 * 60 * 1000; // 8 hours
  const payload = String(expiry);
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  const token = `${payload}.${signature}`;

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60,
  });
  return response;
}
