import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { eventTable } from "@/server/db/schema";

function getAll() {
	return db.query.eventTable.findMany({
		with: {
			host: true,
			guests: {
				with: {
					guest: true,
				},
			},
		},
	});
}

async function findByIdOrThrow(id: string) {
	const event = await db.query.eventTable.findFirst({
		where: eq(eventTable.id, id),
		with: {
			host: true,
			guests: {
				with: {
					guest: true,
				},
			},
		},
	});

	if (!event) {
		throw new Error("Event not found");
	}

	return event;
}

export const Events = {
	getAll,
	findByIdOrThrow,
};
