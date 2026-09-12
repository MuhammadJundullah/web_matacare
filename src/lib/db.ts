import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'matacare.db');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeDatabase(db);
  }
  return db;
}

function initializeDatabase(db: Database.Database) {
  // Documentation table
  db.exec(`
    CREATE TABLE IF NOT EXISTS documentation (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      category    TEXT NOT NULL,
      date        TEXT NOT NULL,
      location    TEXT NOT NULL,
      participants INTEGER NOT NULL DEFAULT 0,
      image       TEXT NOT NULL,
      image_public_id TEXT DEFAULT NULL,
      description TEXT NOT NULL,
      badge       TEXT NOT NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Admin users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      username    TEXT UNIQUE NOT NULL,
      password    TEXT NOT NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Seed default admin if none exists
  const adminCount = (db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number }).count;
  if (adminCount === 0) {
    const hashedPassword = bcrypt.hashSync('matacare2024', 10);
    db.prepare(
      "INSERT INTO admin_users (username, password) VALUES (?, ?)"
    ).run('admin', hashedPassword);
  }

  // Seed documentation from static data if table is empty
  const docCount = (db.prepare('SELECT COUNT(*) as count FROM documentation').get() as { count: number }).count;
  if (docCount === 0) {
    const seed = db.prepare(`
      INSERT INTO documentation (id, title, category, date, location, participants, image, description, badge)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    seed.run(
      'doc-1',
      'Pemeriksaan Optik Guru MIN 2 Bener Meriah.',
      'Sekolah & Kampus',
      '10 September 2026',
      'Tingkem Bersatu, Kec. Bukit, Kabupaten Bener Meriah',
      5,
      '/documentation/Min-2-BM-(2).jpeg',
      'Pemeriksaan ketajaman penglihatan digital & skrining mata lelah akibat paparan monitor bagi seluruh staff dan guru.',
      'Kunjungan Keliling'
    );

    seed.run(
      'doc-2',
      'Pemeriksaan Optik Guru MTSN 2 Bener Meriah.',
      'Sekolah & Kampus',
      '10 September 2026',
      'Janarata, Kec. Bandar, Kabupaten Bener Meriah.',
      3,
      '/documentation/mtsn-2-bm.jpeg',
      'Pemeriksaan ketajaman penglihatan digital & skrining mata lelah akibat paparan monitor bagi seluruh staff dan guru.',
      'Kunjungan Keliling'
    );
  }
}

export default getDb;
