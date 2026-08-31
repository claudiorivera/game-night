import { relations } from "drizzle-orm";
import {
	account,
	eventTable,
	participationTable,
	session,
	user,
} from "@/server/db/schema";

export const userRelations = relations(user, ({ many }) => ({
	eventsHosting: many(eventTable),
	eventsAttending: many(participationTable),
	sessions: many(session),
	accounts: many(account),
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

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
