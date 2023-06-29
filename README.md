# game-night

An full-stack web application that lets you create and join board game nights.

Uses the [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2) to pull game info, using [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) to [parse the XML](https://github.com/claudiorivera/game-night/tree/master/client/src/lib) into some custom JSON.

# Technologies Used

- React
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Headless UI](https://headlessui.dev)
- [daisyUI](https://daisyui.com)
- [Postgres](https://www.postgresql.org)
- [tRPC](https://trpc.io)
- [Zod](https://zod.dev)
- [Prisma](https://www.prisma.io/)
- [Clerk](https://clerk.com)
- [dayjs](https://day.js.org)
- [Fast XML Parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2)

# Prerequisites

- [pnpm](https://pnpm.io)

# Install

`pnpm i`

# Prepare

- `cp .env.example .env` and update values

# Develop

`pnpm dev`
