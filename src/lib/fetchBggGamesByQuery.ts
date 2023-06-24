import axios from "axios";

import { buildUrl, xmlParser } from "~/lib/bggUtils";
import { type BGGGameResponse,fetchBggGameById } from "~/lib/fetchBggGameById";
import { parsedBggQueryResultsSchema } from "~/lib/validationSchemas";

const API_CALL_LIMIT = 10;

export const fetchBggGamesByQuery = async (query: string) => {
	const url = buildUrlForGameQuery(query);

	const { data: xml } = await axios.get<string>(url);

	const parsedData = xmlParser.parse(xml) as unknown;

	const validation = parsedBggQueryResultsSchema.safeParse(parsedData);

	if (!validation.success) return [];

	const gamesList = validation.data.items.item;

	const results: Array<BGGGameResponse> = [];

	for (const game of gamesList.slice(0, API_CALL_LIMIT)) {
		await fetchGameByIdAndPushToResults({
			id: game.id,
			results,
		});
	}

	return results;
};

type FetchGameByIdAndPushToResults = {
	id: number;
	results: Array<unknown>;
};
const fetchGameByIdAndPushToResults = async ({
	id,
	results,
}: FetchGameByIdAndPushToResults) => {
	const bggGame = await fetchBggGameById(id);

	if (bggGame) results.push(bggGame);
};

// https://boardgamegeek.com/wiki/page/BGG_XML_API2
const buildUrlForGameQuery = (query: string) =>
	buildUrl("https://api.geekdo.com/xmlapi2/search", [
		{ query },
		{ type: "boardgame" },
	]);
