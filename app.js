require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/User");

const app = express();

// Db connect
require("./lib/db");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

// Passport - https://chunkbytes.com/2019/02/user-authentication-with-passport-express/
app.use(
  session({
    name: "session-id",
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Route handlers
app.use("/api/users", require("./routes/users"));
app.use("/api/games", require("./routes/games"));
app.use("/api/events", require("./routes/events"));

// If we're in production, serve the client/build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

module.exports = app;
