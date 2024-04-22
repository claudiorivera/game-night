"use client";

import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import {
	type EditEventFormState,
	deleteEvent,
	editEvent,
} from "~/app/events/actions";
import type { GetById } from "~/app/events/api";
import type { GetAll } from "~/app/games/api";
import { Input } from "~/components/input";
import { Select } from "~/components/select";
import { SubmitButton } from "~/components/submit-button";
import { Button } from "~/components/ui/button";

export function EditEventForm({
	event,
	games,
	hostId,
}: { event: GetById; games: GetAll; hostId: string }) {
	const router = useRouter();
	const session = useSession();

	const [state, formAction] = useFormState<EditEventFormState, FormData>(
		editEvent,
		undefined,
	);

	useEffect(() => {
		if (state?.message) {
			toast.success(state.message);
			router.back();
		}
	}, [state, router]);

	const isHost = session.data?.user.id === hostId;
	const isAdmin = session.data?.user.isAdmin;

	return (
		<form id="edit-event" action={formAction}>
			<Input type="hidden" name="id" value={event.id} />
			<Input type="hidden" name="hostId" value={hostId} />
			<Input type="hidden" name="eventId" value={event.id} />

			<div className="flex flex-col gap-4">
				<Input
					name="dateTime"
					type="datetime-local"
					min={dayjs().format("YYYY-MM-DDTHH:mm")}
					onInvalid={(e) =>
						e.currentTarget.setCustomValidity(
							"Start date must be in the future",
						)
					}
					defaultValue={dayjs(event.dateTime).format("YYYY-MM-DDTHH:mm")}
					pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
					label="Event Date and Time"
					fieldErrors={state?.errors?.fieldErrors.dateTime}
				/>
				<Select
					name="gameId"
					label="Select Game"
					options={games.map((game) => ({
						value: game.id,
						label: game.name,
					}))}
					defaultValue={event.game.id}
					fieldErrors={state?.errors?.fieldErrors.gameId}
				/>
				<div className="flex gap-4">
					<Button type="button" variant="outline" className="w-full" asChild>
						<Link href={`/events/${event.id}`}>Cancel</Link>
					</Button>
					<SubmitButton>Save Changes</SubmitButton>
				</div>

				{(isHost || isAdmin) && (
					<div className="self-center">
						<Button
							type="button"
							variant="link"
							className="text-red-500"
							onClick={async () => {
								await deleteEvent(event.id);
								toast.success("Event deleted!");
							}}
						>
							Delete Event
						</Button>
					</div>
				)}
			</div>
		</form>
	);
}
