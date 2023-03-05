# game-night

An full-stack web application that lets you create and join board game nights.

Uses the [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2) to pull game info, using [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) to [parse the XML](https://github.com/claudiorivera/game-night/tree/master/client/src/lib) into some custom JSON.

# Technologies Used

- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [Material-UI](https://mui.com)
- [Postgres](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io)
- [NextAuth.js](https://next-auth.js.org)
- [Day.js](https://dayjs.org)
- [Fast XML Parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2)

# Install

`pnpm i`

# Config

Add a `.env.local` file with environmental variables as shown in the example `.example.env.local` file.

# Dev

`pnpm dev`

# Known Bugs

- The Board Game Geek API [has an issue](https://boardgamegeek.com/wiki/page/XML_API_Enhancements#) where the game descriptions output escaped character sequences instead of the characters.
