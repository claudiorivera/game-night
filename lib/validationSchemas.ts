import { z } from "zod";

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
  value: z.string(),
});

const gameResultSchema = z.object({
  id: z.number(),
});

const itemSchema = z.array(gameResultSchema).or(gameResultSchema);

export const parsedBggQueryResultsSchema = z.object({
  items: z.object({
    item: itemSchema,
  }),
});

export const parsedBggGameSchema = z.object({
  items: z.object({
    item: z.object({
      id: z.number(),
      image: z.string().url(),
      thumbnail: z.string().url(),
      name: nameSchema.or(z.array(nameSchema)),
      description: z.string(),
      yearpublished: numberValueSchema,
      minplayers: numberValueSchema,
      maxplayers: numberValueSchema,
      minplaytime: numberValueSchema,
      maxplaytime: numberValueSchema,
      playingtime: numberValueSchema,
      minage: numberValueSchema,
      statistics: z.object({
        ratings: z.object({
          usersrated: numberValueSchema,
          average: numberValueSchema,
        }),
      }),
      link: z.array(metaDataSchema),
    }),
  }),
});
