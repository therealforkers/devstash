
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_COLLECTIONS } from "@/lib/mock-data";
import { Folder, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecentCollections() {
  // Show all for now since we only have 4 in mock data
  const collections = MOCK_COLLECTIONS;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Collections</h2>
        <Button variant="ghost" size="sm">View all</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="group relative overflow-hidden border-none bg-card shadow-sm transition-all hover:shadow-md cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Folder className="h-5 w-5" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3">
                <h3 className="font-medium truncate">{collection.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {collection.itemCount} items
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
