import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Game } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { eventSelect } from "~/lib/api";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";
import { PopulatedEvent } from "~/types";

import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	params,
}) => {
	const session = await getServerSession(req, res, nextAuthOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			},
		};
	}

	if (!params) return { props: {} };

	const event = await prisma.event.findUnique({
		where: { id: params.id as string },
		select: eventSelect,
	});

	const games = await prisma.game.findMany();

	if (!games || !event) {
		return {
			redirect: {
				destination: "/events",
				permanent: false,
			},
		};
	}

	return {
		props: {
			event: JSON.parse(JSON.stringify(event)),
			games: JSON.parse(JSON.stringify(games)),
		},
	};
};

type EditEventPageProps = {
	event: PopulatedEvent;
	games: Game[];
};
const EditEventPage = ({ event, games }: EditEventPageProps) => {
	const router = useRouter();
	const [dateTime, setDateTime] = useState<Date>(new Date());
	const [gameId, setGameId] = useState(event.game.id);
	const [disabled, setDisabled] = useState(false);

	const updateEvent = async () => {
		await axios.put(`/api/events/${event.id}?action=edit`, {
			gameId,
			dateTime,
		});
		router.back();
	};

	return (
		<div className="container mx-auto">
			<div className="pb-4">
				<Link href={`/events/${event.id}`} className="btn-ghost btn">
					<div className="flex items-center gap-2">
						<ArrowLeftIcon className="h-5 w-5" />
						Go Back
					</div>
				</Link>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					setDisabled(true);
					updateEvent();
				}}
				className="flex flex-col gap-4"
			>
				<input
					className="input-bordered input"
					type="datetime-local"
					defaultValue={dateTime.toISOString().slice(0, 16)}
					pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
					onChange={(e) => setDateTime(new Date(e.target.value))}
				/>
				<input
					type="hidden"
					name="utcOffset"
					value={new Date().getTimezoneOffset()}
				/>
				<select
					className="select-bordered select w-full"
					id="game-select"
					value={gameId}
					onChange={(e) => {
						setGameId(e.target.value);
					}}
				>
					{games.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
				<div>
					<button
						className={clsx("btn-secondary btn w-full", {
							"btn-disabled": disabled,
						})}
						type="submit"
						disabled={disabled}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditEventPage;
