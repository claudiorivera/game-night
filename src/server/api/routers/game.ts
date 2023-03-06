import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const defaultGameSelect = {
  id: true,
  name: true,
  imageSrc: true,
  bggId: true,
  yearPublished: true,
  authors: true,
  categories: true,
  mechanics: true,
  thumbnailSrc: true,
  description: true,
  minPlayers: true,
  maxPlayers: true,
  playingTime: true,
  minAge: true,
  rating: true,
  numOfRatings: true,
};

export const gameRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany({
      select: defaultGameSelect,
    });
  }),
  import: protectedProcedure
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
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.game.create({
        data: input,
      });
    }),
});
