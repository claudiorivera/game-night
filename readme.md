# game-night

An application that lets you create and join board game nights.

Uses the [BoardGameGeek API2](https://boardgamegeek.com/wiki/page/BGG_XML_API2) on the Admin side to pull game info. I also used [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) to [parse the XML](https://github.com/claudiorivera/game-night/tree/master/client/src/lib) into some custom JSON.

# Future Improvements

I would like to make the "add game" option available to anyone hosting an event. Currently, only admins can add games. The reason for this limitation is that some queries return too many results if they're not specific enough, and my parser chokes. On that note, I'd like to implement an admin console for deleting users and granting admin rights.

I would also like to add more confirmation dialogs. Right now, deleting profiles, events, and games is done immediately on click.

# Install

`yarn && yarn run client-install`

# Config

Add a `.env` file with a `DB_URI` value for a MongoDB connection string, as well as a `SECRET` for `express-session`. See `.sample-env`.

# Dev

`yarn run dev`

# Known Bugs

The Board Game Geek API [has an issue](https://boardgamegeek.com/wiki/page/XML_API_Enhancements#) where the game descriptions output escaped character sequences instead of the characters.
