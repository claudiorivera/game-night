// Interfaces with the BoardGameGeek API2 and returns a list of games from a query
// by calling the bggFetchGameById function for each result
import axios from "axios";
import parser from "fast-xml-parser";
import { bggFetchGameById } from "./bggFetchGameById";

const API_CALL_LIMIT = 20;

export const bggFetchGamesByQuery = async (query: string) => {
  const { data } = await axios.get(
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2
    `https://api.geekdo.com/xmlapi2/search?query=${query}&type=boardgame`
  );

  // https://github.com/NaturalIntelligence/fast-xml-parser
  // Make sure we have parseable data
  if (parser.validate(data) === true) {
    const parsedData = parser.parse(data, {
      attributeNamePrefix: "",
      ignoreAttributes: false,
      parseAttributeValue: true,
    });

    const gameList = parsedData.items.item;

    // Async calls can't be inside a .map() - https://flaviocopes.com/javascript-async-await-array-map/
    const results = [];
    if (Array.isArray(gameList)) {
      // Limit the number of calls to the BGG API, so it doesn't yell at us
      for (const game of gameList.slice(0, API_CALL_LIMIT)) {
        results.push(await bggFetchGameById(game.id));
      }
    } else {
      results.push(await bggFetchGameById(gameList.id));
    }

    return results;
  } else {
    return [];
  }
};
