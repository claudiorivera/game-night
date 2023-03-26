import axios from "axios";
import { z } from "zod";

import { parsedBggGameSchema } from "./validationSchemas";
import { xmlParser } from "./xmlParser";

export const fetchBggGameById = async (id: number) => {
  const url = buildUrlForGameId(id);

  const { data: xml } = await axios.get(url);

  const parsedData = xmlParser.parse(xml);

  const validation = parsedBggGameSchema.safeParse(parsedData);

  if (!validation.success) return;

  const { item: game } = validation.data.items;

  const parsedGame = {
    bggId: game.id,
    imageSrc: game.image,
    thumbnailSrc: game.thumbnail,
    description: game.description,
    yearPublished: game.yearpublished.value,
    minPlayers: game.minplayers.value,
    maxPlayers: game.maxplayers.value,
    playingTime: game.playingtime.value,
    minAge: game.minage.value,
    rating: game.statistics.ratings.average.value,
    numOfRatings: game.statistics.ratings.usersrated.value,
    name: parseGameName(game.name),
    ...parseMetaData(game.link),
  };

  return parsedGame;
};

// https://boardgamegeek.com/wiki/page/BGG_XML_API2
const buildUrlForGameId = (id: number) => {
  const url = new URL("https://api.geekdo.com/xmlapi2/thing");

  url.searchParams.append("id", String(id));
  url.searchParams.append("stats", String(1));

  return url.toString();
};

// If there's alternate names, `game.name` will be an array
// Otherwise, it will be just the object with the `value` we want
const parseGameName = (gameName: Game["name"]) => {
  if (!Array.isArray(gameName)) return gameName.value;

  return (
    gameName.find((nameResponse) => nameResponse.type === "primary")?.value ??
    `${gameName}`
  );
};

type MetaData = Record<"categories" | "mechanics" | "authors", Array<string>>;

const parseMetaData = (linkField: Game["link"]) => {
  const metaData = linkField.reduce(
    (acc, cur) => {
      switch (cur.type) {
        case "boardgamecategory":
          return {
            ...acc,
            categories: [...acc.categories, cur.value],
          };

        case "boardgamemechanic":
          return {
            ...acc,
            mechanics: [...acc.mechanics, cur.value],
          };

        case "boardgamedesigner":
          return {
            ...acc,
            authors: [...acc.authors, cur.value],
          };

        default:
          return acc;
      }
    },
    {
      categories: [],
      mechanics: [],
      authors: [],
    } as MetaData
  );

  return metaData;
};

type Game = z.infer<typeof parsedBggGameSchema>["items"]["item"];

export type BGGGameResponse = Awaited<ReturnType<typeof fetchBggGameById>>;
