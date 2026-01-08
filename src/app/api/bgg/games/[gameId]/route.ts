import { NextResponse } from "next/server";
import { Bgg } from "@/server/api/bgg";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ gameId: string }> },
) {
	const { gameId } = await params;

	const response = await Bgg.gameById(gameId);

	return NextResponse.json(response);
}
