import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { authorization } = req.headers;

	if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
		await wipeDatabase();

		// get a random existing game id
		const games = await db.game.findMany();
		const getRandomGameId = () => {
			const randomIndex = Math.floor(Math.random() * games.length);
			return games[randomIndex]?.id;
		};

		const eventsToCreate = Array.from({
			length: 6,
		}).map(() => ({
			dateTime: faker.date.soon({ days: 90 }),
			game: {
				connect: {
					id: getRandomGameId(),
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

		for (const event of eventsToCreate) {
			await db.event.create({
				data: event,
			});
		}

		return res.status(200).end("Database cleared and seeded");
	}

	return res.status(401).end();
}

const wipeDatabase = async () => {
	await db.user.deleteMany();
};

const randomGuestsToCreate = () =>
	Array.from({ length: faker.number.int({ max: 4 }) }).map(() => ({
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
