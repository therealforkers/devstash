import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Starting seeding...');

  // 1. Create Demo User
  const hashedPassword = await bcrypt.hash('12345678', 12);
  const user = await prisma.user.upsert({
    where: { email: 'demo@devstash.io' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'demo@devstash.io',
      name: 'Demo User',
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  });

  console.log(`User created: ${user.email}`);

  // 2. Create System Item Types
  const systemItemTypes = [
    { name: 'snippet', icon: 'Code', color: '#3b82f6' },
    { name: 'prompt', icon: 'Sparkles', color: '#8b5cf6' },
    { name: 'command', icon: 'Terminal', color: '#f97316' },
    { name: 'note', icon: 'StickyNote', color: '#fde047' },
    { name: 'file', icon: 'File', color: '#6b7280' },
    { name: 'image', icon: 'Image', color: '#ec4899' },
    { name: 'link', icon: 'Link', color: '#10b981' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemTypes: Record<string, any> = {};

  for (const type of systemItemTypes) {
    const createdType = await prisma.itemType.upsert({
      where: { id: type.name },
      update: { icon: type.icon, color: type.color, isSystem: true },
      create: {
        id: type.name,
        name: type.name,
        icon: type.icon,
        color: type.color,
        isSystem: true,
      },
    });
    itemTypes[type.name] = createdType;
  }

  console.log('System item types created');

  // 3. Create Collections and Items
  // Clean up existing data for the demo user to avoid duplicates if re-running
  await prisma.item.deleteMany({ where: { userId: user.id } });
  await prisma.collection.deleteMany({ where: { userId: user.id } });

  // #### React Patterns
  await prisma.collection.create({
    data: {
      name: 'React Patterns',
      description: 'Reusable React patterns and hooks',
      isFavorite: true,
      userId: user.id,
      items: {
        create: [
          {
            title: 'useDebounce Hook',
            contentType: 'text',
            content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
            language: 'typescript',
            typeId: itemTypes['snippet'].id,
            isPinned: true,
            userId: user.id,
          },
          {
            title: 'useLocalStorage Hook',
            contentType: 'text',
            content: `import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
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
            language: 'typescript',
            typeId: itemTypes['snippet'].id,
            userId: user.id,
          },
          {
            title: 'Compound Component Pattern',
            contentType: 'text',
            content: `import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.Trigger = function Trigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button 
      onClick={() => setActiveTab(value)}
      className={activeTab === value ? 'active' : ''}
    >
      {children}
    </button>
  );
};

Tabs.Content = function Content({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div>{children}</div> : null;
};`,
            language: 'typescript',
            typeId: itemTypes['snippet'].id,
            userId: user.id,
          },
        ],
      },
    },
  });

  // #### AI Workflows
  await prisma.collection.create({
    data: {
      name: 'AI Workflows',
      description: 'AI prompts and workflow automations',
      isFavorite: true,
      userId: user.id,
      items: {
        create: [
          {
            title: 'Code Review Prompt',
            contentType: 'text',
            content: 'Review the following code for potential bugs, performance issues, and adherence to clean code principles. Suggest improvements where necessary.',
            isPinned: true,
            typeId: itemTypes['prompt'].id,
            userId: user.id,
          },
          {
            title: 'Documentation Generation',
            contentType: 'text',
            content: 'Generate comprehensive TSDoc documentation for the following TypeScript functions and classes, including parameter descriptions, return types, and usage examples.',
            typeId: itemTypes['prompt'].id,
            userId: user.id,
          },
          {
            title: 'Refactoring Assistance',
            contentType: 'text',
            content: 'Refactor this code to use modern ES6+ syntax, improve readability, and reduce complexity. Ensure that the logic remains unchanged.',
            typeId: itemTypes['prompt'].id,
            userId: user.id,
          },
        ],
      },
    },
  });

  // #### DevOps
  await prisma.collection.create({
    data: {
      name: 'DevOps',
      description: 'Infrastructure and deployment resources',
      userId: user.id,
      items: {
        create: [
          {
            title: 'Docker Compose for Node.js',
            contentType: 'text',
            content: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=\${DATABASE_URL}
    depends_on:
      - db
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=password
volumes:
  postgres_data:`,
            language: 'yaml',
            typeId: itemTypes['snippet'].id,
            isPinned: true,
            userId: user.id,
          },
          {
            title: 'Deployment Script',
            contentType: 'text',
            content: '#!/bin/bash\nnpm run build\npm run migrate\npm run start',
            language: 'bash',
            typeId: itemTypes['command'].id,
            userId: user.id,
          },
          {
            title: 'Prisma Documentation',
            contentType: 'text',
            url: 'https://www.prisma.io/docs',
            typeId: itemTypes['link'].id,
            userId: user.id,
          },
          {
            title: 'Neon Documentation',
            contentType: 'text',
            url: 'https://neon.tech/docs',
            typeId: itemTypes['link'].id,
            userId: user.id,
          },
        ],
      },
    },
  });

  // #### Terminal Commands
  await prisma.collection.create({
    data: {
      name: 'Terminal Commands',
      description: 'Useful shell commands for everyday development',
      userId: user.id,
      items: {
        create: [
          {
            title: 'Git Squash Commits',
            contentType: 'text',
            content: 'git rebase -i HEAD~n',
            isPinned: true,
            typeId: itemTypes['command'].id,
            userId: user.id,
          },
          {
            title: 'Docker Prune',
            contentType: 'text',
            content: 'docker system prune -a --volumes',
            typeId: itemTypes['command'].id,
            userId: user.id,
          },
          {
            title: 'Find and Kill Process',
            contentType: 'text',
            content: 'lsof -i :3000 | awk "NR==2 {print $2}" | xargs kill -9',
            typeId: itemTypes['command'].id,
            userId: user.id,
          },
          {
            title: 'NPM Clean Install',
            contentType: 'text',
            content: 'rm -rf node_modules package-lock.json && npm install',
            typeId: itemTypes['command'].id,
            userId: user.id,
          },
        ],
      },
    },
  });

  // #### Design Resources
  await prisma.collection.create({
    data: {
      name: 'Design Resources',
      description: 'UI/UX resources and references',
      userId: user.id,
      items: {
        create: [
          {
            title: 'Tailwind CSS Colors',
            contentType: 'text',
            url: 'https://tailwindcss.com/docs/customizing-colors',
            isPinned: true,
            typeId: itemTypes['link'].id,
            userId: user.id,
          },
          {
            title: 'HeroUI Components',
            contentType: 'text',
            url: 'https://heroui.com/docs/components',
            typeId: itemTypes['link'].id,
            userId: user.id,
          },
          {
            title: 'Refactoring UI',
            contentType: 'text',
            url: 'https://www.refactoringui.com/',
            typeId: itemTypes['link'].id,
            userId: user.id,
          },
          {
            title: 'Lucide Icons',
            contentType: 'text',
            url: 'https://lucide.dev/icons',
            typeId: itemTypes['link'].id,
            userId: user.id,
          },
        ],
      },
    },
  });

  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
