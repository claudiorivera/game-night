# game-night

An full-stack web application that lets you create and join board game nights.

Uses the [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2) to pull game info, using [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) to [parse the XML](https://github.com/claudiorivera/game-night/tree/master/client/src/lib) into some custom JSON.

# Technologies Used

- React
- [Next.js](https://nextjs.org)
- [Material-UI](https://mui.com)
- Postgres
- [Prisma](https://www.prisma.io/)
- [SWR](https://swr.vercel.app)
- [NextAuth.js](https://next-auth.js.org)
- [Moment](https://momentjs.com)
- [Fast XML Parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2)

# Install

`pnpm i`

# Config

Add a `.env.local` file with environmental variables as shown in the example `.example.env.local` file.

# Dev

`pnpm dev`

# Future Improvement Ideas

- Allow users to update name and profile pic
- Move old events into a "past events" section on the dashboard and events page.
- Implement the game search into the event creation process.
- Add Facebook login.
- More confirmation dialogs, and improve the toasts. 🍞
- Improve overall design and styles. 💅🏼

# Known Bugs

- The Board Game Geek API [has an issue](https://boardgamegeek.com/wiki/page/XML_API_Enhancements#) where the game descriptions output escaped character sequences instead of the characters.
