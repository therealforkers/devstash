import { Collection as PrismaCollection, Item as PrismaItem, ItemType as PrismaItemType } from '@prisma/client';

export type ItemType = PrismaItemType;

export type User = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  isPro: boolean;
};

export type Item = PrismaItem & {
  type: ItemType;
  collection: PrismaCollection | null;
};

export type Collection = PrismaCollection & {
  items: (PrismaItem & { type: PrismaItemType })[];
};
