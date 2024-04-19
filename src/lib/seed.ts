import { faker } from "@faker-js/faker";
import type { PrismaClient } from "@prisma/client";
import { getRandomElement } from "~/lib/utils";

const NUMBER_OF_EVENTS = 4;

export async function seed(db: PrismaClient) {
	console.log("🌱 Seeding...");

	await db.user.deleteMany();

	// get a random existing game id
	const games = await db.game.findMany();
	const gameIds = games.map((game) => game.id);

	const eventsToCreate = [...Array(NUMBER_OF_EVENTS)].map(() => ({
		dateTime: faker.date.soon({ days: 90 }),
		game: {
			connect: {
				id: getRandomElement(gameIds),
			},
		},
		host: {
			connectOrCreate: {
				where: {
					email: faker.internet.email(),
				},
				create: {
					name: faker.person.fullName(),
					image: faker.image.avatar(),
					email: faker.internet.email(),
					isAdmin: false,
					isDemo: true,
				},
			},
		},
		guests: {
			connectOrCreate: randomGuestsToCreate(),
		},
	}));

	await Promise.all(
		eventsToCreate.map((event) =>
			db.event.create({
				data: event,
			}),
		),
	);

	console.log("✅ Done!");
}

function randomGuestsToCreate() {
	return [...Array(faker.number.int({ max: 3 }))].map(() => ({
		where: {
			email: faker.internet.email(),
		},
		create: {
			name: faker.person.fullName(),
			image: faker.image.avatar(),
			email: faker.internet.email(),
			isAdmin: false,
			isDemo: true,
		},
	}));
}
