const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Game = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  // name, authors, imageSrc, thumbnailSrc, description, yearPublished, minPlayers, maxPlayers, playingTime, minAge, categories
  // gameMechanics, bggId, rating, numOfRatings,
});

module.exports = mongoose.model("Game", Game);
