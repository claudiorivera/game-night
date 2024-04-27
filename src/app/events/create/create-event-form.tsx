"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { type CreateEventFormState, createEvent } from "~/app/events/actions";
import type { GetAll } from "~/app/games/api";
import { DateTimePicker } from "~/components/date-time-picker";
import { Input } from "~/components/input";
import { Select } from "~/components/select";
import { SubmitButton } from "~/components/submit-button";
import { Button } from "~/components/ui/button";

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
			if (state.eventId) {
				router.push(`/events/${state.eventId}`);
			}
		}
	}, [state, router]);

	return (
		<form id="create-event" action={formAction}>
			<Input type="hidden" name="hostId" value={hostId} />
			<div className="flex flex-col gap-4">
				<DateTimePicker
					fieldName="dateTime"
					fieldErrors={state?.errors?.fieldErrors.dateTime}
					label="Select Date and Time"
				/>
				<Select
					name="gameId"
					label="Select Game"
					options={games.map((game) => ({
						value: game.id,
						label: game.name,
					}))}
					fieldErrors={state?.errors?.fieldErrors.gameId}
				/>
				<div className="flex gap-4">
					<Button
						type="button"
						variant="outline"
						className="w-full"
						onClick={() => router.back()}
					>
						Cancel
					</Button>
					<SubmitButton>Create Event</SubmitButton>
				</div>
			</div>
		</form>
	);
}
