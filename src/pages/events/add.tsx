import clsx from "clsx";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
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

const AddEventPage = () => {
	const router = useRouter();
	const [dateTime, setDateTime] = useState<Date>(new Date());
	const [gameId, setGameId] = useState("");

	const { data: games } = api.game.getAll.useQuery();

	const { mutate: addEvent, isLoading: disabled } =
		api.event.create.useMutation({
			onSuccess: () => {
				toast.success("Event created!");
				router.push("/events");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});

	if (!games) return null;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				addEvent({ gameId, dateTime });
			}}
			className="flex flex-col gap-4"
		>
			<label className="text-sm">
				Event Date and Time
				<input
					className="input-bordered input w-full"
					type="datetime-local"
					defaultValue={dayjs().format("YYYY-MM-DDTHH:mm")}
					onChange={(e) => setDateTime(new Date(e.target.value))}
				/>
			</label>
			<select
				className="select-bordered select w-full"
				id="select-game"
				defaultValue={-1}
				onChange={(e) => {
					setGameId(e.target.value as string);
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
				className={clsx("btn-secondary btn w-full", {
					"btn-disabled": disabled,
				})}
				type="submit"
				disabled={disabled}
			>
				Add Event
			</button>
		</form>
	);
};

export default AddEventPage;
