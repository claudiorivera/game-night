"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
	createEventSchema,
	editEventSchema,
	updateAttendanceSchema,
} from "~/app/events/schemas";
import { db } from "~/lib/db";
import {
	type InferFlattenedErrors,
	type PossiblyUndefined,
	formatError,
	validate,
} from "~/lib/utils";

export type CreateEventFormState = PossiblyUndefined<{
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

	const event = await db.event.create({
		data: {
			...data,
			dateTime: dayjs(dateTime).toDate(),
		},
		select: {
			id: true,
		},
	});

	if (event) {
		return {
			message: "You have successfully created an event!",
			eventId: event.id,
		} satisfies CreateEventFormState;
	}
}

export type EditEventFormState = PossiblyUndefined<{
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

	const event = await db.event.update({
		where: { id: validation.data.id },
		data: {
			...data,
			dateTime: dayjs(dateTime).toDate(),
		},
		select: {
			id: true,
		},
	});

	if (event) {
		revalidatePath("/events/[eventId]");
		return {
			message: "You have successfully updated the event!",
		} satisfies EditEventFormState;
	}
}

export type UpdateAttendanceFormState = PossiblyUndefined<{
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

	const event = await db.event.update({
		where: {
			id: validation.data.eventId,
		},
		data: {
			guests: {
				...(validation.data.action === "JOIN" && {
					connect: {
						id: validation.data.userId,
					},
				}),
				...(validation.data.action === "LEAVE" && {
					disconnect: {
						id: validation.data.userId,
					},
				}),
			},
		},
	});

	if (event) {
		return {
			message: `You have successfully ${
				validation.data.action === "JOIN" ? "joined" : "left"
			} the event!`,
		} satisfies UpdateAttendanceFormState;
	}
}

export async function deleteEvent(id: string) {
	const event = await db.event.delete({
		where: { id },
		select: { id: true },
	});

	if (event) {
		return redirect("/events");
	}
}
