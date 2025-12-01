"use server";

import { toDate } from "date-fns";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import z from "zod";
import {
	createEventSchema,
	editEventSchema,
	updateAttendanceSchema,
} from "@/schemas/events";
import { db } from "@/server/db";
import { eventTable, participationTable } from "@/server/db/schema";
import type { Maybe } from "@/types";

export type CreateEventFormState = Maybe<{
	errors?: z.core.$ZodErrorTree<z.infer<typeof createEventSchema>>;
	message?: string;
	eventId?: string;
}>;

export async function createEvent(
	_formState: CreateEventFormState,
	formData: FormData,
) {
	const _formData = Object.fromEntries(formData);
	const validation = createEventSchema.safeParse(_formData);

	if (!validation.success) {
		const errors = z.treeifyError(validation.error);

		console.error("Event creation failed:", errors);

		return {
			errors,
		} satisfies CreateEventFormState;
	}

	const { dateTime, ...data } = validation.data;

	const [newEvent] = await db
		.insert(eventTable)
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
	errors?: z.core.$ZodErrorTree<z.infer<typeof editEventSchema>>;
	message?: string;
}>;

export async function editEvent(
	_formState: EditEventFormState,
	formData: FormData,
) {
	const _formData = Object.fromEntries(formData);

	const validation = editEventSchema.safeParse(_formData);

	if (!validation.success) {
		const errors = z.treeifyError(validation.error);

		console.error("Event update failed:", errors);

		return {
			errors,
		} satisfies EditEventFormState;
	}

	const { dateTime, ...data } = validation.data;

	const [newEvent] = await db
		.update(eventTable)
		.set({
			...data,
			dateTime: toDate(dateTime),
		})
		.where(eq(eventTable.id, validation.data.id))
		.returning();

	if (newEvent) {
		return {
			message: "You have successfully updated the event!",
		} satisfies EditEventFormState;
	}
}

export type UpdateAttendanceFormState = Maybe<{
	errors?: z.core.$ZodErrorTree<z.infer<typeof updateAttendanceSchema>>;
	message?: string;
}>;

export async function updateAttendance(
	_formState: UpdateAttendanceFormState,
	formData: FormData,
) {
	const _formData = Object.fromEntries(formData);
	const validation = updateAttendanceSchema.safeParse(_formData);

	if (!validation.success) {
		const errors = z.treeifyError(validation.error);

		console.error("Update attendance failed:", errors);

		return {
			errors,
		} satisfies UpdateAttendanceFormState;
	}

	if (validation.data.action === "JOIN") {
		await db.insert(participationTable).values({
			eventId: validation.data.eventId,
			guestId: validation.data.userId,
		});
	}

	if (validation.data.action === "LEAVE") {
		await db
			.delete(participationTable)
			.where(
				and(
					eq(participationTable.eventId, validation.data.eventId),
					eq(participationTable.guestId, validation.data.userId),
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
	await db.delete(eventTable).where(eq(eventTable.id, id));
	redirect("/events");
}
