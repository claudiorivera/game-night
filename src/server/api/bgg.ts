import { bgg } from "bgg-sdk";
import { parseGameLinks } from "~/lib/parse-game-links";

async function gameById(id: string) {
	try {
		const { items } = await bgg.thing({
			id: [id],
			stats: true,
			type: ["boardgame"],
		});

		const game = items.at(0);

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
	return bgg.search({
		query,
		type: ["boardgame"],
	});
}

export const Bgg = {
	gameById,
	gamesByQuery,
};

export type GameById = Awaited<ReturnType<typeof gameById>>;
