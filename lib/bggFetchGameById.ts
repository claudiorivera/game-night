// Interfaces with the BoardGameGeek API2 and returns a custom game object
import axios from "axios";
import { z } from "zod";

import { xmlParser } from "./xmlParser";

const numberValueSchema = z.object({ value: z.number() });

const nameSchema = z.object({
  type: z.enum(["primary", "alternate"]),
  sortindex: z.number(),
  value: z.string(),
});

const metaDataSchema = z.object({
  type: z.enum([
    "boardgamecategory",
    "boardgamemechanic",
    "boardgamefamily",
    "boardgameexpansion",
    "boardgamedesigner",
    "boardgameartist",
    "boardgamepublisher",
    "boardgameimplementation",
  ]),
  id: z.number(),
  value: z.string(),
});

const rankSchema = z.object({
  type: z.string(),
  id: z.number(),
  name: z.string(),
  friendlyname: z.string(),
  value: z.string().or(z.number()),
  bayesaverage: z.number().or(z.string()),
});

const pollResultsSchema = z
  .object({
    numplayers: z.string().or(z.number()).nullish(),
    result: z
      .array(
        z.object({
          value: z.number().or(z.string()),
          numvotes: z.number(),
        })
      )
      .nullish(),
  })
  .nullish();

const parsedXmlSchema = z.object({
  "?xml": z.object({ version: z.number(), encoding: z.string() }),
  items: z.object({
    item: z.object({
      thumbnail: z.string().url().nullish(),
      image: z.string().url().nullish(),
      name: nameSchema.or(z.array(nameSchema)),
      description: z.string(),
      yearpublished: numberValueSchema,
      minplayers: numberValueSchema,
      maxplayers: numberValueSchema,
      poll: z.array(
        z.object({
          name: z.string(),
          title: z.string(),
          totalvotes: z.number(),
          results: z.array(pollResultsSchema).or(pollResultsSchema),
        })
      ),
      playingtime: numberValueSchema,
      minplaytime: numberValueSchema,
      maxplaytime: numberValueSchema,
      minage: numberValueSchema,
      link: z.array(metaDataSchema),
      statistics: z.object({
        ratings: z.object({
          usersrated: numberValueSchema,
          average: numberValueSchema,
          bayesaverage: numberValueSchema,
          ranks: z.object({
            rank: z.array(rankSchema).or(rankSchema),
          }),
          stddev: numberValueSchema,
          median: numberValueSchema,
          owned: numberValueSchema,
          trading: numberValueSchema,
          wanting: numberValueSchema,
          wishing: numberValueSchema,
          numcomments: numberValueSchema,
          numweights: numberValueSchema,
          averageweight: numberValueSchema,
        }),
        page: z.number(),
      }),
      type: z.enum(["boardgame", "boardgameexpansion"]),
      id: z.number(),
    }),
    termsofuse: z.string(),
  }),
});

// https://boardgamegeek.com/wiki/page/BGG_XML_API2
const buildUrlForGameId = (id: number) => {
  const url = new URL("https://api.geekdo.com/xmlapi2/thing");

  url.searchParams.append("id", String(id));
  url.searchParams.append("stats", String(1));

  return url.toString();
};

const getNameForGame = (game: Game) => {
  // If there's alternate names, `game.name` will be an array
  if (!Array.isArray(game.name)) return game.name.value;

  return (
    game.name.find((nameResponse) => nameResponse.type === "primary")?.value ??
    `Game ${game.id}`
  );
};

export const bggFetchGameById = async (id: number) => {
  const url = buildUrlForGameId(id);

  const { data: xml } = await axios.get(url);

  const parsedData = xmlParser.parse(xml);

  const validData = parsedXmlSchema.parse(parsedData);

  const game = validData.items.item;

  const response = {
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
    name: getNameForGame(game),
    ...parseMetaData(game.link),
  };

  return response;
};

type MetaData = Record<"categories" | "mechanics" | "authors", Array<string>>;

const parseMetaData = (linkField: Game["link"]) => {
  const obj: MetaData = linkField.reduce(
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

  console.log(obj);

  return obj;
};

type Game = z.infer<typeof parsedXmlSchema>["items"]["item"];
export type BGGGameResponse = Awaited<ReturnType<typeof bggFetchGameById>>;
