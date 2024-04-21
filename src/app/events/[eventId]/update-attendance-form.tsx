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
import type { GetById } from "~/app/events/api";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

export function UpdateAttendanceForm({
	event,
	user,
}: { event: GetById; user: User }) {
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

	const isAttending = event.guests.some((guest) => guest.id === user.id);

	return (
		<form>
			<Input type="hidden" name="userId" value={user.id} />
			<Input type="hidden" name="eventId" value={event.id} />
			<Input
				type="hidden"
				name="action"
				value={isAttending ? "LEAVE" : "JOIN"}
			/>

			<Button type="submit" formAction={formAction}>
				{isAttending ? "Leave" : "Join"}
			</Button>
		</form>
	);
}
