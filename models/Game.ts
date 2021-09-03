import { model, models, Schema } from "mongoose";
import { IGame } from "types";

const GameSchema = new Schema<IGame>({
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

export const GameModel = models.Game || model<IGame>("Game", GameSchema);
