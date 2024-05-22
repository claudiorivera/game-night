import { db } from "~/db";

export async function getAll() {
	return db.query.gamesTable.findMany();
}

export type AllGames = Awaited<ReturnType<typeof getAll>>;
export type Game = AllGames[number];
