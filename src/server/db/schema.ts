import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
	index,
	int,
	primaryKey,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "next-auth/adapters";

function id() {
	return text("id", { length: 128 })
		.primaryKey()
		.$defaultFn(() => createId());
}

export const usersTable = sqliteTable("user", {
	id: id(),
	name: text("name", { length: 255 }),
	email: text("email", { length: 255 }).notNull(),
	emailVerified: int("emailVerified", { mode: "timestamp_ms" }),
	image: text("image", { length: 255 }),
	isAdmin: int("isAdmin", { mode: "boolean" }).default(false),
	isDemo: int("isDemo", { mode: "boolean" }).default(false),
});

export const userRelations = relations(usersTable, ({ many }) => ({
	eventsHosting: many(eventsTable),
	accounts: many(accountsTable),
	sessions: many(sessionsTable),
	eventsAttending: many(eventGuestTable),
}));

export const eventsTable = sqliteTable("event", {
	id: id(),
	dateTime: int("dateTime", { mode: "timestamp" }).notNull(),
	hostId: text("hostId", { length: 255 })
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	gameId: text("gameId", { length: 255 })
		.notNull()
		.references(() => gamesTable.id, { onDelete: "cascade" }),
});

export const eventRelations = relations(eventsTable, ({ many, one }) => ({
	host: one(usersTable, {
		fields: [eventsTable.hostId],
		references: [usersTable.id],
	}),
	game: one(gamesTable, {
		fields: [eventsTable.gameId],
		references: [gamesTable.id],
	}),
	guests: many(eventGuestTable),
}));

export const eventGuestTable = sqliteTable(
	"eventGuest",
	{
		guestId: text("guestId")
			.notNull()
			.references(() => usersTable.id),
		eventId: text("eventId")
			.notNull()
			.references(() => eventsTable.id),
	},
	(eventGuest) => ({
		pk: primaryKey({ columns: [eventGuest.guestId, eventGuest.eventId] }),
	}),
);

export const eventGuestRelations = relations(eventGuestTable, ({ one }) => ({
	event: one(eventsTable, {
		fields: [eventGuestTable.eventId],
		references: [eventsTable.id],
	}),
	guest: one(usersTable, {
		fields: [eventGuestTable.guestId],
		references: [usersTable.id],
	}),
}));

export const gamesTable = sqliteTable("game", {
	id: id(),
	name: text("name", { length: 255 }).notNull(),
	imageSrc: text("imageSrc", { length: 255 }).notNull(),
	thumbnailSrc: text("thumbnailSrc", { length: 255 }).notNull(),
	description: text("description").notNull(),
	authors: text("authors", { mode: "json" }).$type<Array<string>>().notNull(),
	categories: text("categories", { mode: "json" })
		.$type<Array<string>>()
		.notNull(),
	mechanics: text("mechanics", { mode: "json" })
		.$type<Array<string>>()
		.notNull(),
	bggId: int("bggId").unique().notNull(),
	yearPublished: int("yearPublished").notNull(),
	minPlayers: int("minPlayers").notNull(),
	maxPlayers: int("maxPlayers").notNull(),
	playingTime: int("playingTime").notNull(),
	minAge: int("minAge").notNull(),
	rating: real("rating").notNull(),
	numOfRatings: int("numOfRatings").notNull(),
});

export const gameRelations = relations(gamesTable, ({ many }) => ({
	events: many(eventsTable),
}));

export const accountsTable = sqliteTable(
	"account",
	{
		userId: text("userId", { length: 255 })
			.notNull()
			.references(() => usersTable.id),
		type: text("type", { length: 255 })
			.$type<AdapterAccount["type"]>()
			.notNull(),
		provider: text("provider", { length: 255 }).notNull(),
		providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: int("expires_at"),
		token_type: text("token_type", { length: 255 }),
		scope: text("scope", { length: 255 }),
		id_token: text("id_token"),
		session_state: text("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
		userIdIdx: index("account_userId_idx").on(account.userId),
	}),
);

export const accountRelations = relations(accountsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [accountsTable.userId],
		references: [usersTable.id],
	}),
}));

export const sessionsTable = sqliteTable(
	"session",
	{
		sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
		userId: text("userId", { length: 255 })
			.notNull()
			.references(() => usersTable.id),
		expires: int("expires", { mode: "timestamp" }).notNull(),
	},
	(session) => ({
		userIdIdx: index("session_userId_idx").on(session.userId),
	}),
);

export const sessionRelations = relations(sessionsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [sessionsTable.userId],
		references: [usersTable.id],
	}),
}));

export const verificationTokensTable = sqliteTable(
	"verificationToken",
	{
		identifier: text("identifier", { length: 255 }).notNull(),
		token: text("token", { length: 255 }).notNull(),
		expires: int("expires", { mode: "timestamp" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);
