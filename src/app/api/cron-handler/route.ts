import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "~/db";
import { seed } from "~/db/seed";

export async function POST() {
	const headersList = headers();
	const authorization = headersList.get("authorization");

	if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
		await seed(db);

		return NextResponse.json(
			{ message: "Done" },
			{
				status: 200,
			},
		);
	}

	return NextResponse.json(
		{ message: "Unauthorized" },
		{
			status: 401,
		},
	);
}
