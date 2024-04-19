import type { Adapter } from "@auth/core/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "~/lib/db";
import { nextAuthConfig } from "~/lib/nextAuthConfig";

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: PrismaAdapter(db) as Adapter,
	session: { strategy: "jwt" },
	...nextAuthConfig,
});
