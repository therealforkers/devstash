import { getRecentItems, getDemoUser } from "@/lib/db/items";
import { Code, Sparkles, StickyNote, Terminal, File, Image as ImageIcon, Link as LinkIcon, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const iconMap: Record<string, any> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

export async function RecentItems() {
  const user = await getDemoUser();
  if (!user) return null;

  const recentItems = await getRecentItems(user.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Items</h2>
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {recentItems.map((item) => {
            const Icon = iconMap[item.type.icon || 'File'] || File;
            
            return (
              <div key={item.id} className="group flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-background transition-colors">
                    <Icon className="h-5 w-5" style={{ color: item.type.color || undefined }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{item.title}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </span>
                      <span>•</span>
                      <span>{item.type.name}</span>
                      {item.collection && (
                        <>
                          <span>•</span>
                          <span className="truncate">{item.collection.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="hidden sm:flex gap-1">
                    {item.tags.slice(0, 2).map((itemTag) => (
                      <Badge key={itemTag.tagId} variant="outline" className="text-[10px] py-0">
                        {itemTag.tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
