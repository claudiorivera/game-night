import { redirect } from "next/navigation";
import { CreateEventForm } from "~/app/events/create/create-event-form";
import { auth } from "~/server/auth";

export default async function CreateEventPage() {
	const session = await auth();

	if (!session) {
		redirect("/api/auth/signin");
	}

	return <CreateEventForm hostId={session.user.id} />;
}
