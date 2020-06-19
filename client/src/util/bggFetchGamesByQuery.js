// Interfaces with the BoardGameGeek API2 and returns a list of games from a query
// by calling the bggFetchGameById function for each result
import { bggFetchGameById } from "./bggFetchGameById";
const axios = require("axios").default;
const parser = require("fast-xml-parser");

export const bggFetchGamesByQuery = async (query) => {
  const { data } = await axios.get(
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2
    `https://api.geekdo.com/xmlapi2/search?query=${query}&type=boardgame`
  );

  // https://github.com/NaturalIntelligence/fast-xml-parser
  // Make sure we have parseable data
  if (parser.validate(data) === true) {
    const {
      items: { item },
    } = parser.parse(data, {
      attributeNamePrefix: "",
      ignoreAttributes: false,
      parseAttributeValue: true,
    });

    // Async calls can't be inside a .map() - https://flaviocopes.com/javascript-async-await-array-map/
    const results = [];
    if (Array.isArray(item)) {
      for (const game of item) {
        results.push(await bggFetchGameById(game.id));
      }
    } else {
      results.push(await bggFetchGameById(item.id));
    }

    return results;
  } else {
    // Return an array of one item with bggId of 0, so the front end doesn't get angry
    return [
      {
        bggId: 0,
      },
    ];
  }
};
