import { faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { getRandomElement } from "~/lib/utils";
import * as schema from "~/server/db/schema";

const NUMBER_OF_EVENTS = 4;
const NUMBER_OF_USERS = 8;
const BOARD_GAME_GEEK_GAME_IDS = [13, 2651, 266192, 9209, 365717];

export async function seed(db: PostgresJsDatabase<typeof schema>) {
	console.log("🌱 Seeding...");

	console.log("Deleting users...");
	await db.delete(schema.eventGuestTable);
	await db.delete(schema.usersTable).where(eq(schema.usersTable.isDemo, true));

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
			const gameBggId = getRandomElement(BOARD_GAME_GEEK_GAME_IDS);

			if (!host || !gameBggId) {
				throw new Error("Host or game not found");
			}

			return {
				dateTime: faker.date.recent(),
				hostId: host.id,
				gameBggId,
			};
		}),
	);

	console.log("✅ Done!");
}
