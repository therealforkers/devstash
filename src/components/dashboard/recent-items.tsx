
import { MOCK_ITEMS, ITEM_TYPES } from "@/lib/mock-data";
import { Code, MessageSquare, FileText, Terminal, File, Image as ImageIcon, Link as LinkIcon, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const iconMap: Record<string, any> = {
  Code,
  MessageSquare,
  FileText,
  Terminal,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

export function RecentItems() {
  const recentItems = [...MOCK_ITEMS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Items</h2>
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {recentItems.map((item) => {
            const type = ITEM_TYPES.find((t) => t.id === item.typeId);
            const Icon = type ? iconMap[type.icon] || FileText : FileText;
            
            return (
              <div key={item.id} className="group flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-background transition-colors">
                    <Icon className="h-5 w-5" style={{ color: type?.color }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{item.title}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </span>
                      <span>•</span>
                      <span>{type?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="hidden sm:flex gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] py-0">
                        {tag}
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
