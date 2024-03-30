"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { type CreateEventFormState, createEvent } from "~/app/events/actions";
import type { GetAll } from "~/app/games/api";
import { Input } from "~/components/input";
import { Select } from "~/components/select";
import { SubmitButton } from "~/components/submit-button";

export function CreateEventForm({
	games,
	hostId,
}: { games: GetAll; hostId: string }) {
	const router = useRouter();

	const [state, formAction] = useFormState<CreateEventFormState, FormData>(
		createEvent,
		undefined,
	);

	useEffect(() => {
		if (state?.message) {
			toast.success(state.message);
			router.back();
		}
	}, [state, router]);

	return (
		<form id="create-event" action={formAction}>
			<Input type="hidden" name="hostId" value={hostId} />
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
					defaultValue={dayjs().format("YYYY-MM-DDTHH:mm")}
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
					defaultValue={-1}
					fieldErrors={state?.errors?.fieldErrors.gameId}
				/>
				<div className="flex gap-4">
					<div className="flex-1">
						<button
							className="btn btn-error w-full"
							type="button"
							onClick={() => router.back()}
						>
							Cancel
						</button>
					</div>
					<div className="flex-1">
						<SubmitButton>Create Event</SubmitButton>
					</div>
				</div>
			</div>
		</form>
	);
}
