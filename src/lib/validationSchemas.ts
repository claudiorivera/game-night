import { z } from "zod";

const numberValueSchema = z.object({ value: z.number() });

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

export const parsedBggQueryResultsSchema = z.object({
	items: z.object({
		item: z
			.array(gameResultSchema)
			.or(gameResultSchema)
			.transform((data) => {
				if (Array.isArray(data)) return data;

				return [data];
			}),
	}),
});

export const parsedBggGameSchema = z.object({
	items: z.object({
		item: z.object({
			id: z.number(),
			image: z.string().url(),
			thumbnail: z.string().url(),
			name: nameSchema
				.or(z.array(nameSchema))
				.transform((data) => {
					if (Array.isArray(data)) return data;

					return [data];
				})
				.transform((data) => {
					const nameData = data[0];

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
			link: z.array(metaDataSchema),
		}),
	}),
});
