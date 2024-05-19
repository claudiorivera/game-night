import { faker } from "@faker-js/faker";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { gameById } from "~/app/games/bgg";
import * as schema from "~/db/schema";
import { getRandomElement } from "~/lib/utils";

const NUMBER_OF_EVENTS = 4;
const NUMBER_OF_USERS = 8;
const BOARD_GAME_GEEK_GAME_IDS = [13, 2651, 266192, 9209, 365717];

export async function seed(db: LibSQLDatabase<typeof schema>) {
	console.log("🌱 Seeding...");

	console.log("Deleting users...");
	await db.delete(schema.usersTable);

	console.log("Adding games...");
	await Promise.all(
		BOARD_GAME_GEEK_GAME_IDS.map(async (bggId) => {
			const game = await gameById(bggId);

			return await db
				.insert(schema.gamesTable)
				.values(game)
				.onConflictDoUpdate({
					target: schema.gamesTable.bggId,
					set: game,
				});
		}),
	);

	const games = await db.query.gamesTable.findMany();

	console.log("Creating users...");
	const users = await db
		.insert(schema.usersTable)
		.values(
			[...Array(NUMBER_OF_USERS)].map(() => ({
				name: faker.person.fullName(),
				email: faker.internet.email(),
				image: faker.image.avatar(),
				isDemo: true,
				isAdmin: false,
			})),
		)
		.returning();

	console.log("Creating events...");
	await db.insert(schema.eventsTable).values(
		[...Array(NUMBER_OF_EVENTS)].map(() => {
			const host = getRandomElement(users);
			const game = getRandomElement(games);

			if (!host || !game) {
				throw new Error("Host or game not found");
			}

			return {
				dateTime: faker.date.recent(),
				hostId: host.id,
				gameId: game.id,
			};
		}),
	);

	console.log("✅ Done!");
}
