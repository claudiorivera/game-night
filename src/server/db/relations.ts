import { relations } from "drizzle-orm";
import { eventTable, participationTable, user } from "@/server/db/schema";

export const userRelations = relations(user, ({ many }) => ({
	eventsHosting: many(eventTable),
	eventsAttending: many(participationTable),
}));

export const eventRelations = relations(eventTable, ({ many, one }) => ({
	host: one(user, {
		fields: [eventTable.hostId],
		references: [user.id],
	}),
	guests: many(participationTable),
}));

export const participationRelations = relations(
	participationTable,
	({ one }) => ({
		event: one(eventTable, {
			fields: [participationTable.eventId],
			references: [eventTable.id],
		}),
		guest: one(user, {
			fields: [participationTable.guestId],
			references: [user.id],
		}),
	}),
);
