import axios from "axios";

import { fetchBggGameById } from "./fetchBggGameById";
import { parsedBggQueryResultsSchema } from "./validationSchemas";
import { xmlParser } from "./xmlParser";

const API_CALL_LIMIT = 10;

export const fetchBggGamesByQuery = async (query: string) => {
  const url = buildUrlForGameQuery(query);

  const { data: xml } = await axios.get(url);

  const parsedData = xmlParser.parse(xml);

  const validation = parsedBggQueryResultsSchema.safeParse(parsedData);

  if (!validation.success) return [];

  const { item: gameList } = validation.data.items;

  const results = [];

  if (Array.isArray(gameList)) {
    // Limit the number of calls to the BGG API, so it doesn't yell at us
    for (const game of gameList.slice(0, API_CALL_LIMIT)) {
      const bggGame = await fetchBggGameById(game.id);

      if (bggGame) results.push(bggGame);
    }
  } else {
    const bggGame = await fetchBggGameById(gameList.id);

    if (bggGame) results.push(bggGame);
  }

  return results;
};

// https://boardgamegeek.com/wiki/page/BGG_XML_API2
const buildUrlForGameQuery = (query: string) => {
  const url = new URL("https://api.geekdo.com/xmlapi2/search");

  url.searchParams.append("query", query);
  url.searchParams.append("type", "boardgame");

  return url.toString();
};
