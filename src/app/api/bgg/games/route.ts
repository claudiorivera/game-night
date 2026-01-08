import { type NextRequest, NextResponse } from "next/server";
import { Bgg } from "@/server/api/bgg";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("q");

	if (!query) {
		return NextResponse.json(
			{
				error:
					"Query parameter 'q' is required and must be at least 2 characters long.",
			},
			{ status: 400 },
		);
	}

	const response = await Bgg.gamesByQuery(query);

	return NextResponse.json(response);
}
