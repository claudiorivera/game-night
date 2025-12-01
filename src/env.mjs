import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		BETTER_AUTH_SECRET: z.string(),
		CRON_SECRET: z.string(),
		DATABASE_URL: z.url(),
		REDIRECT_URI: z.url().optional(),
	},
	client: {
		NEXT_PUBLIC_BGG_API_ACCESS_TOKEN: z.string(),
	},
	runtimeEnv: {
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		CRON_SECRET: process.env.CRON_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		REDIRECT_URI: process.env.REDIRECT_URI,
		NEXT_PUBLIC_BGG_API_ACCESS_TOKEN:
			process.env.NEXT_PUBLIC_BGG_API_ACCESS_TOKEN,
	},
	emptyStringAsUndefined: true,
	skipValidation: !!process.env.CI || !!process.env.SKIP_VALIDATION,
});
