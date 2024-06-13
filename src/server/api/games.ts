import { db } from "~/server/db";

async function getAll() {
	return db.query.gamesTable.findMany();
}

export const Games = {
	getAll,
};
