import { Prisma } from "@prisma/client";
import { z } from "zod";
import type { RouterOutputs } from "~/lib/api";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

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

export const eventRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				gameId: z.string(),
				dateTime: z.date(),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.db.event.create({
				data: {
					dateTime: input.dateTime,
					game: {
						connect: {
							id: input.gameId,
						},
					},
					host: {
						connect: {
							id: ctx.session.user.id,
						},
					},
				},
				select: defaultEventSelect,
			});
		}),
	getAttending: protectedProcedure.query(({ ctx }) => {
		return ctx.db.event.findMany({
			where: {
				guests: {
					some: {
						id: ctx.session.user.id,
					},
				},
			},
			select: defaultEventSelect,
		});
	}),
	getHosting: protectedProcedure.query(({ ctx }) => {
		return ctx.db.event.findMany({
			where: {
				hostId: ctx.session.user.id,
			},
			select: defaultEventSelect,
		});
	}),
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.event.findMany({
			select: defaultEventSelect,
		});
	}),
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.db.event.findUnique({
				where: {
					id: input.id,
				},
				select: {
					...defaultEventSelect,
					game: {
						select: {
							...defaultEventSelect.game.select,
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
						},
					},
				},
			});
		}),
	deleteById: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.db.event.delete({
				where: {
					id: input.id,
				},
			});
		}),
	joinById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.db.event.update({
				where: {
					id: input.id,
				},
				data: {
					guests: {
						connect: {
							id: ctx.session.user.id,
						},
					},
				},
			});
		}),
	leaveById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.db.event.update({
				where: {
					id: input.id,
				},
				data: {
					guests: {
						disconnect: {
							id: ctx.session.user.id,
						},
					},
				},
			});
		}),
	updateById: publicProcedure
		.input(
			z.object({
				id: z.string(),
				data: z.object({
					gameId: z.string(),
					dateTime: z.date(),
				}),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.db.event.update({
				where: {
					id: input.id,
				},
				data: {
					dateTime: input.data.dateTime,
					game: {
						connect: {
							id: input.data.gameId,
						},
					},
				},
			});
		}),
});

export type EventGetByIdOutput = RouterOutputs["event"]["getById"];
export type EventGetAllOutput = RouterOutputs["event"]["getAll"];
