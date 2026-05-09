import { prisma } from "@/lib/prisma";

export async function getRecentCollections(userId: string, limit = 6) {
  return prisma.collection.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          type: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: limit,
  });
}

export async function getCollectionStats(userId: string) {
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { totalCollections, favoriteCollections };
}

export async function getFavoriteCollections(userId: string) {
  return prisma.collection.findMany({
    where: { userId, isFavorite: true },
    include: {
      items: { include: { type: true } }
    },
    orderBy: { updatedAt: 'desc' }
  });
}

export async function getOtherCollections(userId: string, limit = 5) {
  return prisma.collection.findMany({
    where: { userId, isFavorite: false },
    include: {
      items: { include: { type: true } }
    },
    orderBy: { updatedAt: 'desc' },
    take: limit
  });
}
