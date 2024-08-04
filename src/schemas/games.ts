import { z } from "zod";

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
		imageSrc: data.items.item.image ?? "/game-night-logo.png",
		thumbnailSrc: data.items.item.thumbnail ?? "/game-night-logo.png",
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

function parseSpecialCharacters(str: string) {
	return str
		.replace(/&#10;/g, "\n")
		.replace(/&nbsp;/g, " ")
		.replace(/&mdash;/, "—")
		.replace(/&auml;/g, "ä")
		.replace(/&#226;/g, "â")
		.replace(/&#128;/g, "€")
		.replace(/&#147;/g, "“")
		.replace(/&amp;/g, "&")
		.replace(/&uuml;/g, "ü")
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&rsquo;/g, "’")
		.replace(/&ldquo;/g, "“")
		.replace(/&rdquo;/g, "”")
		.replace(/&bull;/g, "•")
		.replace(/&laquo;/g, "«")
		.replace(/&raquo;/g, "»")
		.replace(/&hellip;/g, "…")
		.replace(/&mu;/g, "μ")
		.replace(/&#207;/g, "Ï")
		.replace(/&#140;/g, "Œ")
		.replace(/&nu;/g, "ν")
		.replace(/&omicron;/g, "ο")
		.replace(/&sigmaf;/g, "ς")
		.replace(/&pi;/g, "π")
		.replace(/&omega;/g, "ω")
		.replace(/&lambda;/g, "λ")
		.replace(/&epsilon;/g, "ε")
		.replace(/&#225;/g, "á")
		.replace(/&#191;/g, "¿")
		.replace(/&#150;/g, "–")
		.replace(/&eacute;/g, "é")
		.replace(/&ndash;/g, "–");
}
