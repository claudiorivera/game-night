import { clsx } from "clsx";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BackButton } from "~/components";

import { api } from "~/lib/api";

const EditEventPage = () => {
	const router = useRouter();
	const { data: currentUserProfile } = api.profile.getMine.useQuery();

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

	useEffect(() => {
		if (!!currentUserProfile && !!event) {
			if (currentUserProfile.clerkId !== event.host.clerkId) {
				void router.push("/events");
			}
		}
	}, [currentUserProfile, event, router]);

	return (
		<div className="container mx-auto">
			<BackButton />

			<form
				className="flex flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault();
					if (!event) return;

					updateEvent({
						id: event.id,
						data: {
							dateTime,
							gameId,
						},
					});
				}}
			>
				<input
					className="input input-bordered"
					defaultValue={dayjs(event?.dateTime ?? new Date()).format(
						"YYYY-MM-DDTHH:mm",
					)}
					onChange={(e) => setDateTime(new Date(e.target.value))}
					type="datetime-local"
				/>
				<input
					name="utcOffset"
					type="hidden"
					value={new Date().getTimezoneOffset()}
				/>
				<select
					className="select select-bordered w-full"
					id="game-select"
					onChange={(e) => {
						setGameId(e.target.value);
					}}
					value={gameId}
				>
					<option disabled value="">
						Select a game
					</option>
					{(games ?? []).map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
				<div>
					<button
						className={clsx("btn btn-secondary w-full", {
							"btn-disabled": disabled,
						})}
						disabled={disabled}
						type="submit"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditEventPage;
