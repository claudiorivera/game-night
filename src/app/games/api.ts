import { db } from "~/db";

export async function getAll() {
	return db.query.gamesTable.findMany();
}

type AllGames = Awaited<ReturnType<typeof getAll>>;
export type Game = AllGames[number];
