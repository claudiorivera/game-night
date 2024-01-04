import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		API_SECRET_KEY: z.string(),
		CLERK_SECRET_KEY: z.string(),
		DATABASE_URL: z.string().url(),
		NODE_ENV: z.enum(["development", "test", "production"]),
		WEBHOOK_SECRET: z.string(),
	},
	client: {
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
	},
	runtimeEnv: {
		API_SECRET_KEY: process.env.API_SECRET_KEY,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
			process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
			process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
		WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
	},
	emptyStringAsUndefined: true,
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
