# game-night

An application that lets you create and join board game nights.

Uses the [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2) on the Admin side to pull game info. I also used [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) to [parse the XML](https://github.com/claudiorivera/game-night/tree/master/client/src/lib) into some custom JSON.

# Technologies Used

- React
- [Next.js](https://nextjs.org)
- Serverless API Routes
- Material-UI
- MongoDB
- [SWR](https://swr.vercel.app)
- [NextAuth.js](https://next-auth.js.org)
- [Moment](https://momentjs.com)
- [Fast XML Parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2)

# Future Improvements

- More progress indicators, particularly on the Add Game search.
- Move old events into a "past events" section.
- Implement the game search into the event creation process.
- Add more signin providers.
- More confirmation dialogs, and improve the toasts. 🍞
- Improve overall design and styles.

# Install

`yarn`

# Config

Add a `.env.local` file with environmental variables as shown in the example `.sample-env.local` file.

# Dev

`yarn dev`

# Known Bugs

- The Board Game Geek API [has an issue](https://boardgamegeek.com/wiki/page/XML_API_Enhancements#) where the game descriptions output escaped character sequences instead of the characters.
