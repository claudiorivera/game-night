import { redirect } from "next/navigation";
import { EditEventForm } from "~/app/events/[eventId]/edit/edit-event-form";
import { getById } from "~/app/events/api";
import { getAll } from "~/app/games/api";
import { BackButton } from "~/components/back-button";
import { auth } from "~/lib/auth";

export default async function EditEventPage({
	params: { eventId },
}: { params: { eventId: string } }) {
	const session = await auth();

	if (!session) {
		redirect("/api/auth/signin");
	}

	const event = await getById(eventId);
	const games = await getAll();
	const isHost = session.user.id === event.host.id;
	const isAdmin = session.user.isAdmin;

	if (!(isHost || isAdmin)) {
		redirect(`/events/${eventId}`);
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<BackButton />
			</div>

			<EditEventForm event={event} games={games} hostId={session.user.id} />
		</div>
	);
}
