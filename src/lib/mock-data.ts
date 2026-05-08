
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPro: boolean;
}

export interface ItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  isFavorite: boolean;
  itemCount?: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  title: string;
  content?: string;
  contentType: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  url?: string;
  description?: string;
  isFavorite: boolean;
  isPinned: boolean;
  language?: string;
  typeId: string;
  collectionId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const ITEM_TYPES: ItemType[] = [
  { id: 'type-snippet', name: 'Snippet', icon: 'Code', color: '#3b82f6', isSystem: true },
  { id: 'type-prompt', name: 'Prompt', icon: 'MessageSquare', color: '#a855f7', isSystem: true },
  { id: 'type-note', name: 'Note', icon: 'FileText', color: '#eab308', isSystem: true },
  { id: 'type-command', name: 'Command', icon: 'Terminal', color: '#22c55e', isSystem: true },
  { id: 'type-file', name: 'File', icon: 'File', color: '#64748b', isSystem: true },
  { id: 'type-image', name: 'Image', icon: 'Image', color: '#ec4899', isSystem: true },
  { id: 'type-url', name: 'URL', icon: 'Link', color: '#06b6d4', isSystem: true },
];

export const MOCK_USER: User = {
  id: 'user-1',
  email: 'hello@johndoe.com',
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  isPro: true,
};

export const MOCK_COLLECTIONS: Collection[] = [
  { id: 'col-1', name: 'React Patterns', description: 'Reusable React components and hooks', isFavorite: true, itemCount: 12 },
  { id: 'col-2', name: 'AI Prompts', description: 'Collection of effective AI prompts', isFavorite: false, itemCount: 5 },
  { id: 'col-3', name: 'Shell Commands', description: 'Daily terminal shortcuts', isFavorite: true, itemCount: 8 },
  { id: 'col-4', name: 'Project Ideas', description: 'Random thoughts for future apps', isFavorite: false, itemCount: 3 },
];

export const MOCK_TAGS: Tag[] = [
  { id: 'tag-1', name: 'react' },
  { id: 'tag-2', name: 'typescript' },
  { id: 'tag-3', name: 'tailwind' },
  { id: 'tag-4', name: 'nextjs' },
  { id: 'tag-5', name: 'python' },
  { id: 'tag-6', name: 'ai' },
  { id: 'tag-7', name: 'productivity' },
];

export const MOCK_ITEMS: Item[] = [
  {
    id: 'item-1',
    title: 'React useLocalStorage Hook',
    content: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
    contentType: 'text',
    language: 'typescript',
    isFavorite: true,
    isPinned: true,
    typeId: 'type-snippet',
    collectionId: 'col-1',
    tags: ['react', 'typescript'],
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 'item-2',
    title: 'System Design Interview Prompt',
    content: 'Act as a senior software architect. Explain how you would design a global rate limiting service for a high-traffic API.',
    contentType: 'text',
    isFavorite: false,
    isPinned: false,
    typeId: 'type-prompt',
    collectionId: 'col-2',
    tags: ['ai', 'interview'],
    createdAt: '2024-03-21T14:30:00Z',
    updatedAt: '2024-03-21T14:30:00Z',
  },
  {
    id: 'item-3',
    title: 'Git Cherry-Pick Command',
    content: 'git cherry-pick <commit-hash>',
    description: 'Apply the changes introduced by some existing commits',
    contentType: 'text',
    isFavorite: true,
    isPinned: false,
    typeId: 'type-command',
    collectionId: 'col-3',
    tags: ['git'],
    createdAt: '2024-03-22T09:15:00Z',
    updatedAt: '2024-03-22T09:15:00Z',
  },
  {
    id: 'item-4',
    title: 'Next.js 15 Documentation',
    url: 'https://nextjs.org/docs',
    description: 'Official documentation for Next.js 15 features and changes.',
    contentType: 'text',
    isFavorite: true,
    isPinned: true,
    typeId: 'type-url',
    tags: ['nextjs', 'docs'],
    createdAt: '2024-03-23T11:00:00Z',
    updatedAt: '2024-03-23T11:00:00Z',
  },
  {
    id: 'item-5',
    title: 'Deployment Strategy Note',
    content: 'We should consider blue-green deployment for the new microservices architecture to minimize downtime.',
    contentType: 'text',
    isFavorite: false,
    isPinned: false,
    typeId: 'type-note',
    collectionId: 'col-4',
    tags: ['devops'],
    createdAt: '2024-03-24T16:45:00Z',
    updatedAt: '2024-03-24T16:45:00Z',
  },
  {
    id: 'item-6',
    title: 'Tailwind V4 Config Example',
    content: `@theme {
  --color-primary: #3b82f6;
  --color-secondary: #a855f7;
}`,
    contentType: 'text',
    language: 'css',
    isFavorite: true,
    isPinned: false,
    typeId: 'type-snippet',
    tags: ['tailwind', 'css'],
    createdAt: '2024-03-25T08:00:00Z',
    updatedAt: '2024-03-25T08:00:00Z',
  },
  {
    id: 'item-7',
    title: 'Docker Build Command',
    content: 'docker build -t devstash-app .',
    contentType: 'text',
    isFavorite: false,
    isPinned: false,
    typeId: 'type-command',
    collectionId: 'col-3',
    tags: ['docker'],
    createdAt: '2024-03-26T12:30:00Z',
    updatedAt: '2024-03-26T12:30:00Z',
  },
  {
    id: 'item-8',
    title: 'Lucide Icons Library',
    url: 'https://lucide.dev/icons',
    description: 'Beautiful & consistent icons for the web.',
    contentType: 'text',
    isFavorite: false,
    isPinned: false,
    typeId: 'type-url',
    tags: ['icons', 'ui'],
    createdAt: '2024-03-27T15:00:00Z',
    updatedAt: '2024-03-27T15:00:00Z',
  },
];
