"use server";

import { toDate } from "date-fns";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { formatError, validate } from "~/lib/utils";
import {
	createEventSchema,
	editEventSchema,
	updateAttendanceSchema,
} from "~/schemas/events";
import { db } from "~/server/db";
import { eventGuestTable, eventsTable } from "~/server/db/schema";
import type { InferFlattenedErrors, Maybe } from "~/types";

export type CreateEventFormState = Maybe<{
	errors?: InferFlattenedErrors<typeof createEventSchema>;
	message?: string;
	eventId?: string;
}>;

export async function createEvent(
	_formState: CreateEventFormState,
	formData: FormData,
) {
	const validation = validate({
		formData,
		schema: createEventSchema,
	});

	if (!validation.success) {
		const errors = formatError({
			error: validation.error,
		});

		console.error(errors);

		return { errors } satisfies CreateEventFormState;
	}

	const { dateTime, ...data } = validation.data;

	const [newEvent] = await db
		.insert(eventsTable)
		.values({
			...data,
			dateTime: toDate(dateTime),
		})
		.returning();

	if (newEvent) {
		return {
			message: "You have successfully created an event!",
			eventId: newEvent.id,
		} satisfies CreateEventFormState;
	}
}

export type EditEventFormState = Maybe<{
	errors?: InferFlattenedErrors<typeof editEventSchema>;
	message?: string;
}>;

export async function editEvent(
	_formState: EditEventFormState,
	formData: FormData,
) {
	const validation = validate({
		formData,
		schema: editEventSchema,
	});

	if (!validation.success) {
		const errors = formatError({
			error: validation.error,
		});

		console.error(errors);

		return {
			errors,
		} satisfies EditEventFormState;
	}

	const { dateTime, ...data } = validation.data;

	const [newEvent] = await db
		.update(eventsTable)
		.set({
			...data,
			dateTime: toDate(dateTime),
		})
		.where(eq(eventsTable.id, validation.data.id))
		.returning();

	if (newEvent) {
		return {
			message: "You have successfully updated the event!",
		} satisfies EditEventFormState;
	}
}

export type UpdateAttendanceFormState = Maybe<{
	errors?: InferFlattenedErrors<typeof updateAttendanceSchema>;
	message?: string;
}>;

export async function updateAttendance(
	_formState: UpdateAttendanceFormState,
	formData: FormData,
) {
	const validation = validate({
		formData,
		schema: updateAttendanceSchema,
	});

	if (!validation.success) {
		const errors = formatError({
			error: validation.error,
		});

		console.error(errors);

		return {
			errors,
		} satisfies UpdateAttendanceFormState;
	}

	if (validation.data.action === "JOIN") {
		await db.insert(eventGuestTable).values({
			eventId: validation.data.eventId,
			guestId: validation.data.userId,
		});
	}

	if (validation.data.action === "LEAVE") {
		await db
			.delete(eventGuestTable)
			.where(
				and(
					eq(eventGuestTable.eventId, validation.data.eventId),
					eq(eventGuestTable.guestId, validation.data.userId),
				),
			);
	}

	return {
		message: `You have successfully ${
			validation.data.action === "JOIN" ? "joined" : "left"
		} the event!`,
	} satisfies UpdateAttendanceFormState;
}

export async function deleteEvent(id: string) {
	const newEvent = await db.delete(eventsTable).where(eq(eventsTable.id, id));

	if (newEvent) {
		return redirect("/events");
	}
}
