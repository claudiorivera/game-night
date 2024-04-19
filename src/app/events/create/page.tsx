import { redirect } from "next/navigation";
import { CreateEventForm } from "~/app/events/create/create-event-form";
import { getAll } from "~/app/games/api";
import { auth } from "~/lib/auth";

export default async function CreateEventPage() {
	const session = await auth();

	if (!session) {
		redirect("/api/auth/signin");
	}

	const games = await getAll();

	return <CreateEventForm games={games} hostId={session.user.id} />;
}
