"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { TopBar } from '@/components/dashboard/top-bar';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  user: any;
  itemTypes: any[];
  favoriteCollections: any[];
  otherCollections: any[];
}

export function DashboardLayoutClient({
  children,
  user,
  itemTypes,
  favoriteCollections,
  otherCollections,
}: DashboardLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <Sidebar 
        user={user}
        itemTypes={itemTypes}
        favoriteCollections={favoriteCollections}
        otherCollections={otherCollections}
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
        className="hidden md:flex"
      />
      
      {/* Mobile Drawer (using Sheet) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 border-none">
          <Sidebar 
            user={user}
            itemTypes={itemTypes}
            favoriteCollections={favoriteCollections}
            otherCollections={otherCollections}
            className="w-full h-full border-none" 
            onToggle={() => setIsMobileOpen(false)} 
          />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TopBar */}
        <TopBar onMenuClick={() => setIsMobileOpen(true)} user={user} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
