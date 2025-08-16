"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { DateTimePicker } from "~/components/date-time-picker";
import { GameSelect } from "~/components/game-select";
import { Input } from "~/components/input";
import { SubmitButton } from "~/components/submit-button";
import { Button } from "~/components/ui/button";
import {
	type CreateEventFormState,
	createEvent,
} from "~/server/actions/events";

export function CreateEventForm({ hostId }: { hostId: string }) {
	const router = useRouter();

	const [state, formAction] = useActionState<CreateEventFormState, FormData>(
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
		<form action={formAction}>
			<Input type="hidden" name="hostId" value={hostId} />
			<div className="flex flex-col gap-4">
				<DateTimePicker
					fieldName="dateTime"
					errors={state?.errors?.properties?.dateTime?.errors}
					label="Select Date and Time"
				/>

				<GameSelect errors={state?.errors?.properties?.gameBggId?.errors} />

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
