import type { BggBoardgameItem } from "bgg-xml-api-client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getNameForGame } from "@/lib/bgg";
import { Bgg } from "@/server/api/bgg";
import type { EventById } from "@/types/events";

export async function EventSummaryCard({ event }: { event: EventById }) {
	const gameResponse = await Bgg.gameById(event.gameBggId.toString());
	const game = gameResponse.item as BggBoardgameItem;

	return (
		<Link href={`/events/${event.id}`}>
			<Card>
				<CardHeader>
					<CardTitle>
						{format(event.dateTime, "MMMM d, yyyy 'at' h:mmaaa")}
					</CardTitle>
					<CardDescription>{getNameForGame(game)}</CardDescription>
				</CardHeader>

				{game.image && (
					<div className="relative aspect-video">
						<Image
							alt={getNameForGame(game) ?? "game image"}
							className="object-cover"
							fill
							src={game.image}
						/>
					</div>
				)}

				<CardContent>
					<h4 className="font-semibold">
						Host: {event.host.name || "Anonymous"}
					</h4>
					<small className="text-slate-500">
						Guests: {event.guests.length}
					</small>
				</CardContent>
			</Card>
		</Link>
	);
}
