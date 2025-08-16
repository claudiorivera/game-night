"use client";

import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { Input } from "~/components/input";
import { Button } from "~/components/ui/button";
import {
	type UpdateAttendanceFormState,
	updateAttendance,
} from "~/server/actions/events";
import type { EventById } from "~/types/events";

export function UpdateAttendanceForm({
	event,
	user,
}: {
	event: EventById;
	user: User;
}) {
	const router = useRouter();

	const [state, formAction] = useActionState<
		UpdateAttendanceFormState,
		FormData
	>(updateAttendance, undefined);

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
