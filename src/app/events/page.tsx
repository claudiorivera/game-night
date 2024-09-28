import Link from "next/link";
import { redirect } from "next/navigation";
import { EventSummaryCard } from "~/components/event-summary-card";
import { Button } from "~/components/ui/button";
import { Events } from "~/server/api/events";
import { auth } from "~/server/auth";

export default async function EventsListPage() {
	const session = await auth();

	if (!session) {
		redirect("/api/auth/signin");
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
