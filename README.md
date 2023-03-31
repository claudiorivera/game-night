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

# Install

`pnpm i`

# Config

Add a `.env` file with environmental variables as shown in the example `.env.example` file.

# Dev

`pnpm dev`

# Future Improvement Ideas

- Allow users to update name and profile pic
- Move old events into a "past events" section on the dashboard and events page.
- Implement the game search into the event creation process.
- Add Facebook login.

# Known Bugs

- The Board Game Geek API [has an issue](https://boardgamegeek.com/wiki/page/XML_API_Enhancements#) where the game descriptions output escaped character sequences instead of the characters.
