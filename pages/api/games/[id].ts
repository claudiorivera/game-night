import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

import prisma from "../../../lib/prisma";

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
  const session = await getSession({ req });
  if (!session) return res.status(401).end("Unauthorized");
  req.session = session;
  next();
});

// GET api/games/:gameId
// Returns game with given bggId
handler.get(async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).end("No id provided");

  const game = await prisma.game.findUnique({
    where: { id: +id },
  });

  if (!game) return res.status(404).send("Game not found");

  return res.json(game);
});

export default handler;
