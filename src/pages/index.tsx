import { useUser } from "@clerk/nextjs";

import { EventSummaryCard } from "~/components";
import { api } from "~/lib/api";

const HomePage = () => {
	const { data: profile } = api.profile.getMine.useQuery();
	const { user } = useUser();

	return (
		<>
			<p className="py-2">Hello, {user?.firstName ?? "there"}.</p>

			<h4 className="py-4 font-semibold">Events You Are Hosting:</h4>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{profile?.eventsHosting.map((event) => (
					<div key={event.id}>
						<EventSummaryCard event={event} />
					</div>
				))}
			</div>

			<h4 className="py-4 font-semibold">Events You Are Attending:</h4>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{profile?.eventsAttending.map((event) => (
					<div key={event.id}>
						<EventSummaryCard event={event} />
					</div>
				))}
			</div>
		</>
	);
};

export default HomePage;
