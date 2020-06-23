const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  eventDateTime: {
    type: Date,
    required: true,
  },
  // https://vegibit.com/mongoose-relationships-tutorial/
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Event", Event);
