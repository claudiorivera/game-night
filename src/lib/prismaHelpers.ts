import { Prisma } from "@prisma/client";

export const eventSelect = {
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

export const populatedEvent = Prisma.validator<Prisma.EventArgs>()({
  select: eventSelect,
});

export const userSelect = {
  id: true,
  name: true,
  isAdmin: true,
  eventsHosting: {
    select: eventSelect,
  },
  eventsAttending: {
    select: eventSelect,
  },
};

export const populatedUser = Prisma.validator<Prisma.UserArgs>()({
  select: userSelect,
});

export type PopulatedEvent = Prisma.EventGetPayload<typeof populatedEvent>;
export type PopulatedUser = Prisma.UserGetPayload<typeof populatedUser>;
