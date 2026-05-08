import React from 'react';
import { getDemoUser } from "@/lib/db/items";
import { getItemTypes } from "@/lib/db/items";
import { getFavoriteCollections, getOtherCollections } from "@/lib/db/collections";
import { DashboardLayoutClient } from "./dashboard-layout-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getDemoUser();
  
  if (!user) {
    // In a real app, we'd redirect to login
    return null;
  }

  const [itemTypes, favoriteCollections, otherCollections] = await Promise.all([
    getItemTypes(),
    getFavoriteCollections(user.id),
    getOtherCollections(user.id),
  ]);

  return (
    <DashboardLayoutClient
      user={user}
      itemTypes={itemTypes}
      favoriteCollections={favoriteCollections}
      otherCollections={otherCollections}
    >
      {children}
    </DashboardLayoutClient>
  );
}
