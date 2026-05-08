import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getItemStats, getDemoUser } from "@/lib/db/items";
import { getCollectionStats } from "@/lib/db/collections";
import { Layers, FileText, Heart, FolderHeart } from "lucide-react";

export async function StatsCards() {
  const user = await getDemoUser();
  
  if (!user) {
    return null;
  }

  const [itemStats, collectionStats] = await Promise.all([
    getItemStats(user.id),
    getCollectionStats(user.id),
  ]);

  const stats = [
    {
      title: "Total Items",
      value: itemStats.totalItems,
      icon: FileText,
      description: "Stored snippets and notes",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Collections",
      value: collectionStats.totalCollections,
      icon: Layers,
      description: "Organized categories",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Favorite Items",
      value: itemStats.favoriteItems,
      icon: Heart,
      description: "Saved for quick access",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Favorite Collections",
      value: collectionStats.favoriteCollections,
      icon: FolderHeart,
      description: "Top priority groups",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden border-none bg-card shadow-md transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
