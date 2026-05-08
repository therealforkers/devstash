# Current Feature

Prisma + Neon PostgreSQL Setup

## Status

In Progress

## Goals

- Set up Prisma ORM with Neon PostgreSQL database (serverless).
- Create initial schema based on data models in project-overview.md.
- Include NextAuth models (Account, Session, VerificationToken).
- Add appropriate indexes and cascade deletes.

## Notes

- We will have a development branch that we work on that will be in DATABASE_URL and then we will have a production branch. So we ALWAYS create migrations and never push directly unless specified.
- IMPORTANT! Use Prisma 7, which has some breaking changes. Read the entire upgrade guide at https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7 to get a good idea of the changes.
- Setup guide reference - https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- Reference: `@context/features/database-spec.md`

## History

- 2026-05-08: Initialized mock data in `src/lib/mock-data.ts`.
- 2026-05-08: Completed Phase 1: Dashboard UI Layout.
- 2026-05-08: Completed Phase 2: Sidebar & Navigation.
- 2026-05-08: Completed Phase 3: Main Dashboard Content.
- 2026-05-08: Started Prisma + Neon PostgreSQL Setup.
