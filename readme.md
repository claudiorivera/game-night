# game-night

An full-stack web application that lets you create and join board game nights.

Uses the [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2) to pull game info, using [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) to [parse the XML](https://github.com/claudiorivera/game-night/tree/master/client/src/lib) into some custom JSON.

# Technologies Used

- React
- [Next.js](https://nextjs.org)
- Material-UI
- MongoDB
- [SWR](https://swr.vercel.app)
- [NextAuth.js](https://next-auth.js.org) for GitHub OAuth
- [Moment](https://momentjs.com)
- [Fast XML Parser](https://github.com/NaturalIntelligence/fast-xml-parser)
- [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2)

# New in This Version

- Log in with "magic link" via email (random image and name assigned when using Email to login)
- Remove unimplemented Profile page until we're ready to implement

# Future Improvement Ideas

- Allow users to update name and profile pic
- Move old events into a "past events" section on the dashboard and events page.
- Implement the game search into the event creation process.
- Add Facebook login.
- More confirmation dialogs, and improve the toasts. 🍞
- Improve overall design and styles. 💅🏼

# Install

`yarn`

# Config

Add a `.env.local` file with environmental variables as shown in the example `.example.env.local` file.

# Dev

`yarn dev`

# Known Bugs

- The Board Game Geek API [has an issue](https://boardgamegeek.com/wiki/page/XML_API_Enhancements#) where the game descriptions output escaped character sequences instead of the characters.
