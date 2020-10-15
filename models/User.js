import mongoose from "mongoose";
// import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
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

UserSchema.pre("save", async function () {
  console.log("in pre save");
});

// User.plugin(passportLocalMongoose, {
//   usernameField: "email",
//   errorMessages: {
//     UserExistsError: "A user with the given email is already registered",
//   },
// });

export default mongoose.models.User || mongoose.model("User", UserSchema);
