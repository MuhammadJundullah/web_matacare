import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { uploadImage } from '@/lib/cloudinary';
import { nanoid } from 'nanoid';

/** Safely extract a human-readable message from any thrown value */
function toErrMsg(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  // Cloudinary SDK throws plain objects like { error: { message: '...' }, http_code: N }
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

// GET - List all documentation
export async function GET() {
  try {
    const db = getDb();
    const docs = db.prepare('SELECT * FROM documentation ORDER BY created_at DESC').all();
    return NextResponse.json({ data: docs });
  } catch (error) {
    const msg = toErrMsg(error);
    console.error('GET documentation error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST - Create new documentation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, date, location, participants, imageBase64, description, badge } = body;

    if (!title || !category || !date || !location || !description || !badge) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    let imageUrl = '';
    let imagePublicId: string | null = null;

    if (imageBase64) {
      const result = await uploadImage(imageBase64, 'matacare/documentation');
      imageUrl = result.url;
      imagePublicId = result.public_id;
    } else {
      return NextResponse.json({ error: 'Gambar diperlukan' }, { status: 400 });
    }

    const id = `doc-${nanoid(8)}`;
    const db = getDb();

    db.prepare(`
      INSERT INTO documentation (id, title, category, date, location, participants, image, image_public_id, description, badge)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, title, category, date, location, Number(participants) || 0, imageUrl, imagePublicId, description, badge);

    const created = db.prepare('SELECT * FROM documentation WHERE id = ?').get(id);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    const msg = toErrMsg(error);
    console.error('POST documentation error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
