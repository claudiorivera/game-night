import { format } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UpdateAttendanceForm } from "~/app/events/[eventId]/update-attendance-form";
import { Avatar } from "~/components/avatar";
import { BackButton } from "~/components/back-button";
import { GameDetails } from "~/components/game-details";
import { Button } from "~/components/ui/button";
import { Bgg } from "~/server/api/bgg";
import { Events } from "~/server/api/events";
import { auth } from "~/server/auth";

export default async function EventDetailsPage({
	params,
}: { params: { eventId: string } }) {
	const session = await auth();

	if (!session) {
		return redirect("/api/auth/signin");
	}

	const event = await Events.findByIdOrThrow(params.eventId);
	const game = await Bgg.gameById(event.gameBggId);

	const isHost = session.user.id === event.hostId;
	const isAdmin = session.user.isAdmin;

	return (
		<div className="flex flex-col gap-4">
			<div>
				<BackButton />
			</div>

			<article className="rounded-lg border shadow-lg p-4 flex flex-col gap-4">
				<div>
					<h4 className="font-bold">
						{format(event.dateTime, "MMMM d, yyyy 'at' h:mmaaa")}
					</h4>
					<small>{game.name}</small>
				</div>

				<div>
					<GameDetails game={game} />

					<div className="divider" />

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<p>Host:</p>
							<Avatar user={event.host} />
							<p>Guests:</p>
							{event.guests.length ? (
								<div className="flex -space-x-4">
									{event.guests.map(({ guest }) => (
										<Avatar key={guest.id} user={guest} />
									))}
								</div>
							) : (
								<small>None yet. Be the first!</small>
							)}
						</div>

						<div className="flex items-center justify-end">
							{(isHost || isAdmin) && (
								<Button asChild type="button" variant="secondary">
									<Link
										className="self-center"
										href={`/events/${event.id}/edit`}
									>
										Edit Event
									</Link>
								</Button>
							)}
							{!isHost && (
								<UpdateAttendanceForm event={event} user={session.user} />
							)}
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}
