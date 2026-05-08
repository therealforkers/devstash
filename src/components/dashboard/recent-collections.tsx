import { Card, CardContent } from "@/components/ui/card";
import { getRecentCollections, getCollectionTheme } from "@/lib/db/collections";
import { getDemoUser } from "@/lib/db/items";
import { Folder, MoreVertical, Code, Sparkles, Terminal, StickyNote, File, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, any> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

export async function RecentCollections() {
  const user = await getDemoUser();
  if (!user) return null;

  const collections = await getRecentCollections(user.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Collections</h2>
        <Button variant="ghost" size="sm">View all</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {collections.map((collection) => {
          const theme = getCollectionTheme(collection);
          
          // Get unique type icons in this collection
          const uniqueTypes = Array.from(new Set(collection.items.map((i: any) => i.type.name)));
          
          return (
            <Card 
              key={collection.id} 
              className="group relative overflow-hidden border-l-4 bg-card shadow-sm transition-all hover:shadow-md cursor-pointer"
              style={{ borderLeftColor: theme.color }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Folder className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1">
                    {uniqueTypes.slice(0, 3).map((typeName: any) => {
                      const item = collection.items.find((i: any) => i.type.name === typeName);
                      const Icon = iconMap[item?.type.icon || 'File'] || File;
                      return (
                        <div key={typeName} className="p-1 rounded bg-muted/50" title={typeName}>
                          <Icon className="h-3 w-3 text-muted-foreground" />
                        </div>
                      );
                    })}
                    {uniqueTypes.length > 3 && (
                      <div className="text-[10px] text-muted-foreground flex items-center">+{uniqueTypes.length - 3}</div>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-medium truncate">{collection.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {collection.items.length} items
                    </p>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
