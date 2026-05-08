
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ITEMS, MOCK_COLLECTIONS } from "@/lib/mock-data";
import { Layers, FileText, Heart, FolderHeart } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "Total Items",
      value: MOCK_ITEMS.length,
      icon: FileText,
      description: "Stored snippets and notes",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Collections",
      value: MOCK_COLLECTIONS.length,
      icon: Layers,
      description: "Organized categories",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Favorite Items",
      value: MOCK_ITEMS.filter((i) => i.isFavorite).length,
      icon: Heart,
      description: "Saved for quick access",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Favorite Collections",
      value: MOCK_COLLECTIONS.filter((c) => c.isFavorite).length,
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
