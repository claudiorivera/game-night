import Link from "next/link";
import { EventSummaryCard } from "@/components/event-summary-card";
import { SignInButton } from "@/components/sign-in-button";
import { Button } from "@/components/ui/button";
import { Events } from "@/server/api/events";
import { getSessionUser } from "@/server/api/users";

export default async function EventsListPage() {
	const sessionUser = await getSessionUser();

	if (!sessionUser) {
		return <SignInButton />;
	}

	const events = await Events.getAll();

	return (
		<>
			<div className="pb-4">
				<Button asChild variant="secondary" className="w-full">
					<Link href="/events/create">Create Event</Link>
				</Button>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{events.map((event) => (
					<div key={event.id}>
						<EventSummaryCard event={event} />
					</div>
				))}
			</div>
		</>
	);
}
