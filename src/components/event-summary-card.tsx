import dayjs from "dayjs";
import Link from "next/link";
import type { GetAll } from "~/app/events/api";
import { Card } from "~/components/card";

export function EventSummaryCard({
	event,
}: {
	event: GetAll[number];
}) {
	return (
		<Link href={`/events/${event.id}`}>
			<Card>
				<Card.CardHeader
					subheader={event.game.name}
					title={dayjs(event.dateTime).format("MMMM D, YYYY [at] h:mma")}
				/>
				<Card.CardMedia image={event.game.imageSrc} title={event.game.name} />
				<Card.CardContent>
					<h4 className="font-semibold">
						Host: {event.host.name || "Anonymous"}
					</h4>
					<small className="text-slate-500">
						Guests: {event.guests.length}
					</small>
				</Card.CardContent>
			</Card>
		</Link>
	);
}
