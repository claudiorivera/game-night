import { eq } from "drizzle-orm";
import { db } from "~/db";
import { usersTable } from "~/db/schema";

export async function findByIdOrThrow(userId: string) {
	return db.query.usersTable
		.findFirst({
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
		})
		.then((user) => {
			if (!user) {
				throw new Error("User not found");
			}

			return user;
		});
}
