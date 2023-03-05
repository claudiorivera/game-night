import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const defaultEventSelect = {
  id: true,
  game: true,
  host: true,
  guests: true,
  dateTime: true,
};

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        name: true,
        eventsHosting: {
          select: defaultEventSelect,
        },
        eventsAttending: {
          select: defaultEventSelect,
        },
      },
    });
  }),
});
