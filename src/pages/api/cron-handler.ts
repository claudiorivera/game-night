import { faker } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "../../lib/prisma";

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (error, _req, res) => {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).end(error.message);
    } else {
      return res.status(500).end("Something went wrong");
    }
  },
});

// POST api/cron-handler
// Clears and seeds the database
handler.post(async (req, res) => {
  const { authorization } = req.headers;

  if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
    try {
      await wipeDatabase();

      // get a random existing game id
      const games = await prisma.game.findMany();
      const getRandomGameId = () => {
        const randomIndex = Math.floor(Math.random() * games.length);
        return games[randomIndex].id;
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
              email: faker.internet.email(),
            },
            create: {
              name: faker.name.fullName(),
              image: faker.image.avatar(),
              email: faker.internet.email(),
              isAdmin: false,
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
});

const wipeDatabase = async () => {
  await prisma.user.deleteMany();
};

const randomGuestsToCreate = () =>
  Array.from({ length: faker.datatype.number({ max: 4 }) }).map(() => ({
    where: {
      email: faker.internet.email(),
    },
    create: {
      name: faker.name.fullName(),
      image: faker.image.avatar(),
      email: faker.internet.email(),
      isAdmin: false,
    },
  }));

export default handler;
