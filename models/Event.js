const mongoose = require("mongoose");
const User = require("./User");

const Event = new mongoose.Schema({
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
    require: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// https://stackoverflow.com/questions/39424531/mongoose-mongodb-remove-an-element-on-an-array
Event.pre("remove", async function () {
  await User.updateMany(
    { events: this },
    { $pull: { events: this._id } },
    { multi: true }
  );
  await User.updateOne(
    { eventsHosting: this },
    { $pull: { eventsHosting: this._id } }
  );
});

module.exports = mongoose.models.Event || mongoose.model("Event", Event);
