import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const defaultEventSelect = {
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
};

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        dateTime: z.date().nullish(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (!input.dateTime)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing DateTime.",
        });

      return ctx.prisma.event.create({
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
    return ctx.prisma.event.findMany({
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
    return ctx.prisma.event.findMany({
      where: {
        hostId: ctx.session.user.id,
      },
      select: defaultEventSelect,
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      select: defaultEventSelect,
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findUnique({
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
  deleteById: protectedProcedure
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
      return ctx.prisma.event.update({
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
  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          gameId: z.string(),
          dateTime: z.string(),
        }),
      })
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
