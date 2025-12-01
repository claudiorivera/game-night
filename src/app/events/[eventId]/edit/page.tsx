import { redirect } from "next/navigation";
import { EditEventForm } from "@/app/events/[eventId]/edit/edit-event-form";
import { BackButton } from "@/components/back-button";
import { SignInButton } from "@/components/sign-in-button";
import { Events } from "@/server/api/events";
import { getSessionUser } from "@/server/api/users";
import { Role } from "@/server/db/schema";

export default async function EditEventPage(props: {
	params: Promise<{ eventId: string }>;
}) {
	const params = await props.params;

	const { eventId } = params;

	const sessionUser = await getSessionUser();

	if (!sessionUser) {
		return <SignInButton />;
	}

	const event = await Events.findByIdOrThrow(eventId);

	const isHost = sessionUser.id === event.host.id;
	const isAdmin = sessionUser.role === Role.admin;

	if (!(isHost || isAdmin)) {
		redirect(`/events/${eventId}`);
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<BackButton />
			</div>

			<EditEventForm event={event} hostId={sessionUser.id} />
		</div>
	);
}
