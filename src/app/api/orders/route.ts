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
    const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error('GET orders error:', toErrMsg(error));
    return NextResponse.json({ error: toErrMsg(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const body = await req.json();
    const { order_date, name, age, phone, address, lens_type, nominal, notes } = body;

    if (!order_date || !name || !phone || !address || !lens_type || nominal === undefined || nominal === '') {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const [created] = await sql`
      INSERT INTO orders (order_date, name, age, phone, address, lens_type, nominal, notes)
      VALUES (
        ${order_date},
        ${name},
        ${age ?? null},
        ${phone},
        ${address},
        ${lens_type},
        ${Number(nominal)},
        ${notes ?? null}
      )
      RETURNING *
    `;

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error('POST orders error:', toErrMsg(error));
    return NextResponse.json({ error: toErrMsg(error) }, { status: 500 });
  }
}
