import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	pgTable,
	primaryKey,
	real,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

function id() {
	return text("id")
		.primaryKey()
		.$defaultFn(() => createId());
}

export const usersTable = pgTable("user", {
	id: id(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	isAdmin: boolean("isAdmin").default(false),
	isDemo: boolean("isDemo").default(false),
});

export const userRelations = relations(usersTable, ({ many }) => ({
	eventsHosting: many(eventsTable),
	accounts: many(accountsTable),
	sessions: many(sessionsTable),
	eventsAttending: many(eventGuestTable),
}));

export const eventsTable = pgTable("event", {
	id: id(),
	dateTime: timestamp("dateTime").notNull(),
	hostId: text("hostId")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	gameId: text("gameId")
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

export const eventGuestTable = pgTable(
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

export const gamesTable = pgTable("game", {
	id: id(),
	name: text("name").notNull(),
	imageSrc: text("imageSrc").notNull(),
	thumbnailSrc: text("thumbnailSrc").notNull(),
	description: text("description").notNull(),
	authors: text("authors").array().notNull(),
	categories: text("categories").array().notNull(),
	mechanics: text("mechanics").array().notNull(),
	bggId: integer("bggId").unique().notNull(),
	yearPublished: integer("yearPublished").notNull(),
	minPlayers: integer("minPlayers").notNull(),
	maxPlayers: integer("maxPlayers").notNull(),
	playingTime: integer("playingTime").notNull(),
	minAge: integer("minAge").notNull(),
	rating: real("rating").notNull(),
	numOfRatings: integer("numOfRatings").notNull(),
});

export const gameRelations = relations(gamesTable, ({ many }) => ({
	events: many(eventsTable),
}));

export const accountsTable = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => usersTable.id),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
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

export const sessionsTable = pgTable(
	"session",
	{
		sessionToken: text("sessionToken").notNull().primaryKey(),
		userId: text("userId")
			.notNull()
			.references(() => usersTable.id),
		expires: timestamp("expires", { mode: "date" }).notNull(),
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

export const verificationTokensTable = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires").notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

export const authenticatorsTable = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	}),
);
