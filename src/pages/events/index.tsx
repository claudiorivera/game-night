import { clsx } from "clsx";
import Link from "next/link";
import { useState } from "react";
import { EventSummaryCard } from "~/components/event-summary-card";
import { api } from "~/lib/api";

export default function EventsListPage() {
	const [disabled, setDisabled] = useState(false);

	const { data: events = [] } = api.event.getAll.useQuery();

	return (
		<div className="container mx-auto">
			<div className="pb-4">
				<Link
					className={clsx("btn btn-secondary w-full disabled:disabled", {
						"btn-disabled": disabled,
					})}
					href="/events/add"
					onClick={() => {
						setDisabled(true);
					}}
				>
					Add Event
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
