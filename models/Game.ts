import { model, models, Schema, Types } from "mongoose";

export interface Game {
  _id?: Types.ObjectId;
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

const GameSchema = new Schema<Game>({
  name: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  thumbnailSrc: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  gameMechanics: {
    type: [String],
    required: true,
  },
  bggId: {
    type: Number,
    required: true,
    unique: true,
  },
  yearPublished: {
    type: Number,
    required: true,
  },
  minPlayers: {
    type: Number,
    required: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
  },
  playingTime: {
    type: Number,
    required: true,
  },
  minAge: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  numOfRatings: {
    type: Number,
    required: true,
  },
});

export default models.Game || model<Game>("Game", GameSchema);
