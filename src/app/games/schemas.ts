import { z } from "zod";
import { parseSpecialCharacters } from "~/lib/parse-special-characters";

export const importGameFormSchema = z.object({
	name: z.string().min(1),
	imageSrc: z.string().url(),
	thumbnailSrc: z.string().url(),
	description: z.string().min(1),
	authors: z.array(z.string().min(1)),
	categories: z.array(z.string().min(1)),
	mechanics: z.array(z.string().min(1)),
	bggId: z.coerce.number(),
	yearPublished: z.coerce.number(),
	minPlayers: z.coerce.number(),
	maxPlayers: z.coerce.number(),
	playingTime: z.coerce.number(),
	minAge: z.coerce.number(),
	rating: z.coerce.number(),
	numOfRatings: z.coerce.number(),
});

const numberValueSchema = z
	.object({ value: z.number() })
	.transform((data) => data.value);

const nameSchema = z.object({
	type: z.string(),
	sortindex: z.number(),
	value: z.string(),
});

const metaDataSchema = z.object({
	type: z.string(),
	value: z.string(),
});

const gameResultSchema = z.object({
	id: z.number(),
});

export const parsedBggQueryResultsSchema = z
	.object({
		items: z.object({
			item: z
				.array(gameResultSchema)
				.or(gameResultSchema)
				.optional()
				.transform((data) => {
					if (!data) return [];

					if (Array.isArray(data)) return data;

					return [data];
				}),
		}),
	})
	.transform((data) => data.items.item);

type MetaData = Record<"categories" | "mechanics" | "authors", Array<string>>;

export const parsedBggGameSchema = z
	.object({
		items: z.object({
			item: z.object({
				id: z.number(),
				image: z.string().url().optional(),
				thumbnail: z.string().url().optional(),
				name: nameSchema
					.or(z.array(nameSchema))
					.transform((data) => {
						if (Array.isArray(data)) return data;

						return [data];
					})
					.transform((data) => {
						const nameData = data.at(0);

						if (nameData?.type === "primary") return nameData.value;

						return "[Name unavailable]";
					}),
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
				link: z.array(metaDataSchema).transform((data) => {
					const metaData = data.reduce<MetaData>(
						(acc, cur) => {
							switch (cur.type) {
								case "boardgamecategory":
									acc.categories = [...acc.categories, cur.value];
									break;
								case "boardgamemechanic":
									acc.mechanics = [...acc.mechanics, cur.value];
									break;
								case "boardgamedesigner":
									acc.authors = [
										...acc.authors,
										parseSpecialCharacters(cur.value),
									];
							}

							return acc;
						},
						{
							categories: [],
							mechanics: [],
							authors: [],
						} as MetaData,
					);

					return metaData;
				}),
			}),
		}),
	})
	.transform((data) => ({
		bggId: data.items.item.id,
		imageSrc: data.items.item.image,
		thumbnailSrc: data.items.item.thumbnail,
		description: parseSpecialCharacters(data.items.item.description),
		yearPublished: data.items.item.yearpublished,
		minPlayers: data.items.item.minplayers,
		maxPlayers: data.items.item.maxplayers,
		playingTime: data.items.item.playingtime,
		minAge: data.items.item.minage,
		rating: data.items.item.statistics.ratings.average,
		numOfRatings: data.items.item.statistics.ratings.usersrated,
		name: parseSpecialCharacters(data.items.item.name),
		categories: data.items.item.link.categories,
		mechanics: data.items.item.link.mechanics,
		authors: data.items.item.link.authors,
	}));
