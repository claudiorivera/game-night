const mongoose = require("mongoose");
const User = require("./User");

const EventSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  eventDateTime: {
    type: String,
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

// https://stackoverflow.com/questions/39424531/mongoose-mongodb-remove-an-element-on-an-array
EventSchema.pre("remove", function (next) {
  User.updateMany(
    { events: this },
    { $pull: { events: this._id } },
    { multi: true }
  ).exec(next);
});

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
