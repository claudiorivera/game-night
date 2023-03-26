import { eventSelect } from "~/lib/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import nextConnect from "next-connect";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";

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
	const session = await getServerSession(req, res, nextAuthOptions);
	if (!session) return res.status(401).end("Unauthorized");
	req.session = session;
	next();
});

// GET api/users/userId/events
// Returns the given user's events
handler.get<ExtendedRequest>(async (req, res) => {
	if ("hosting" in req.query) {
		const events = prisma.event.findMany({
			where: {
				host: {
					id: req.session.user.id,
				},
			},
			select: eventSelect,
		});

		return res.json(events);
	} else {
		const events = prisma.event.findMany({
			where: {
				guests: {
					some: {
						id: req.session.user.id,
					},
				},
			},
			select: eventSelect,
		});
		return res.json(events);
	}
});

export default handler;
