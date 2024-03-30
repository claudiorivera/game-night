import type { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "~/lib/db";
import { seed } from "~/lib/seed";

export default async function POST() {
	const headersList = headers();
	const authorization = headersList.get("authorization");

	if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
		await seed(db);

		NextResponse.json(
			{ message: "Done" },
			{
				status: 200,
			},
		);
	}

	NextResponse.json(
		{ message: "Unauthorized" },
		{
			status: 401,
		},
	);
}
