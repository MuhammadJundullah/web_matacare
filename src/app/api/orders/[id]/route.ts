import { NextRequest, NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';

function toErrMsg(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return String(error);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    const body = await req.json();
    const { order_date, name, age, phone, address, lens_type, nominal, notes } = body;

    if (!order_date || !name || !phone || !address || !lens_type || nominal === undefined || nominal === '') {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const [updated] = await sql`
      UPDATE orders
      SET
        order_date = ${order_date},
        name       = ${name},
        age        = ${age ?? null},
        phone      = ${phone},
        address    = ${address},
        lens_type  = ${lens_type},
        nominal    = ${Number(nominal)},
        notes      = ${notes ?? null}
      WHERE id = ${Number(id)}
      RETURNING *
    `;

    if (!updated) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('PUT orders error:', toErrMsg(error));
    return NextResponse.json({ error: toErrMsg(error) }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    await sql`DELETE FROM orders WHERE id = ${Number(id)}`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE orders error:', toErrMsg(error));
    return NextResponse.json({ error: toErrMsg(error) }, { status: 500 });
  }
}
