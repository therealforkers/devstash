import { Card, CardContent } from "@/components/ui/card";
import { getRecentCollections, getCollectionTheme } from "@/lib/db/collections";
import { getDemoUser } from "@/lib/db/items";
import { Folder, MoreVertical, Code, Sparkles, Terminal, StickyNote, File, Image as ImageIcon, Link as LinkIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export async function RecentCollections() {
  const user = await getDemoUser();
  if (!user) return null;

  const collections = await getRecentCollections(user.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Collections</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
          View all
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {collections.map((collection) => {
          const theme = getCollectionTheme(collection);
          
          // Get unique type icons in this collection
          const uniqueTypes = Array.from(new Set(collection.items.map((i: any) => i.type.name)));
          
          return (
            <Card 
              key={collection.id} 
              className="group relative overflow-hidden border-none bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Decorative side bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2"
                style={{ backgroundColor: theme.color }}
              />
              
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div 
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground shadow-inner"
                    style={{ 
                      backgroundColor: `${theme.color}15`, 
                      color: theme.color 
                    }}
                  >
                    <Folder className="h-6 w-6" />
                  </div>
                  
                  <div className="flex flex-wrap gap-1 justify-end max-w-[100px]">
                    {uniqueTypes.map((typeName: any) => {
                      const item = collection.items.find((i: any) => i.type.name === typeName);
                      const Icon = iconMap[item?.type.icon || 'File'] || File;
                      return (
                        <div 
                          key={typeName} 
                          className="p-1.5 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors" 
                          title={typeName}
                        >
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center text-[11px] font-medium text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">
                      {collection.items.length} {collection.items.length === 1 ? 'item' : 'items'}
                    </span>
                    <span className="flex items-center text-[10px] text-muted-foreground gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(collection.updatedAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-2">
                      {/* Placeholder for item avatars or tiny previews if we wanted them */}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-all bg-muted hover:bg-primary hover:text-primary-foreground">
                      <MoreVertical className="h-4 w-4" />
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
