import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import {
	parsedBggGameSchema,
	parsedBggQueryResultsSchema,
} from "~/schemas/games";

const API_CALL_LIMIT = 20;

const xmlParser = new XMLParser({
	attributeNamePrefix: "",
	ignoreAttributes: false,
	parseAttributeValue: true,
});

function gameById(id: number) {
	return fetchBggGameById(id);
}

async function gamesByQuery(query: string) {
	const games = await fetchBggIdsByQuery(query);

	return Promise.all(
		games.slice(0, API_CALL_LIMIT).map((game) => fetchBggGameById(game.id)),
	);
}

export const Bgg = {
	gameById,
	gamesByQuery,
};

function buildUrlForGameId(id: number) {
	return buildUrl("https://api.geekdo.com/xmlapi2/thing", [
		{
			id,
			stats: 1,
		},
	]);
}

function buildUrlForGameQuery(query: string) {
	return buildUrl("https://api.geekdo.com/xmlapi2/search", [
		{ query },
		{ type: "boardgame" },
	]);
}

async function fetchBggGameById(id: number) {
	const url = buildUrlForGameId(id);

	const response = await bggFetch(url);

	return parsedBggGameSchema.parse(response);
}

async function fetchBggIdsByQuery(query: string) {
	const url = buildUrlForGameQuery(query);

	const response = await bggFetch(url);

	return parsedBggQueryResultsSchema.parse(response);
}

async function bggFetch(url: string) {
	const { data: xml } = await axios.get<string>(url);

	return xmlParser.parse(xml);
}

function buildUrl(url: string, queries: Array<Record<string, unknown>>) {
	const _url = new URL(url);

	for (const query of queries) {
		for (const [key, value] of Object.entries(query)) {
			_url.searchParams.append(key, String(value));
		}
	}

	return _url.toString();
}
