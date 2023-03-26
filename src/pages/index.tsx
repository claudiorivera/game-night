import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

import { EventSummaryCard } from "~/components";
import { api } from "~/lib/api";
import { authOptions } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

const HomePage = () => {
	const { data: user } = api.user.getCurrentUser.useQuery();

	if (!user) return null;

	const { name, eventsHosting, eventsAttending } = user;

	return (
		<>
			<p className="py-2">Hello, {name}.</p>

			<h4 className="py-4 font-semibold">Events You Are Hosting:</h4>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{eventsHosting.map((event) => (
					<div key={event.id}>
						<EventSummaryCard event={event} />
					</div>
				))}
			</div>

			<h4 className="py-4 font-semibold">Events You Are Attending:</h4>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{eventsAttending.map((event) => (
					<div key={event.id}>
						<EventSummaryCard event={event} />
					</div>
				))}
			</div>
		</>
	);
};

export default HomePage;
