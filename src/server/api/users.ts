import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { usersTable } from "~/server/db/schema";

async function findByIdOrThrow(userId: string) {
	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, userId),
		with: {
			eventsHosting: {
				with: {
					host: true,
					game: true,
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
							game: true,
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

	if (!user) {
		throw new Error("User not found");
	}

	return user;
}

export const Users = {
	findByIdOrThrow,
};
