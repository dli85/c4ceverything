import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let _db;

export default async function getDB() {
  if (_db == null) {
    const conn = await open({
      filename: './urls.db',
      driver: sqlite3.Database,
    });
    _db = conn;
    await _db.run(
      'CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, original TEXT);'
    );
  }
  return _db;
}

export async function shortenUrl(url: string): Promise<string> {
  const db = await getDB();

  const result = await db.run('INSERT INTO url (original) VALUES (?)', url);
  const id = result.lastID || (result.changes ? result.changes.lastID : null);
  if (!id) {
    throw new Error('Failed to insert URL into the database.');
  }

  const short = `http://localhost:3333/s/${id}`;

  return short;
}

export async function lookupUrl(shortenedId: number) {
  const db = await getDB();

  const result = await db.get(
    'SELECT original FROM url WHERE id = (?)',
    shortenedId
  );

  if (!result) {
    throw new Error('URL not found');
  }

  console.log(result);
  return result.original;
}