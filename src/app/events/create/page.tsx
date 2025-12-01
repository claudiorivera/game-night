import { CreateEventForm } from "@/app/events/create/create-event-form";
import { SignInButton } from "@/components/sign-in-button";
import { getSessionUser } from "@/server/api/users";

export default async function CreateEventPage() {
	const sessionUser = await getSessionUser();

	if (!sessionUser) {
		return <SignInButton />;
	}

	return <CreateEventForm hostId={sessionUser.id} />;
}
