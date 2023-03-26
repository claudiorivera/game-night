import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { toast } from "react-hot-toast";

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

const EditEventPage = () => {
	const router = useRouter();

	const { data: event } = api.event.getById.useQuery(
		{
			id: router.query.id as string,
		},
		{
			enabled: !!router.query.id,
			onSuccess: (data) => {
				if (!data) return;

				setDateTime(dayjs(data.dateTime));
				setGameId(data.game.id);
			},
		},
	);

	const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs(new Date()));
	const [gameId, setGameId] = useState<string>("");

	const { mutate: updateEvent, isLoading: disabled } =
		api.event.updateById.useMutation({
			onSuccess: () => {
				toast.success("Event updated successfully");
				router.back();
			},
		});

	const { data: games } = api.game.getAll.useQuery();

	if (!event || !games) return null;

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
					updateEvent({
						id: event.id,
						data: {
							dateTime: dateTime?.toDate() || new Date(),
							gameId,
						},
					});
				}}
				className="flex flex-col gap-4"
			>
				<input
					className="input-bordered input"
					type="datetime-local"
					defaultValue={(dateTime ?? new Date()).toISOString().slice(0, 16)}
					pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
					onChange={(e) => setDateTime(dayjs(e.target.value))}
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
