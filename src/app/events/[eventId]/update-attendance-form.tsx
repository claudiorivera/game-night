"use client";

import type { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import {
	type UpdateAttendanceFormState,
	updateAttendance,
} from "~/app/events/actions";
import type { EventById } from "~/app/events/api";
import { Input } from "~/components/input";
import { Button } from "~/components/ui/button";

export function UpdateAttendanceForm({
	event,
	user,
}: { event: EventById; user: User }) {
	const router = useRouter();

	const [state, formAction] = useFormState<UpdateAttendanceFormState, FormData>(
		updateAttendance,
		undefined,
	);

	useEffect(() => {
		if (state?.message) {
			toast.success(state.message);
			router.refresh();
		}
	}, [state, router]);

	const isAttending = event.guests.some(({ guest }) => guest.id === user.id);

	return (
		<form>
			<Input type="hidden" name="userId" value={user.id} />
			<Input type="hidden" name="eventId" value={event.id} />
			<Input
				type="hidden"
				name="action"
				value={isAttending ? "LEAVE" : "JOIN"}
			/>

			<Button type="submit" variant="secondary" formAction={formAction}>
				{isAttending ? "Leave" : "Join"}
			</Button>
		</form>
	);
}
