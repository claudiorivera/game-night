import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
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
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  gameMechanics: {
    type: Array,
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

export default mongoose.models.Game || mongoose.model("Game", GameSchema);
