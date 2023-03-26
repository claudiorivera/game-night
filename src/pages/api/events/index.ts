import { eventSelect } from "~/lib/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
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
	const session = await getServerSession(req, res, nextAuthOptions);
	if (!session) return res.status(401).end("Unauthorized");
	req.session = session;
	next();
});

// GET api/events
// Returns all events
handler.get(async (_, res) => {
	const events = await prisma.event.findMany({
		select: eventSelect,
	});

	return res.json(events);
});

// POST api/events
// Adds a new event and returns the event
handler.post<ExtendedRequest>(async (req, res) => {
	const { gameId, dateTime } = req.body;
	const event = await prisma.event.create({
		data: {
			dateTime,
			game: {
				connect: {
					id: gameId,
				},
			},
			host: {
				connect: {
					id: req.session.user.id,
				},
			},
		},
		select: eventSelect,
	});

	if (!event) return res.status(500).send("Event not created");

	return res.status(201).json(event);
});

export default handler;
