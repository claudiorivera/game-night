import { Prisma } from "@prisma/client";
import { z } from "zod";

import { defaultGameSelect } from "~/server/api/routers/game";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const defaultEventSelect = Prisma.validator<Prisma.EventSelect>()({
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
			clerkId: true,
		},
	},
	guests: {
		select: {
			id: true,
			clerkId: true,
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
			return ctx.prisma.event.create({
				data: {
					dateTime: input.dateTime,
					game: {
						connect: {
							id: input.gameId,
						},
					},
					host: {
						connectOrCreate: {
							where: {
								clerkId: ctx.auth.userId,
							},
							create: {
								clerkId: ctx.auth.userId,
							},
						},
					},
				},
				select: defaultEventSelect,
			});
		}),
	getAttending: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.event.findMany({
			where: {
				guests: {
					some: {
						clerkId: ctx.auth.userId,
					},
				},
			},
			select: defaultEventSelect,
		});
	}),
	getHosting: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.event.findMany({
			where: {
				hostId: ctx.auth.userId,
			},
			select: defaultEventSelect,
		});
	}),
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.event.findMany({
			select: defaultEventSelect,
		});
	}),
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.event.findUnique({
				where: {
					id: input.id,
				},
				select: {
					...defaultEventSelect,
					game: {
						select: defaultGameSelect,
					},
				},
			});
		}),
	deleteById: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.event.delete({
				where: {
					id: input.id,
				},
			});
		}),
	joinById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.event.update({
				where: {
					id: input.id,
				},
				data: {
					guests: {
						connectOrCreate: {
							where: {
								clerkId: ctx.auth.userId,
							},
							create: {
								clerkId: ctx.auth.userId,
							},
						},
					},
				},
			});
		}),
	leaveById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.event.update({
				where: {
					id: input.id,
				},
				data: {
					guests: {
						disconnect: {
							clerkId: ctx.auth.userId,
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
			return ctx.prisma.event.update({
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
