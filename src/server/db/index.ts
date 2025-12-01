import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env.mjs";
import * as relations from "./relations";
import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, {
	schema: { ...schema, ...relations },
	logger: true,
});

export * from "./schema";
export * from "./types";
