
import React from 'react';

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold">D</span>
        </div>
        <span className="font-bold text-xl tracking-tight">DevStash</span>
      </div>
      
      <div className="flex-1">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Sidebar</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-full bg-muted/50 rounded animate-pulse" />
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-border">
         <div className="h-10 w-full bg-muted/30 rounded-lg flex items-center px-3">
           <div className="h-4 w-1/2 bg-muted/50 rounded" />
         </div>
      </div>
    </aside>
  );
}
