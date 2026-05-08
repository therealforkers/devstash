
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Clock, 
  Settings, 
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ITEM_TYPES, 
  MOCK_COLLECTIONS, 
  MOCK_USER 
} from '@/lib/mock-data';

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ className, isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  
  const favoriteCollections = MOCK_COLLECTIONS.filter(c => c.isFavorite);
  const otherCollections = MOCK_COLLECTIONS.filter(c => !c.isFavorite);

  return (
    <aside className={cn(
      "bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out relative z-30",
      isCollapsed ? "w-[70px]" : "w-64",
      className
    )}>
      {/* Toggle Button (Desktop only) */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onToggle}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card z-40 shadow-sm hover:bg-muted hidden md:flex"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Brand */}
      <div className={cn(
        "h-16 flex items-center px-4 mb-2 shrink-0",
        isCollapsed ? "justify-center" : "justify-start gap-3"
      )}>
        <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
          <span className="text-primary-foreground font-bold text-xl">D</span>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight leading-none">DevStash</span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-1">Knowledge Hub</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-6 py-4 no-scrollbar">
        {/* Main Nav */}
        <nav className="space-y-1">
          <SidebarItem 
            href="/dashboard" 
            icon={<LayoutDashboard className="h-4 w-4" />} 
            label="Dashboard" 
            isActive={pathname === '/dashboard'}
            isCollapsed={isCollapsed}
          />
        </nav>

        {/* Item Types */}
        <div>
          {!isCollapsed && <h3 className="px-3 text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-3">Library</h3>}
          <nav className="space-y-1">
            {ITEM_TYPES.map((type) => {
              const IconComponent = (LucideIcons as any)[type.icon];
              return (
                <SidebarItem 
                  key={type.id}
                  href={`/items/${type.name.toLowerCase()}`}
                  label={type.name}
                  icon={IconComponent ? <IconComponent className="h-4 w-4" /> : null}
                  isCollapsed={isCollapsed}
                  color={type.color}
                />
              );
            })}
          </nav>
        </div>

        {/* Favorite Collections */}
        {favoriteCollections.length > 0 && (
          <div>
            {!isCollapsed && (
              <div className="flex items-center justify-between px-3 mb-3">
                <h3 className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">Favorites</h3>
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              </div>
            )}
            <nav className="space-y-1">
              {favoriteCollections.map((col) => (
                <SidebarItem 
                  key={col.id}
                  href={`/collections/${col.id}`}
                  label={col.name}
                  icon={<div className="h-2 w-2 rounded-full bg-primary" />}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          </div>
        )}

        {/* Other Collections */}
        {!isCollapsed && (
          <div>
            <div className="flex items-center justify-between px-3 mb-3">
              <h3 className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">Collections</h3>
              <Clock className="h-3 w-3 text-muted-foreground" />
            </div>
            <nav className="space-y-1">
              {otherCollections.map((col) => (
                <SidebarItem 
                  key={col.id}
                  href={`/collections/${col.id}`}
                  label={col.name}
                  icon={<div className="h-2 w-2 rounded-full bg-muted-foreground/30" />}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* User Area */}
      <div className={cn(
        "mt-auto p-4 border-t border-border bg-muted/10 backdrop-blur-sm shrink-0",
        isCollapsed ? "flex flex-col items-center gap-4" : ""
      )}>
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed ? "justify-center" : ""
        )}>
          <Avatar className="h-10 w-10 border-2 border-background shadow-md">
            <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">{MOCK_USER.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-none truncate">{MOCK_USER.name}</p>
              <p className="text-[11px] text-muted-foreground truncate mt-1.5 flex items-center gap-1.5">
                {MOCK_USER.isPro && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider">PRO</span>
                )}
                {MOCK_USER.email}
              </p>
            </div>
          )}
          {!isCollapsed && (
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full">
               <Settings className="h-4 w-4" />
             </Button>
          )}
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ 
  href, 
  icon, 
  label, 
  isActive, 
  isCollapsed,
  color
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  isActive?: boolean; 
  isCollapsed?: boolean;
  color?: string;
}) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all group relative",
        isActive 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        isCollapsed ? "justify-center" : ""
      )}
    >
      {icon ? (
        <span className={cn("shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground transition-colors")}>
          {icon}
        </span>
      ) : color ? (
        <div className="h-2.5 w-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: color }} />
      ) : (
        <div className="h-4 w-4 shrink-0" />
      )}
      
      {!isCollapsed && <span className="truncate">{label}</span>}
      
      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-popover text-popover-foreground text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 shadow-xl border border-border whitespace-nowrap translate-x-[-10px] group-hover:translate-x-0">
          {label}
        </div>
      )}
    </Link>
  );
}
