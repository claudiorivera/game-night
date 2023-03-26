import clsx from "clsx";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { useState } from "react";

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

const EventsListPage = () => {
	const [disabled, setDisabled] = useState(false);

	const { data: events } = api.event.getAll.useQuery();

	if (!events) return null;

	return (
		<>
			<div className="container mx-auto">
				<div className="pb-4">
					<Link
						className={clsx("btn-secondary btn w-full disabled:disabled", {
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
		</>
	);
};

export default EventsListPage;
