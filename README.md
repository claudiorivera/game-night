# Game Night

A Next.js application for organizing board game nights.

## Tech Stack

- **Framework**: Next.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **API Integration**: BoardGameGeek SDK
- **State Management**: TanStack Query
- **Date Handling**: date-fns

## Prepare

### Environment variables

```bash
cp .env.example .env
```

> Note: Update values accordingly

### Database

```bash
docker compose up -d
```

> Note: This is optional but makes it convenient to spin up everything at once

### Dependencies

```bash
pnpm i
```

## Develop

```bash
pnpm dev
```

> Note: App will be live at `http://localhost:3002`
