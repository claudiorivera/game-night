import { userSelect } from "lib/api";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

import prisma from "../../../../lib/prisma";

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

// GET api/users/userId
// Returns the given user
handler.get(async (req, res) => {
  const user = prisma.user.findFirst({
    where: { id: req.query.userId as string },
    select: userSelect,
  });

  if (!user) return res.status(404).end("User not found");
  return res.json(user);
});

export default handler;
