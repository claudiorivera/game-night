import mongoose from "mongoose";
import User from "./User";

const EventSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  eventDateTime: {
    type: String,
  },
  // https://vegibit.com/mongoose-relationships-tutorial/
  eventGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  eventHost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventGuests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// https://stackoverflow.com/questions/39424531/mongoose-mongodb-remove-an-element-on-an-array
EventSchema.pre("remove", async function () {
  await User.updateMany(
    { eventsAttending: this },
    { $pull: { eventsAttending: this._id } },
    { multi: true }
  );
  await User.updateOne(
    { eventsHosting: this },
    { $pull: { eventsHosting: this._id } }
  );
});

EventSchema.pre("find", function () {
  this.populate("eventGuests", "name")
    .populate("eventHost", "name")
    .populate("eventGame", "name")
    .sort({
      eventDateTime: "asc",
    });
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
