import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is missing');

  console.log('--- Database Verification Script ---');
  console.log('Connecting to Neon PostgreSQL...');

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // 1. Check User
    console.log('\nChecking for demo user...');
    const user = await prisma.user.findUnique({
      where: { email: 'demo@devstash.io' },
      include: {
        _count: {
          select: {
            items: true,
            collections: true,
          }
        }
      }
    });

    if (!user) {
      console.log('❌ Demo user not found. Please run "npx prisma db seed" first.');
      return;
    }

    console.log('✅ Demo user found:', user.email);
    console.log(`   - Collections: ${user._count.collections}`);
    console.log(`   - Total Items: ${user._count.items}`);

    // 2. Check System Item Types
    console.log('\nChecking system item types...');
    const types = await prisma.itemType.findMany({
      where: { isSystem: true }
    });
    console.log(`✅ Found ${types.length} system item types:`, types.map(t => t.name).join(', '));

    // 3. Check Collections
    console.log('\nFetching recent collections...');
    const collections = await prisma.collection.findMany({
      where: { userId: user.id },
      include: {
        _count: {
          select: { items: true }
        }
      },
      take: 5,
      orderBy: { updatedAt: 'desc' }
    });

    collections.forEach(col => {
      console.log(`   - [${col.name}] (${col._count.items} items)`);
    });

    // 4. Check Items
    console.log('\nFetching recent items...');
    const items = await prisma.item.findMany({
      where: { userId: user.id },
      include: {
        type: true,
        collection: true,
        tags: {
          include: { tag: true }
        }
      },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    items.forEach(item => {
      const tags = item.tags.map(it => it.tag.name).join(', ');
      console.log(`   - [${item.type.name.toUpperCase()}] ${item.title}`);
      if (item.collection) console.log(`     Collection: ${item.collection.name}`);
      if (tags) console.log(`     Tags: ${tags}`);
    });

    console.log('\n--- Verification Successful! ---');
  } catch (err) {
    console.error('\n❌ Verification failed:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
