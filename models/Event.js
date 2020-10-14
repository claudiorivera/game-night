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
EventSchema.pre("remove", async function () {
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

export default Event =
  mongoose.models.Event || mongoose.model("Event", EventSchema);
