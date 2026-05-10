# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- **Dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm run start`
- **Lint**: `npm run lint`

**IMPORTANT:** Do not add Claude to any commit messages

## Neon Database

- Project: `devstash` (ID: `red-dream-27967744`)
- **Always use the development branch** (`br-sparkling-glitter-aqgkdgrt`) for all database operations
- Production branch (`br-weathered-paper-aqp03rvk`) is OFF LIMITS unless explicitly requested
- When running queries, migrations, or any database operations, always pass the development branch ID

## MCP Servers

All MCP servers (Neon, Context7, Playwright) are configured in the project-level **`.mcp.json`** file. Agents should refer to that file for tool capabilities and connection details.
