import { Document, model, models, PopulatedDoc, Schema, Types } from "mongoose";
import { Game } from "./Game";
import { User } from "./User";

export interface Event {
  _id: Types.ObjectId;
  eventDateTime: string;
  eventGame: PopulatedDoc<Game & Document>;
  eventHost: PopulatedDoc<User & Document>;
  eventGuests: PopulatedDoc<User & Document>[];
}
const EventSchema = new Schema<Event>({
  eventDateTime: {
    type: String,
    required: true,
  },
  eventGame: { type: Types.ObjectId, ref: "Game", required: true },
  eventHost: { type: Types.ObjectId, ref: "User", required: true },
  eventGuests: [{ type: Types.ObjectId, ref: "User", required: true }],
});

export default models.Event || model<Event>("Event", EventSchema);
