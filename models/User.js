import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  eventsAttending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  ],
  eventsHosting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
