import "server-only";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";

export class AuthenticationError extends Error {
	constructor(message = "You must be logged in to perform this action") {
		super(message);
		this.name = "AuthenticationError";
	}
}

export async function getSessionUser() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return session?.user;
}

async function findByIdOrThrow(userId: string) {
	const existingUser = await db.query.user.findFirst({
		where: eq(user.id, userId),
		with: {
			eventsHosting: {
				with: {
					host: true,
					guests: {
						with: {
							guest: true,
						},
					},
				},
			},
			eventsAttending: {
				with: {
					event: {
						with: {
							host: true,
							guests: {
								with: {
									guest: true,
								},
							},
						},
					},
				},
			},
		},
	});

	if (!existingUser) {
		throw new Error("User not found");
	}

	return existingUser;
}

export const Users = {
	findByIdOrThrow,
};
