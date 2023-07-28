import { clsx } from "clsx";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { api } from "~/lib/api";

const AddEventPage = () => {
	const router = useRouter();
	const [dateTime, setDateTime] = useState<Date>(new Date());
	const [gameId, setGameId] = useState("");

	const { data: games } = api.game.getAll.useQuery();

	const { mutate: addEvent, isLoading: disabled } =
		api.event.create.useMutation({
			onSuccess: () => {
				toast.success("Event created!");
				void router.push("/events");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});

	if (!games) return null;

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={(e) => {
				e.preventDefault();
				addEvent({ gameId, dateTime });
			}}
		>
			<label className="text-sm">
				Event Date and Time
				<input
					className="input input-bordered w-full"
					defaultValue={dayjs().format("YYYY-MM-DDTHH:mm")}
					onChange={(e) => setDateTime(new Date(e.target.value))}
					type="datetime-local"
				/>
			</label>
			<select
				className="select select-bordered w-full"
				defaultValue={-1}
				id="select-game"
				onChange={(e) => {
					setGameId(e.target.value);
				}}
			>
				<option disabled value={-1}>
					Select Game
				</option>
				{games.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
			<button
				className={clsx("btn btn-secondary w-full", {
					"btn-disabled": disabled,
				})}
				disabled={disabled}
				type="submit"
			>
				Add Event
			</button>
		</form>
	);
};

export default AddEventPage;
