import { createPool, sql } from '@vercel/postgres';

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not defined');
}

const pool = createPool({
  connectionString: process.env.POSTGRES_URL
});

export { sql };

export async function testConnection() {
  try {
    const result = await sql`SELECT NOW();`;
    console.log('Database connection successful:', result);
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}