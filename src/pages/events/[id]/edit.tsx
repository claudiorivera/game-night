import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { api } from "~/lib/api";

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

				setDateTime(data.dateTime);
				setGameId(data.game.id);
			},
		},
	);

	const [dateTime, setDateTime] = useState<Date>(event?.dateTime ?? new Date());
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
				<button onClick={() => router.back()} className="btn-ghost btn">
					<div className="flex items-center gap-2">
						<ArrowLeftIcon className="h-5 w-5" />
						Go Back
					</div>
				</button>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateEvent({
						id: event.id,
						data: {
							dateTime,
							gameId,
						},
					});
				}}
				className="flex flex-col gap-4"
			>
				<input
					className="input-bordered input"
					type="datetime-local"
					defaultValue={dayjs(event.dateTime).format("YYYY-MM-DDTHH:mm")}
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
