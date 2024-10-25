"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { DateTimePicker } from "~/components/date-time-picker";
import { GameSelect } from "~/components/game-select";
import { Input } from "~/components/input";
import { SubmitButton } from "~/components/submit-button";
import { Button } from "~/components/ui/button";
import {
	type EditEventFormState,
	deleteEvent,
	editEvent,
} from "~/server/actions/events";
import type { EventById } from "~/types/events";

export function EditEventForm({
	event,
	hostId,
}: { event: EventById; hostId: string }) {
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
				<DateTimePicker
					fieldName="dateTime"
					initialDate={event.dateTime}
					fieldErrors={state?.errors?.fieldErrors.dateTime}
				/>

				<GameSelect initialId={event.gameBggId.toString()} />

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
