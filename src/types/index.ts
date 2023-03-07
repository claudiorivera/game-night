import { Prisma } from "@prisma/client";

import { populatedEvent, populatedUser } from "~/lib/prismaHelpers";

export interface Link {
  title: string;
  url: string;
}

export type PopulatedEvent = Prisma.EventGetPayload<typeof populatedEvent>;
export type PopulatedUser = Prisma.UserGetPayload<typeof populatedUser>;
