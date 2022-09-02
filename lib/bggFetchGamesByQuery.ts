// Interfaces with the BoardGameGeek API2 and returns a list of games from a query
// by calling the bggFetchGameById function for each result
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

import { bggFetchGameById } from "./bggFetchGameById";

const API_CALL_LIMIT = 10;

export const bggFetchGamesByQuery = async (query: string) => {
  const { data } = await axios.get<string>(
    // https://boardgamegeek.com/wiki/page/BGG_XML_API2
    `https://api.geekdo.com/xmlapi2/search?query=${query}&type=boardgame`
  );

  const parser = new XMLParser({
    attributeNamePrefix: "",
    ignoreAttributes: false,
    parseAttributeValue: true,
  });

  const parsedData = parser.parse(data);

  const gameList = parsedData.items.item;

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
};
