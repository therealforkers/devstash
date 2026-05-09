import { getRecentItems, getDemoUser } from "@/lib/db/items";
import { Code, Sparkles, StickyNote, Terminal, File, Image as ImageIcon, Link as LinkIcon, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

import * as LucideIcons from "lucide-react";

const iconMap: Record<string, LucideIcons.LucideIcon> = {
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
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="divide-y divide-border/50">
          {recentItems.map((item) => {
            const Icon = iconMap[item.type.icon || 'File'] || File;
            const typeColor = item.type.color || "#6b7280";
            
            return (
              <div key={item.id} className="group flex items-center justify-between p-4 hover:bg-muted/30 transition-all cursor-pointer">
                <div className="flex items-center gap-4 min-w-0">
                  <div 
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-105 group-hover:shadow-inner"
                    style={{ backgroundColor: `${typeColor}10` }}
                  >
                    <Icon className="h-5 w-5 transition-colors" style={{ color: typeColor }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-1">
                      <span className="flex items-center gap-1 font-medium bg-muted/50 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                        {item.type.name}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </span>
                      {item.collection && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-[80px] hover:text-primary transition-colors">
                            {item.collection.name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="hidden sm:flex gap-1.5">
                    {item.tags.slice(0, 2).map((itemTag) => (
                      <Badge 
                        key={itemTag.tagId} 
                        variant="outline" 
                        className="text-[9px] py-0 border-border/50 bg-muted/20 font-normal"
                      >
                        {itemTag.tag.name}
                      </Badge>
                    ))}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
