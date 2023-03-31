import { faker } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { authorization } = req.headers;

	if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
		try {
			await wipeDatabase();

			// get a random existing game id
			const games = await prisma.game.findMany();
			const getRandomGameId = () => {
				const randomIndex = Math.floor(Math.random() * games.length);
				return games[randomIndex]?.id;
			};

			const eventsToCreate = Array.from({
				length: 6,
			}).map(() => ({
				dateTime: faker.date.soon(90),
				game: {
					connect: {
						id: getRandomGameId(),
					},
				},
				host: {
					connectOrCreate: {
						where: {
							id: faker.datatype.uuid(),
						},
						create: {
							clerkId: faker.datatype.uuid(),
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
				await prisma.event.create({
					data: event,
				});
			}

			return res.status(200).end("Database cleared and seeded");
		} catch (error) {
			throw error;
		}
	} else {
		return res.status(401).end();
	}
};

const wipeDatabase = async () => {
	await prisma.profile.deleteMany();
};

const randomGuestsToCreate = () =>
	Array.from({ length: faker.datatype.number({ max: 4 }) }).map(() => ({
		where: {
			id: faker.datatype.uuid(),
		},
		create: {
			clerkId: faker.datatype.uuid(),
			isAdmin: false,
			isDemo: true,
		},
	}));

export default handler;
