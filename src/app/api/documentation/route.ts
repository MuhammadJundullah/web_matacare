import { NextRequest, NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';
import { uploadImage } from '@/lib/cloudinary';
import { nanoid } from 'nanoid';

function toErrMsg(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    const e = error as Record<string, unknown>;
    if (e.error && typeof e.error === 'object') {
      const inner = e.error as Record<string, unknown>;
      if (typeof inner.message === 'string') return inner.message;
    }
    if (typeof e.message === 'string') return e.message;
    return JSON.stringify(error);
  }
  return String(error);
}

export async function GET() {
  try {
    await initializeDatabase();
    const docs = await sql`SELECT * FROM documentation ORDER BY created_at DESC`;
    return NextResponse.json({ data: docs });
  } catch (error) {
    const msg = toErrMsg(error);
    console.error('GET documentation error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const body = await req.json();
    const { title, category, date, location, participants, imageBase64, description, badge } = body;

    if (!title || !category || !date || !location || !description || !badge) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }
    if (!imageBase64) {
      return NextResponse.json({ error: 'Gambar diperlukan' }, { status: 400 });
    }

    const { url: imageUrl, public_id: imagePublicId } = await uploadImage(imageBase64, 'matacare/documentation');
    const id = `doc-${nanoid(8)}`;
    const participantsNum = Number(participants) || 0;

    const [created] = await sql`
      INSERT INTO documentation (id, title, category, date, location, participants, image, image_public_id, description, badge)
      VALUES (${id}, ${title}, ${category}, ${date}, ${location}, ${participantsNum}, ${imageUrl}, ${imagePublicId}, ${description}, ${badge})
      RETURNING *
    `;

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    const msg = toErrMsg(error);
    console.error('POST documentation error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
