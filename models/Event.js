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
  eventGuests: [
    {
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
  ],
});

EventSchema.pre("find", function () {
  this.populate("eventGuests", "name")
    .populate("eventGame", "name imageSrc")
    .sort({
      eventDateTime: "asc",
    });
});

EventSchema.pre("findOne", function () {
  console.log("in pre findOne");
  this.populate("eventGuests", "name")
    .populate("eventGame", "name imageSrc")
    .sort({
      eventDateTime: "asc",
    });
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
