import Link from "next/link";
import type { ReactNode } from "react";
import { EventSummaryCard } from "~/components/event-summary-card";
import { SkeletonCard } from "~/components/skeleton-card";
import { api } from "~/lib/api";
import { renderProfileName } from "~/lib/render-profile-name";
import type { EventGetAllOutput } from "~/server/api/routers/event";

export default function HomePage() {
	const { data: profile } = api.profile.getMine.useQuery();

	return (
		<>
			<p className="py-2">Hello, {renderProfileName(profile)}.</p>

			<Title>Events You Are Hosting:</Title>
			<Events
				emptyComponent={
					<p className="text-gray-500">
						You are not hosting any events.&nbsp;
						<Link className="hover:text-primary" href="/events/add">
							Create one now!
						</Link>
					</p>
				}
				events={profile?.eventsHosting}
			/>

			<Title>Events You Are Attending:</Title>
			<Events
				emptyComponent={
					<p className="text-gray-500">
						You are not attending any events.&nbsp;
						<Link className="hover:text-primary" href="/events">
							Go find some!
						</Link>
					</p>
				}
				events={profile?.eventsAttending}
			/>
		</>
	);
}

function Title({ children }: { children: ReactNode }) {
	return <h4 className="py-4 font-semibold">{children}</h4>;
}

function Events({
	events,
	emptyComponent,
}: {
	events?: EventGetAllOutput;
	emptyComponent: ReactNode;
}) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{!events ? (
				<SkeletonCard />
			) : !events.length ? (
				emptyComponent
			) : (
				events.map((event) => (
					<div key={event.id}>
						<EventSummaryCard event={event} />
					</div>
				))
			)}
		</div>
	);
}
