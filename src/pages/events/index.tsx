import { clsx } from "clsx";
import Link from "next/link";
import { useState } from "react";

import { EventSummaryCard, SkeletonCard } from "~/components";
import { api } from "~/lib/api";

const EventsListPage = () => {
	const [disabled, setDisabled] = useState(false);

	const { data: events } = api.event.getAll.useQuery();

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
				{!events
					? Array(5)
							.fill(null)
							.map((_, i) => <SkeletonCard key={i} />)
					: events.map((event) => (
							<div key={event.id}>
								<EventSummaryCard event={event} />
							</div>
					  ))}
			</div>
		</div>
	);
};

export default EventsListPage;
