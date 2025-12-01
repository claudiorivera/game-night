import { z } from "zod";

const dateTimeLocalInputSchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Required");

const eventIdSchema = z.object({
	id: z.string(),
});

export const createEventSchema = z.object({
	gameBggId: z.preprocess(
		(val) => (!val ? undefined : Number(val)),
		z.number({
			error: "Required",
		}),
	),
	dateTime: dateTimeLocalInputSchema,
	hostId: z.string(),
});

export const editEventSchema = createEventSchema.extend(eventIdSchema.shape);

const eventAction = z.enum(["JOIN", "LEAVE"]);

export const updateAttendanceSchema = z.object({
	eventId: z.string(),
	userId: z.string(),
	action: eventAction,
});
