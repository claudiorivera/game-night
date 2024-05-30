import { eq, gte } from "drizzle-orm";
import { db } from "~/db";
import { eventGuestTable, eventsTable } from "~/db/schema";

export function getAll() {
	return db.query.eventsTable.findMany({
		with: {
			host: true,
			game: true,
			guests: {
				with: {
					guest: true,
				},
			},
		},
	});
}

export async function findByIdOrThrow(id: string) {
	return db.query.eventsTable
		.findFirst({
			where: eq(eventsTable.id, id),
			with: {
				host: true,
				game: true,
				guests: {
					with: {
						guest: true,
					},
				},
			},
		})
		.then((event) => {
			if (!event) {
				throw new Error("Event not found");
			}

			return event;
		});
}

export type EventById = Awaited<ReturnType<typeof findByIdOrThrow>>;
