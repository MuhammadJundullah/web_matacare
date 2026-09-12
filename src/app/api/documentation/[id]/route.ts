import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

// GET - single documentation
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const doc = db.prepare('SELECT * FROM documentation WHERE id = ?').get(id);

    if (!doc) {
      return NextResponse.json({ error: 'Dokumentasi tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ data: doc });
  } catch (error) {
    console.error('GET [id] error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// PUT - update documentation
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, category, date, location, participants, imageBase64, description, badge } = body;

    const db = getDb();
    const existing = db.prepare('SELECT * FROM documentation WHERE id = ?').get(id) as
      | { id: string; image: string; image_public_id: string | null }
      | undefined;

    if (!existing) {
      return NextResponse.json({ error: 'Dokumentasi tidak ditemukan' }, { status: 404 });
    }

    let imageUrl = existing.image;
    let imagePublicId = existing.image_public_id;

    // If new image provided, upload to Cloudinary and delete old one
    if (imageBase64) {
      // Delete old image from Cloudinary if it has a public_id
      if (existing.image_public_id) {
        try {
          await deleteImage(existing.image_public_id);
        } catch (e) {
          console.warn('Failed to delete old image:', e);
        }
      }
      const result = await uploadImage(imageBase64, 'matacare/documentation');
      imageUrl = result.url;
      imagePublicId = result.public_id;
    }

    db.prepare(`
      UPDATE documentation
      SET title = ?, category = ?, date = ?, location = ?, participants = ?,
          image = ?, image_public_id = ?, description = ?, badge = ?,
          updated_at = datetime('now')
      WHERE id = ?
    `).run(title, category, date, location, Number(participants) || 0, imageUrl, imagePublicId, description, badge, id);

    const updated = db.prepare('SELECT * FROM documentation WHERE id = ?').get(id);
    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('PUT [id] error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui data' }, { status: 500 });
  }
}

// DELETE - remove documentation
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const existing = db.prepare('SELECT * FROM documentation WHERE id = ?').get(id) as
      | { id: string; image_public_id: string | null }
      | undefined;

    if (!existing) {
      return NextResponse.json({ error: 'Dokumentasi tidak ditemukan' }, { status: 404 });
    }

    // Delete image from Cloudinary if applicable
    if (existing.image_public_id) {
      try {
        await deleteImage(existing.image_public_id);
      } catch (e) {
        console.warn('Failed to delete Cloudinary image:', e);
      }
    }

    db.prepare('DELETE FROM documentation WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE [id] error:', error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
