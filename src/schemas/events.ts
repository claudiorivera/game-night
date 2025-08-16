import { z } from "zod";

const dateTimeLocalInputSchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Required");

const eventIdSchema = z.object({
	id: z.cuid2(),
});

export const createEventSchema = z.object({
	gameBggId: z.preprocess(
		(val) => (!val ? undefined : Number(val)),
		z.number({
			error: "Required",
		}),
	),
	dateTime: dateTimeLocalInputSchema,
	hostId: z.cuid2(),
});

export const editEventSchema = createEventSchema.extend(eventIdSchema.shape);

const eventAction = z.enum(["JOIN", "LEAVE"]);

export const updateAttendanceSchema = z.object({
	eventId: z.cuid2(),
	userId: z.cuid2(),
	action: eventAction,
});
