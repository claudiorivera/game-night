import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { type ReactNode } from "react";

import { EventSummaryCard, SkeletonCard } from "~/components";
import { api } from "~/lib/api";

const HomePage = () => {
	const { data: profile } = api.profile.getMine.useQuery();
	const { user } = useUser();

	return (
		<>
			<p className="py-2">Hello, {user?.firstName ?? "there"}.</p>

			<Title>Events You Are Hosting:</Title>
			<Events
				ListEmptyComponent={
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
				ListEmptyComponent={
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
};

export default HomePage;

const Title = ({ children }: { children: ReactNode }) => (
	<h4 className="py-4 font-semibold">{children}</h4>
);

type EventsProps = {
	events?:
		| {
				id: string;
				dateTime: Date;
				game: {
					id: string;
					name: string;
					imageSrc: string;
				};
				host: {
					id: string;
					clerkId: string;
				};
				guests: {
					id: string;
					clerkId: string;
				}[];
		  }[]
		| undefined;
	ListEmptyComponent: ReactNode;
};

const Events = ({ events, ListEmptyComponent }: EventsProps) => (
	<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{!events ? (
			<SkeletonCard />
		) : !events.length ? (
			ListEmptyComponent
		) : (
			events.map((event) => (
				<div key={event.id}>
					<EventSummaryCard event={event} />
				</div>
			))
		)}
	</div>
);
