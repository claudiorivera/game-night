// Interfaces with the BoardGameGeek API2 and returns a list of games from a query
// by calling the bggFetchGameById function for each result
import axios from "axios";
import { z } from "zod";

import { bggFetchGameById } from "./bggFetchGameById";
import { xmlParser } from "./xmlParser";

const API_CALL_LIMIT = 10;

const gameResultSchema = z.object({
  id: z.number(),
  type: z.literal("boardgame"),
  name: z.object({
    type: z.enum(["primary", "alternate"]),
    value: z.string(),
  }),
  yearpublished: z
    .object({
      value: z.number(),
    })
    .nullish(),
});

const itemSchema = z.array(gameResultSchema).or(gameResultSchema);

const parsedDataSchema = z.object({
  "?xml": z.object({
    encoding: z.string(),
    version: z.number(),
  }),
  items: z.object({
    termsofuse: z.string(),
    total: z.number(),
    item: itemSchema.nullish(),
  }),
});

// https://boardgamegeek.com/wiki/page/BGG_XML_API2
const buildUrlForGameQuery = (query: string) => {
  const url = new URL("https://api.geekdo.com/xmlapi2/search");

  url.searchParams.append("query", query);
  url.searchParams.append("type", "boardgame");

  return url.toString();
};

export const bggFetchGamesByQuery = async (query: string) => {
  const url = buildUrlForGameQuery(query);

  const { data: xml } = await axios.get(url);

  const parsedData = xmlParser.parse(xml);

  const validData = parsedDataSchema.parse(parsedData);

  const gameList = validData.items.item;

  if (!gameList) return [];

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
