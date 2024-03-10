import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { db } from "~/server/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { authorization } = req.headers;

	if (authorization === `Bearer ${env.API_SECRET_KEY}`) {
		try {
			await db.profile.deleteMany({
				where: {
					isAdmin: false,
				},
			});

			const games = await db.game.findMany();

			const eventsToCreate = [...Array<unknown>(6)].map(() => ({
				dateTime: faker.date.soon({
					days: 90,
				}),
				game: {
					connect: {
						id: faker.helpers.arrayElement(games).id,
					},
				},
				host: {
					create: {
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
						avatarUrl: faker.image.avatar(),
						isAdmin: false,
						isDemo: true,
					},
				},
				guests: {
					create: [...Array<unknown>(faker.number.int({ max: 4 }))].map(() => ({
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
						avatarUrl: faker.image.avatar(),
						isAdmin: false,
						isDemo: true,
					})),
				},
			}));

			await Promise.allSettled(
				eventsToCreate.map((event) =>
					db.event.create({
						data: event,
					}),
				),
			);

			return res.status(200).end("Database cleared and seeded");
		} catch (error) {
			console.error(error);
			throw error;
		}
	} else {
		return res.status(401).end();
	}
}
