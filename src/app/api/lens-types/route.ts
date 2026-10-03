import { NextRequest, NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';

function toErrMsg(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return String(error);
}

export async function GET() {
  try {
    await initializeDatabase();
    const rows = await sql`SELECT * FROM lens_types ORDER BY name ASC`;
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error('GET lens-types error:', toErrMsg(error));
    return NextResponse.json({ error: toErrMsg(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const { name } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nama jenis lensa diperlukan' }, { status: 400 });
    }

    const [created] = await sql`
      INSERT INTO lens_types (name)
      VALUES (${name.trim()})
      RETURNING *
    `;

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    const msg = toErrMsg(error);
    console.error('POST lens-types error:', msg);
    // Handle unique constraint violation
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return NextResponse.json({ error: 'Jenis lensa sudah ada' }, { status: 409 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
