const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameLowerCase: true,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
