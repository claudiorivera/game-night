import { NextApiRequest, NextApiResponse } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import nextConnect from "next-connect";

import prisma from "../../../lib/prisma";
import { nextAuthOptions } from "../auth/[...nextauth]";

type ExtendedRequest = {
  session: Session;
};
const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (error, _req, res) => {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).end(error.message);
    } else {
      return res.status(500).end("Something went wrong");
    }
  },
  onNoMatch: (req, res) => {
    return res.status(404).end(`${req.url} not found`);
  },
}).use<ExtendedRequest>(async (req, res, next) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  if (!session) return res.status(401).end("Unauthorized");
  req.session = session;
  next();
});

// GET api/games
// Returns all games
handler.get(async (_, res) => {
  const games = await prisma.game.findMany();

  res.json(games);
});

// POST api/games
// Adds game and returns the game
handler.post(async (req, res) => {
  const {
    bggId,
    imageSrc,
    thumbnailSrc,
    description,
    yearPublished,
    minPlayers,
    maxPlayers,
    playingTime,
    minAge,
    rating,
    numOfRatings,
    name,
    authors,
    categories,
    mechanics,
  } = req.body;

  const game = await prisma.game.create({
    data: {
      bggId,
      imageSrc,
      thumbnailSrc,
      description,
      yearPublished,
      minPlayers,
      maxPlayers,
      playingTime,
      minAge,
      rating,
      numOfRatings,
      name,
      authors,
      categories,
      mechanics,
    },
  });

  if (!game) return res.status(500).send("Game not created");

  return res.status(201).json(game);
});

export default handler;
