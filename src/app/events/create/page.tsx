import { redirect } from "next/navigation";
import { CreateEventForm } from "~/app/events/create/create-event-form";
import { Games } from "~/server/api/games";
import { auth } from "~/server/auth";

export default async function CreateEventPage() {
	const session = await auth();

	if (!session) {
		redirect("/api/auth/signin");
	}

	const games = await Games.getAll();

	return <CreateEventForm games={games} hostId={session.user.id} />;
}
