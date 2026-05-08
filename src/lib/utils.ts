import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCollectionTheme(collection: any) {
  if (!collection.items || collection.items.length === 0) {
    return { color: "#6b7280", hex: "#6b7280" };
  }

  const typeCounts: Record<string, number> = {};
  collection.items.forEach((item: any) => {
    const typeName = item.type.name;
    typeCounts[typeName] = (typeCounts[typeName] || 0) + 1;
  });

  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const mostUsedType = sortedTypes[0][0];
  const itemWithMostUsedType = collection.items.find((i: any) => i.type.name === mostUsedType);

  return {
    color: itemWithMostUsedType?.type.color || "#6b7280",
    name: mostUsedType,
    icon: itemWithMostUsedType?.type.icon,
  };
}
