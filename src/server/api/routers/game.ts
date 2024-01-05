import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

export const gameRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.game.findMany({
			select: defaultGameSelect,
		});
	}),
	import: publicProcedure
		.input(
			z.object({
				name: z.string(),
				imageSrc: z.string(),
				thumbnailSrc: z.string(),
				description: z.string(),
				authors: z.array(z.string()),
				categories: z.array(z.string()),
				mechanics: z.array(z.string()),
				bggId: z.number(),
				yearPublished: z.number(),
				minPlayers: z.number(),
				maxPlayers: z.number(),
				playingTime: z.number(),
				minAge: z.number(),
				rating: z.number(),
				numOfRatings: z.number(),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.game.create({
				data: input,
			});
		}),
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.game.findUnique({
				where: {
					id: input.id,
				},
				select: defaultGameSelect,
			});
		}),
});
