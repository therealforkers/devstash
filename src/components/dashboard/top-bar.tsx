
import React from 'react';
import { Search, Plus, Bell, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';

interface TopBarProps {
  onMenuClick?: () => void;
  user: User;
}


export function TopBar({ onMenuClick, user }: TopBarProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 gap-4">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden h-9 w-9 rounded-full hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search snippets, commands, prompts..."
            className="pl-10 bg-muted/30 border-none focus-visible:ring-1 transition-all focus-visible:bg-muted/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-muted-foreground hidden sm:flex">
          <Bell className="h-4 w-4" />
        </Button>

        <Button size="sm" className="gap-2 shadow-sm rounded-lg h-9">
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">New Item</span>
        </Button>

        <div className="h-8 w-px bg-border mx-1 hidden md:block" />

        <div className="flex items-center gap-3 pl-1">
          <Avatar className="h-9 w-9 border border-border shadow-sm">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary">{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
