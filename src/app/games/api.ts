import { Prisma } from "@prisma/client";
import type { Return } from "@prisma/client/runtime/library";
import { db } from "~/lib/db";

export const defaultGameSelect = Prisma.validator<Prisma.GameSelect>()({
	id: true,
	name: true,
	imageSrc: true,
	authors: true,
	categories: true,
	mechanics: true,
	bggId: true,
	thumbnailSrc: true,
	description: true,
	yearPublished: true,
	minPlayers: true,
	maxPlayers: true,
	playingTime: true,
	minAge: true,
	rating: true,
	numOfRatings: true,
});

export function getAll() {
	return db.game.findMany({
		select: defaultGameSelect,
	});
}

export type GetAll = Awaited<Return<typeof getAll>>;
