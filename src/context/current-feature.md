# Current Feature

Dashboard Items Integration

## Status

In Progress

## Goals

- Create `src/lib/db/items.ts` with data fetching functions. (Done)
- Fetch items directly in server component from Neon database using Prisma. (Done)
- Item card icon/border derived from the item type.
- Display item type tags and anything else currently there.
- Update collection stats display.
- Maintain existing UI design and layout.

## Description

Replace the dummy item data displayed in the main area of the dashboard (right side), with actual data from the database. This includes both pinned and recent items. It should look how it does now, but instead of using data from @src/lib/mock-data.ts, it should be from our Neon database using Prisma.

If there are no pinned items, nothing should display there.

## Notes

- For now, we will use the demo user (`demo@devstash.io`) as the context for data fetching since Auth is not yet implemented.
- References: `src/context/features/dashboard-items-spec.md`

## History

- 2026-05-08: Initialized mock data in `src/lib/mock-data.ts`.
- 2026-05-08: Completed Phase 1-3: Dashboard UI Scaffolding.
- 2026-05-08: Completed Prisma + Neon PostgreSQL Setup.
- 2026-05-08: Completed Seeding Sample Data.
- 2026-05-08: Completed Dashboard Collections Integration.
- 2026-05-08: Started Dashboard Items Integration.
