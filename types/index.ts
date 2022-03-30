import { Prisma } from "@prisma/client";
import { populatedEvent, populatedUser } from "lib/api";

export interface Link {
  title: string;
  url: string;
}

export interface BGGGameResponse {
  bggId: number;
  imageSrc: string;
  thumbnailSrc: string;
  description: string;
  yearPublished: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  minAge: number;
  rating: number;
  numOfRatings: number;
  name: string;
  authors: string[];
  categories: string[];
  mechanics: string[];
}

export interface BGGQueryResponse {
  type: string;
  value: string;
}

export type PopulatedEvent = Prisma.EventGetPayload<typeof populatedEvent>;
export type PopulatedUser = Prisma.UserGetPayload<typeof populatedUser>;
