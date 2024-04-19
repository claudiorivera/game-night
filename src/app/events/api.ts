import { Prisma } from "@prisma/client";
import type { Return } from "@prisma/client/runtime/library";
import { defaultGameSelect } from "~/app/games/api";
import { db } from "~/lib/db";

const defaultEventSelect = Prisma.validator<Prisma.EventSelect>()({
	id: true,
	dateTime: true,
	game: {
		select: {
			id: true,
			name: true,
			imageSrc: true,
		},
	},
	host: {
		select: {
			id: true,
			name: true,
			image: true,
		},
	},
	guests: {
		select: {
			id: true,
			name: true,
			image: true,
		},
	},
});

export function getAttendingByUserId(userId: string) {
	return db.event.findMany({
		where: {
			guests: {
				some: {
					id: userId,
				},
			},
		},
		select: defaultEventSelect,
	});
}

export function getHostingByUserId(userId: string) {
	return db.event.findMany({
		where: {
			hostId: userId,
		},
		select: defaultEventSelect,
	});
}

export function getAll() {
	return db.event.findMany({
		select: defaultEventSelect,
		where: {
			dateTime: {
				gte: new Date(),
			},
		},
	});
}

export function getById(id: string) {
	return db.event.findUniqueOrThrow({
		where: {
			id,
		},
		select: {
			...defaultEventSelect,
			game: {
				select: {
					...defaultGameSelect,
				},
			},
		},
	});
}

export type GetAttendingByUserId = Awaited<Return<typeof getAttendingByUserId>>;
export type GetAll = Awaited<Return<typeof getAll>>;
export type GetById = Awaited<Return<typeof getById>>;
