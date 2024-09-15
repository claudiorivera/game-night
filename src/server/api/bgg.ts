import { BggClient } from "boardgamegeekclient";
import { parseGameLinks } from "~/lib/parse-game-links";

const bggApiClient = BggClient.Create();

async function gameById(id: number) {
	try {
		const [game] = await bggApiClient.thing.query({
			id,
			stats: 1,
			type: "boardgame",
		});

		if (!game) {
			throw new Error(`Error fetching game with id ${id}`);
		}

		const parsedGameLinks = parseGameLinks(game.links);

		return {
			...game,
			...parsedGameLinks,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function gamesByQuery(query: string) {
	return bggApiClient.search.query({
		query,
		type: "boardgame",
	});
}

export const Bgg = {
	gameById,
	gamesByQuery,
};

export type GameById = Awaited<ReturnType<typeof gameById>>;
