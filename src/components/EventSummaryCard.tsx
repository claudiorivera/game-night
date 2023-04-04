import dayjs from "dayjs";
import Link from "next/link";

import { Card } from "~/components";
import { api, RouterOutputs } from "~/lib/api";

type EventSummaryCardProps = {
	event: RouterOutputs["event"]["getAll"][number];
};

export const EventSummaryCard = ({ event }: EventSummaryCardProps) => {
	const { game, host } = event;
	const { data: hostUser } = api.clerk.clerkUserById.useQuery({
		clerkId: host.clerkId,
	});

	return (
		<Link href={`/events/${event.id}`}>
			<Card>
				<Card.CardHeader
					title={dayjs(event.dateTime).format("MMMM D, YYYY [at] h:mma")}
					subheader={game.name}
				/>
				<Card.CardMedia image={game.imageSrc} title={game.name} />
				<Card.CardContent>
					<h4 className="font-semibold">
						Host: {hostUser?.firstName || "Anonymous"}
					</h4>
					<small className="text-slate-500">
						Guests: {event.guests.length}
					</small>
				</Card.CardContent>
			</Card>
		</Link>
	);
};