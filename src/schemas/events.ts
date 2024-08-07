import { z } from "zod";

const dateTimeLocalInputSchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Required");

const eventIdSchema = z.object({
	id: z.string().cuid2(),
});

export const createEventSchema = z.object({
	gameBggId: z.coerce.number(),
	dateTime: dateTimeLocalInputSchema,
	hostId: z.string().cuid2(),
});

export const editEventSchema = createEventSchema.merge(eventIdSchema);

const eventAction = z.enum(["JOIN", "LEAVE"]);

export const updateAttendanceSchema = z.object({
	eventId: z.string().cuid2(),
	userId: z.string().cuid2(),
	action: eventAction,
});
