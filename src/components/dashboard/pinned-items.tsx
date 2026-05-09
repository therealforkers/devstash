import { Card, CardContent } from "@/components/ui/card";
import { getPinnedItems, getDemoUser } from "@/lib/db/items";
import { Pin, Code, Sparkles, StickyNote, Terminal, File, Image as ImageIcon, Link as LinkIcon, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const iconMap: Record<string, React.ElementType> = {
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
          const typeColor = item.type.color || "#6b7280";

          return (
            <Card 
              key={item.id} 
              className="group relative overflow-hidden border-none bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              {/* Type Accent Side Bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 transition-all group-hover:w-1.5"
                style={{ backgroundColor: typeColor }}
              />
              
              <CardContent className="p-4 pl-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div 
                        className="p-1.5 rounded-lg transition-colors group-hover:bg-opacity-20"
                        style={{ backgroundColor: `${typeColor}15` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: typeColor }} />
                      </div>
                      <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    
                    {item.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="flex items-center text-[10px] text-muted-foreground gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
                      </span>
                      {item.collection && (
                        <span className="text-[10px] text-primary bg-primary/5 px-1.5 py-0.5 rounded-full truncate max-w-[100px]">
                          {item.collection.name}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 justify-end mt-1">
                    {item.tags.slice(0, 2).map((itemTag) => (
                      <Badge 
                        key={itemTag.tagId} 
                        variant="secondary" 
                        className="text-[9px] px-1.5 h-4 font-normal bg-muted/50 text-muted-foreground"
                      >
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
