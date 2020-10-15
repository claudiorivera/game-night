import mongoose from "mongoose";
import Game from "./Game";

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
  eventGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  eventHost: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  eventGuests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: [],
    },
  ],
});

EventSchema.pre("find", function () {
  this.populate("eventGuests", "name")
    .populate("eventHost", "name")
    .populate("eventGame")
    .sort({
      eventDateTime: "asc",
    });
});

EventSchema.pre("findOne", function () {
  this.populate("eventGuests", "name")
    .populate("eventHost", "name")
    .populate("eventGame")
    .sort({
      eventDateTime: "asc",
    });
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
