import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export default sql;

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS documentation (
      id              TEXT PRIMARY KEY,
      title           TEXT NOT NULL,
      category        TEXT NOT NULL,
      date            TEXT NOT NULL,
      location        TEXT NOT NULL,
      participants    INTEGER NOT NULL DEFAULT 0,
      image           TEXT NOT NULL,
      image_public_id TEXT DEFAULT NULL,
      description     TEXT NOT NULL,
      badge           TEXT NOT NULL,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id          SERIAL PRIMARY KEY,
      username    TEXT UNIQUE NOT NULL,
      password    TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  const [{ count: adminCount }] = await sql`SELECT COUNT(*) as count FROM admin_users`;
  if (Number(adminCount) === 0) {
    const hashed = bcrypt.hashSync('matacare2024', 10);
    await sql`INSERT INTO admin_users (username, password) VALUES ('admin', ${hashed})`;
  }

  const [{ count: docCount }] = await sql`SELECT COUNT(*) as count FROM documentation`;
  if (Number(docCount) === 0) {
    await sql`
      INSERT INTO documentation (id, title, category, date, location, participants, image, description, badge) VALUES
        ('doc-1', 'Pemeriksaan Optik Guru MIN 2 Bener Meriah.', 'Sekolah & Kampus',
         '10 September 2026', 'Tingkem Bersatu, Kec. Bukit, Kabupaten Bener Meriah', 5,
         '/documentation/Min-2-BM-(2).jpeg',
         'Pemeriksaan ketajaman penglihatan digital & skrining mata lelah akibat paparan monitor bagi seluruh staff dan guru.',
         'Kunjungan Keliling'),
        ('doc-2', 'Pemeriksaan Optik Guru MTSN 2 Bener Meriah.', 'Sekolah & Kampus',
         '10 September 2026', 'Janarata, Kec. Bandar, Kabupaten Bener Meriah.', 3,
         '/documentation/mtsn-2-bm.jpeg',
         'Pemeriksaan ketajaman penglihatan digital & skrining mata lelah akibat paparan monitor bagi seluruh staff dan guru.',
         'Kunjungan Keliling')
    `;
  }
}
