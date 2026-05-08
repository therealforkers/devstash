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

/**
 * Derived logic for collection card border color based on most-used content type
 */
export function getCollectionTheme(collection: any) {
  if (!collection.items || collection.items.length === 0) {
    return { color: "gray", hex: "#6b7280" };
  }

  const typeCounts: Record<string, number> = {};
  collection.items.forEach((item: any) => {
    const typeName = item.type.name;
    typeCounts[typeName] = (typeCounts[typeName] || 0) + 1;
  });

  const mostUsedType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0];
  const itemWithMostUsedType = collection.items.find((i: any) => i.type.name === mostUsedType);

  return {
    color: itemWithMostUsedType?.type.color || "#6b7280",
    name: mostUsedType,
    icon: itemWithMostUsedType?.type.icon,
  };
}
