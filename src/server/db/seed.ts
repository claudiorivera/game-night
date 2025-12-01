import { faker } from "@faker-js/faker";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getRandomElement } from "@/lib/utils";
import { db } from "@/server/db";
import { eventTable, Role, user } from "@/server/db/schema";

const NUMBER_OF_EVENTS = 4;
const NUMBER_OF_USERS = 8;
const BOARD_GAME_GEEK_GAME_IDS = [13, 2651, 266192, 9209, 365717];

export async function seed() {
	console.log("Wiping database...");
	await db.delete(user);

	console.log("Creating users...");
	const users = await db
		.insert(user)
		.values(
			[...Array(NUMBER_OF_USERS)].map(() => ({
				name: faker.person.fullName(),
				email: faker.internet.email(),
				image: faker.image.avatar(),
				role: Role.demo,
			})),
		)
		.returning();

	const { user: newUser } = await auth.api.signUpEmail({
		body: {
			name: "Demo User",
			email: "demo@example.com",
			password: "password1234",
		},
	});

	await db
		.update(user)
		.set({
			role: Role.demo,
		})
		.where(eq(user.id, newUser.id));

	console.log("Deleting events...");
	await db.delete(eventTable);

	console.log("Creating events...");
	await db.insert(eventTable).values(
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
