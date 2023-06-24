import axios from "axios";
import { type z } from "zod";

import { buildUrl, xmlParser } from "~/lib/bggUtils";
import { parsedBggGameSchema } from "~/lib/validationSchemas";

export const fetchBggGameById = async (id: number) => {
	const url = buildUrlForGameId(id);

	const { data: xml } = await axios.get<string>(url);

	const parsedData = xmlParser.parse(xml) as unknown;

	const validation = parsedBggGameSchema.safeParse(parsedData);

	if (!validation.success) return;

	const game = validation.data.items.item;

	const parsedGame = {
		bggId: game.id,
		imageSrc: game.image,
		thumbnailSrc: game.thumbnail,
		description: game.description,
		yearPublished: game.yearpublished,
		minPlayers: game.minplayers,
		maxPlayers: game.maxplayers,
		playingTime: game.playingtime,
		minAge: game.minage,
		rating: game.statistics.ratings.average,
		numOfRatings: game.statistics.ratings.usersrated,
		name: game.name,
		...parseMetaData(game.link),
	};

	return parsedGame;
};

const buildUrlForGameId = (id: number) =>
	buildUrl("https://api.geekdo.com/xmlapi2/thing", [
		{
			id,
			stats: 1,
		},
	]);

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
		} as MetaData,
	);

	return metaData;
};

type Game = z.infer<typeof parsedBggGameSchema>["items"]["item"];

export type BGGGameResponse = Awaited<ReturnType<typeof fetchBggGameById>>;
