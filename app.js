require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const path = require("path");
const passport = require("passport");

const app = express();

// Model
const User = require("./models/User");

// Database
require("./lib/db");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

// Session middleware
app.use(
  session({
    name: "user",
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
app.use("/api/users", require("./api/users"));
app.use("/api/games", require("./api/games"));
app.use("/api/events", require("./api/events"));

// If we're in production, serve the client/build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

module.exports = app;
