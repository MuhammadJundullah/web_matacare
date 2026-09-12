import { NextRequest, NextResponse } from 'next/server';
import sql, { initializeDatabase } from '@/lib/db';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    const [doc] = await sql`SELECT * FROM documentation WHERE id = ${id}`;
    if (!doc) return NextResponse.json({ error: 'Dokumentasi tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ data: doc });
  } catch (error) {
    console.error('GET [id] error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    const body = await req.json();
    const { title, category, date, location, participants, imageBase64, description, badge } = body;

    const [existing] = await sql`SELECT * FROM documentation WHERE id = ${id}`;
    if (!existing) return NextResponse.json({ error: 'Dokumentasi tidak ditemukan' }, { status: 404 });

    let imageUrl: string = existing.image as string;
    let imagePublicId: string | null = existing.image_public_id as string | null;

    if (imageBase64) {
      if (imagePublicId) {
        try { await deleteImage(imagePublicId); } catch (e) { console.warn('Failed to delete old image:', e); }
      }
      const result = await uploadImage(imageBase64, 'matacare/documentation');
      imageUrl = result.url;
      imagePublicId = result.public_id;
    }

    const [updated] = await sql`
      UPDATE documentation
      SET title=${title}, category=${category}, date=${date}, location=${location},
          participants=${Number(participants) || 0}, image=${imageUrl}, image_public_id=${imagePublicId},
          description=${description}, badge=${badge}, updated_at=NOW()
      WHERE id=${id} RETURNING *
    `;

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('PUT [id] error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui data' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initializeDatabase();
    const { id } = await params;
    const [existing] = await sql`SELECT * FROM documentation WHERE id = ${id}`;
    if (!existing) return NextResponse.json({ error: 'Dokumentasi tidak ditemukan' }, { status: 404 });

    if (existing.image_public_id) {
      try { await deleteImage(existing.image_public_id as string); } catch (e) { console.warn('Failed to delete Cloudinary image:', e); }
    }

    await sql`DELETE FROM documentation WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE [id] error:', error);
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
