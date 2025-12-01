import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { BROWSER } from "esm-env";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<typeof auth>()],
	baseURL: BROWSER ? window.location.origin : undefined,
});

export const { signOut, useSession } = authClient;

export type Session = typeof auth.$Infer.Session;
export type SessionUser = Session["user"];
