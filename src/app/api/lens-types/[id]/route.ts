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
    const { name } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Nama jenis lensa diperlukan' }, { status: 400 });
    }

    const [updated] = await sql`
      UPDATE lens_types
      SET name = ${name.trim()}
      WHERE id = ${Number(id)}
      RETURNING *
    `;

    if (!updated) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch (error) {
    const msg = toErrMsg(error);
    console.error('PUT lens-types error:', msg);
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return NextResponse.json({ error: 'Jenis lensa sudah ada' }, { status: 409 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    await sql`DELETE FROM lens_types WHERE id = ${Number(id)}`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE lens-types error:', toErrMsg(error));
    return NextResponse.json({ error: toErrMsg(error) }, { status: 500 });
  }
}
