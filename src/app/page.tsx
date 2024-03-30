import Link from "next/link";
import { redirect } from "next/navigation";
import { type UserEvents, getById } from "~/app/users/api";
import { EventSummaryCard } from "~/components/event-summary-card";
import { auth } from "~/lib/auth";

export default async function HomePage() {
	const session = await auth();

	if (!session) {
		return redirect("/api/auth/signin");
	}

	const { name, eventsHosting, eventsAttending } = await getById(
		session.user.id,
	);

	return (
		<>
			<p className="py-2">Hello, {name}.</p>

			<Title>Events You Are Hosting:</Title>
			<Events
				emptyComponent={
					<p className="text-gray-500">
						You are not hosting any events.&nbsp;
						<Link className="hover:text-primary" href="/events/create">
							Create one now!
						</Link>
					</p>
				}
				events={eventsHosting}
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
				events={eventsAttending}
			/>
		</>
	);
}

function Title({ children }: { children: React.ReactNode }) {
	return <h4 className="py-4 font-semibold">{children}</h4>;
}

function Events({
	events,
	emptyComponent,
}: {
	events: UserEvents;
	emptyComponent: React.ReactNode;
}) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{!events.length
				? emptyComponent
				: events.map((event) => (
						<div key={event.id}>
							<EventSummaryCard event={event} />
						</div>
					))}
		</div>
	);
}
