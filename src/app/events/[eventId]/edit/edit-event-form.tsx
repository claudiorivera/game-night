"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { DateTimePicker } from "@/components/date-time-picker";
import { GameSelect } from "@/components/game-select";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import {
	deleteEvent,
	type EditEventFormState,
	editEvent,
} from "@/server/actions/events";
import { Role } from "@/server/db/schema";
import type { EventById } from "@/types/events";

export function EditEventForm({
	event,
	hostId,
}: {
	event: EventById;
	hostId: string;
}) {
	const router = useRouter();
	const { data } = useSession();

	const [state, formAction] = useActionState<EditEventFormState, FormData>(
		editEvent,
		undefined,
	);

	useEffect(() => {
		if (state?.message) {
			toast.success(state.message);
			router.back();
		}
	}, [state, router]);

	const isHost = data?.user.id === hostId;
	const isAdmin = data?.user.role === Role.admin;

	return (
		<form action={formAction}>
			<input type="hidden" name="id" value={event.id} />
			<input type="hidden" name="hostId" value={hostId} />
			<input type="hidden" name="eventId" value={event.id} />

			<div className="flex flex-col gap-4">
				<DateTimePicker
					fieldName="dateTime"
					initialDate={event.dateTime}
					errors={state?.errors?.properties?.dateTime?.errors}
				/>

				<GameSelect
					initialId={event.gameBggId.toString()}
					errors={state?.errors?.properties?.gameBggId?.errors}
				/>

				<div className="flex gap-4">
					<Button variant="outline" asChild>
						<Link className="flex-1" href={`/events/${event.id}`}>
							Cancel
						</Link>
					</Button>
					<SubmitButton
						render={({ isPending }) => (
							<Button
								className="flex-1"
								disabled={isPending}
								type="submit"
								variant="secondary"
							>
								{isPending ? "Saving..." : "Save Event"}
							</Button>
						)}
					/>
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
