import { eventSelect } from "lib/api";
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

// GET api/events/id
// Returns event with given id
handler.get(async (req, res) => {
  const event = await prisma.event.findUnique({
    where: {
      id: +req.query.id,
    },
    select: eventSelect,
  });

  if (!event) return res.status(404).send("Event not found");

  return res.json(event);
});

// DELETE api/events/id
// Deletes event with given id
// TODO: Validate that session user is the host or an admin
handler.delete(async (req, res) => {
  const event = await prisma.event.delete({
    where: {
      id: +req.query.id,
    },
  });

  if (!event) return res.status(404).send("Event not found");

  return res.status(204).end();
});

// Event update
handler.put<ExtendedRequest>(async (req, res) => {
  switch (req.query.action) {
    // PUT api/events/id?action=join
    // Adds current user to event with given id
    case "join": {
      const event = await prisma.event.update({
        where: {
          id: +req.query.id,
        },
        data: {
          guests: {
            connect: {
              id: req.session.user.id,
            },
          },
        },
      });

      if (!event) return res.status(404).send("Event not found");

      return res.status(204).end();
    }

    // PUT api/events/id?action=leave
    // Removes current user from event with given id
    case "leave": {
      const event = await prisma.event.update({
        where: {
          id: +req.query.id,
        },
        data: {
          guests: {
            disconnect: {
              id: req.session.user.id,
            },
          },
        },
      });

      if (!event) return res.status(404).send("Event not found");

      return res.status(204).end();
    }

    // PUT api/events/id?action=edit
    // Updates event with given id
    case "edit": {
      const event = await prisma.event.update({
        where: {
          id: +req.query.id,
        },
        data: {
          ...req.body,
        },
        select: eventSelect,
      });

      if (!event) return res.status(404).send("Event not found");

      return res.json(event);
    }
    default:
      return res.status(400).send("Invalid Action");
  }
});

export default handler;
