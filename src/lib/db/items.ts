import { prisma } from "@/lib/prisma";

export async function getDemoUser() {
  return prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });
}

export async function getPinnedItems(userId: string) {
  return prisma.item.findMany({
    where: {
      userId,
      isPinned: true,
    },
    include: {
      type: true,
      collection: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getRecentItems(userId: string, limit = 10) {
  return prisma.item.findMany({
    where: {
      userId,
    },
    include: {
      type: true,
      collection: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}

export async function getItemStats(userId: string) {
  const [totalItems, favoriteItems] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);

  return { totalItems, favoriteItems };
}
