import { Card, CardContent } from "@/components/ui/card";
import { getPinnedItems, getDemoUser } from "@/lib/db/items";
import { Pin, Code, Sparkles, StickyNote, Terminal, File, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, any> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

export async function PinnedItems() {
  const user = await getDemoUser();
  if (!user) return null;

  const pinnedItems = await getPinnedItems(user.id);

  if (pinnedItems.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Pin className="h-4 w-4 text-primary fill-primary" />
        <h2 className="text-xl font-semibold tracking-tight">Pinned Items</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {pinnedItems.map((item) => {
          const Icon = iconMap[item.type.icon || 'File'] || File;

          return (
            <Card key={item.id} className="group overflow-hidden border-none bg-card shadow-sm transition-all hover:shadow-md cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-muted">
                        <Icon className="h-4 w-4" style={{ color: item.type.color || undefined }} />
                      </div>
                      <h3 className="font-medium truncate">{item.title}</h3>
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {item.tags.slice(0, 2).map((itemTag) => (
                      <Badge key={itemTag.tagId} variant="secondary" className="text-[10px] px-1.5 h-4">
                        {itemTag.tag.name}
                      </Badge>
                    ))}
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
