import { Prisma } from "@prisma/client";
import type { Return } from "@prisma/client/runtime/library";
import { db } from "~/lib/db";

export const defaultEventSelect = Prisma.validator<Prisma.EventSelect>()({
	id: true,
	game: true,
	host: true,
	guests: true,
	dateTime: true,
});

export function getById(userId: string) {
	return db.user.findUniqueOrThrow({
		where: {
			id: userId,
		},
		select: {
			id: true,
			name: true,
			isAdmin: true,
			eventsHosting: {
				select: defaultEventSelect,
				where: {
					dateTime: {
						gte: new Date(),
					},
				},
			},
			eventsAttending: {
				select: defaultEventSelect,
				where: {
					dateTime: {
						gte: new Date(),
					},
				},
			},
		},
	});
}

export type GetById = Awaited<Return<typeof getById>>;
export type UserEvents = GetById["eventsHosting"] | GetById["eventsAttending"];
