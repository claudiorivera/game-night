import "server-only";
import { BggXmlApiClient } from "bgg-xml-api-client";
import { env } from "@/env.mjs";

const client = new BggXmlApiClient(env.BGG_API_ACCESS_TOKEN);

async function gameById(id: string) {
	return client.getBggThing({
		id,
		type: "boardgame",
		stats: 1,
	});
}

async function gamesByQuery(query: string) {
	return client.getBggSearch({
		query,
		type: "boardgame",
	});
}

export const Bgg = {
	gameById,
	gamesByQuery,
};

export type GameById = Awaited<ReturnType<typeof gameById>>;
