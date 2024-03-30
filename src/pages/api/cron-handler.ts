import type { NextApiRequest, NextApiResponse } from "next";
import { seed } from "~/lib/seed";
import { db } from "~/server/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { authorization } = req.headers;

	if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
		await seed(db);

		res.status(204).end();
	}

	res.status(401).end();
}
