import type { Config } from "drizzle-kit";

import { env } from "~/env";

export default {
	schema: "./src/db/schema.ts",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: env.TURSO_DATABASE_URL,
		authToken: env.TURSO_AUTH_TOKEN,
	},
} satisfies Config;
