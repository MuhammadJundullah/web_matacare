import { NextRequest, NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password diperlukan' }, { status: 400 });
    }

    const [user] = await sql`SELECT * FROM admin_users WHERE username = ${username}`;

    if (!user) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password as string);
    if (!valid) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    const token = Buffer.from(`${user.id}:${user.username}:${Date.now()}`).toString('base64');
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    });

    return NextResponse.json({ success: true, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
