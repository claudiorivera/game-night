import clsx from "clsx";
import { EventsListContainer } from "~/components";
import { eventSelect } from "~/lib/api";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";
import { PopulatedEvent } from "~/types";

import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, nextAuthOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			},
		};
	}

	const events = await prisma.event.findMany({
		select: eventSelect,
	});

	if (!events) {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			},
		};
	}

	return {
		props: { events: JSON.parse(JSON.stringify(events)) },
	};
};

type EventsListPageProps = {
	events: PopulatedEvent[];
};
const EventsListPage = ({ events }: EventsListPageProps) => {
	const [disabled, setDisabled] = useState(false);

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
				<EventsListContainer events={events} />
			</div>
		</>
	);
};

export default EventsListPage;
