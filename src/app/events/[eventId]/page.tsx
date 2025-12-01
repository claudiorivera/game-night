import { format } from "date-fns";
import Link from "next/link";
import { UpdateAttendanceForm } from "@/app/events/[eventId]/update-attendance-form";
import { Avatar } from "@/components/avatar";
import { BackButton } from "@/components/back-button";
import { GameDetails } from "@/components/game-details";
import { SignInButton } from "@/components/sign-in-button";
import { Button } from "@/components/ui/button";
import { can } from "@/lib/permissions";
import { Bgg } from "@/server/api/bgg";
import { Events } from "@/server/api/events";
import { getSessionUser } from "@/server/api/users";

export default async function EventDetailsPage(props: {
	params: Promise<{ eventId: string }>;
}) {
	const params = await props.params;

	const sessionUser = await getSessionUser();

	if (!sessionUser) {
		return <SignInButton />;
	}

	const event = await Events.findByIdOrThrow(params.eventId);
	const game = await Bgg.gameById(event.gameBggId.toString());

	const isHost = sessionUser.id === event.hostId;

	return (
		<div className="flex flex-col gap-4">
			<div>
				<BackButton />
			</div>

			<article className="flex flex-col gap-4 rounded-lg border p-4 shadow-lg">
				<div>
					<h4 className="font-bold">
						{format(event.dateTime, "MMMM d, yyyy 'at' h:mmaaa")}
					</h4>
					<small>{game.names.at(0)?.value}</small>
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
								<div className="-space-x-4 flex">
									{event.guests.map(({ guest }) => (
										<Avatar key={guest.id} user={guest} />
									))}
								</div>
							) : (
								<small>None yet. Be the first!</small>
							)}
						</div>

						<div className="flex items-center justify-end gap-4">
							{can(sessionUser).editEvent(event) && (
								<Button asChild type="button" variant="ghost">
									<Link
										className="self-center"
										href={`/events/${event.id}/edit`}
									>
										Edit Event
									</Link>
								</Button>
							)}
							{!isHost && (
								<UpdateAttendanceForm event={event} user={sessionUser} />
							)}
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}
