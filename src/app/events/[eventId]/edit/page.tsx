import { redirect } from "next/navigation";
import { EditEventForm } from "~/app/events/[eventId]/edit/edit-event-form";
import { BackButton } from "~/components/back-button";
import { Events } from "~/server/api/events";
import { auth } from "~/server/auth";

export default async function EditEventPage(props: {
	params: Promise<{ eventId: string }>;
}) {
	const params = await props.params;

	const { eventId } = params;

	const session = await auth();

	if (!session) {
		redirect("/api/auth/signin");
	}

	const event = await Events.findByIdOrThrow(eventId);

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

			<EditEventForm event={event} hostId={session.user.id} />
		</div>
	);
}
