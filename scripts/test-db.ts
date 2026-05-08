import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is missing');

  console.log('Testing connection to Neon via standard pg adapter...');

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log('Executing query...');
    const result = await prisma.user.count();
    console.log('Success! User count:', result);
  } catch (err) {
    console.error('Query failed:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
