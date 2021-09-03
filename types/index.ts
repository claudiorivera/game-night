import { PopulatedDoc, Types } from "mongoose";

export interface Link {
  title: string;
  url: string;
}

export interface IEvent {
  _id: Types.ObjectId;
  eventDateTime: Date;
  eventGame: PopulatedDoc<IGame & Document>;
  eventHost: PopulatedDoc<IUser & Document>;
  eventGuests: PopulatedDoc<IUser & Document>[];
}

export interface IGame {
  _id: Types.ObjectId;
  name: string;
  imageSrc: string;
  thumbnailSrc: string;
  description: string;
  authors: string[];
  categories: string[];
  gameMechanics: string[];
  bggId: number;
  yearPublished: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  minAge: number;
  rating: number;
  numOfRatings: number;
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  image: string;
  isAdmin: boolean;
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
  gameMechanics: string[];
}

export interface BGGQueryResponse {
  type: string;
  value: string;
}
