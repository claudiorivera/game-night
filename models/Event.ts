import { model, models, Schema } from "mongoose";
import { IEvent } from "types";

const EventSchema = new Schema<IEvent>({
  eventDateTime: {
    type: String,
    required: true,
  },
  eventGame: { type: "ObjectId", ref: "Game", required: true },
  eventHost: { type: "ObjectId", ref: "User", required: true },
  eventGuests: [{ type: "ObjectId", ref: "User", required: true }],
});

export const EventModel = models.Event || model<IEvent>("Event", EventSchema);
