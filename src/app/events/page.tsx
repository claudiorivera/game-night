import Link from "next/link";
import { getAll } from "~/app/events/api";
import { EventSummaryCard } from "~/components/event-summary-card";
import { cn } from "~/lib/utils";

export default async function EventsListPage() {
	const events = await getAll();

	return (
		<div className="container mx-auto">
			<div className="pb-4">
				<Link
					className={cn("btn btn-secondary w-full disabled:disabled")}
					href="/events/create"
				>
					Create Event
				</Link>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{events.map((event) => (
					<div key={event.id}>
						<EventSummaryCard event={event} />
					</div>
				))}
			</div>
		</div>
	);
}
