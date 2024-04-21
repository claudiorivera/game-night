import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import type { GetAll } from "~/app/events/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export function EventSummaryCard({
	event,
}: {
	event: GetAll[number];
}) {
	return (
		<Link href={`/events/${event.id}`}>
			<Card>
				<CardHeader>
					<CardTitle>
						{dayjs(event.dateTime).format("MMMM D, YYYY [at] h:mma")}
					</CardTitle>
					<CardDescription>{event.game.name}</CardDescription>
				</CardHeader>

				<div className="relative aspect-video">
					<Image
						alt={event.game.name}
						className="object-cover"
						fill
						src={event.game.imageSrc}
					/>
				</div>

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
