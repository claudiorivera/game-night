// Interfaces with the BoardGameGeek API2 and returns a custom game object
import axios from "axios";
import { BGGQueryResponse } from "types";
import { z } from "zod";

import { xmlParser } from "./xmlParser";

const numberValueSchema = z.object({ value: z.number() });

const nameSchema = z.object({
  type: z.enum(["primary", "alternate"]),
  sortindex: z.number(),
  value: z.string(),
});

const linkSchema = z.object({
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
  name: z.enum(["boardgame", "strategygames", "familygames"]),
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

const schema = z.object({
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
      link: z.array(linkSchema),
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

export const bggFetchGameById = async (id: number) => {
  console.log("hello?");
  const url = buildUrlForGameId(id);

  const { data: xml } = await axios.get(url);

  const parsedData = xmlParser.parse(xml);

  console.log({ parsedData });

  const validData = schema.parse(parsedData);

  const game = validData.items.item;

  // Clean up the api data and set our new game object
  const gameObject = {
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
    // Ignore all alternate names, if there are multiple (ie. isArray)
    name: Array.isArray(game.name)
      ? game.name.filter(
          (nameResponse: BGGQueryResponse) => nameResponse.type === "primary"
        )[0].value
      : game.name.value,
    // Get all the deeper nested "link" properties - There's probably a more efficient way to do this
    // without having to parse the link array multiple times
    authors: game.link
      .filter((element: BGGQueryResponse) => {
        return element.type === "boardgamedesigner";
      })
      .map((designer: BGGQueryResponse) => designer.value),
    categories: game.link
      .filter(
        (element: BGGQueryResponse) => element.type === "boardgamecategory"
      )
      .map((category: BGGQueryResponse) => category.value),
    mechanics: game.link
      .filter(
        (element: BGGQueryResponse) => element.type === "boardgamemechanic"
      )
      .map((mechanic: BGGQueryResponse) => mechanic.value),
  };

  return gameObject;
};
