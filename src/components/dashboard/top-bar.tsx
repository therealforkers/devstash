
import React from 'react';
import { Search, Plus, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USER } from '@/lib/mock-data';

export function TopBar() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 gap-4">
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search snippets, commands, prompts..." 
          className="pl-10 bg-muted/30 border-none focus-visible:ring-1 transition-all focus-visible:bg-muted/50"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button size="sm" className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Item</span>
        </Button>
        
        <div className="h-8 w-[1px] bg-border mx-1" />
        
        <div className="flex items-center gap-3 pl-1">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-medium leading-none">{MOCK_USER.name}</span>
            <span className="text-xs text-muted-foreground">{MOCK_USER.email}</span>
          </div>
          <Avatar className="h-9 w-9 border border-border shadow-sm">
            <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
            <AvatarFallback className="bg-primary/10 text-primary">{MOCK_USER.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
