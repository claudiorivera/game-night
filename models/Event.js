import mongoose from "mongoose";
import Game from "@models/Game";

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
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  eventGuests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

EventSchema.pre("find", function () {
  this.populate("eventGame", "name imageSrc")
    .populate("eventGuests", "_id image name")
    .sort({
      eventDateTime: "asc",
    });
});

EventSchema.pre("findOne", function () {
  this.populate("eventGame", "name imageSrc")
    .populate("eventGuests", "_id image name")
    .sort({
      eventDateTime: "asc",
    });
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
