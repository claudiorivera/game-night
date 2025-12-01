import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { eventTable, participationTable, user } from "@/server/db/schema";

export type User = InferSelectModel<typeof user>;
export type Event = InferSelectModel<typeof eventTable>;
export type Participation = InferSelectModel<typeof participationTable>;

export type UserInsertInput = InferInsertModel<typeof user>;
export type EventInsertInput = InferInsertModel<typeof eventTable>;
export type ParticipationInsertInput = InferInsertModel<
	typeof participationTable
>;
