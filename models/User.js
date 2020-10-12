const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema({
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
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  eventsHosting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

User.plugin(passportLocalMongoose, {
  usernameUnique: false,
  usernameField: "email",
  errorMessages: {
    UserExistsError: "A user with the given email is already registered",
  },
});

module.exports = mongoose.models.User || mongoose.model("User", User);
