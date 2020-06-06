require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const path = require("path");

const app = express();

// Database
require("./lib/db");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

app.use(
  session({
    name: "session-id",
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

// Route handlers
app.use("/api/users", require("./routes/users"));
app.use("/api/games", require("./routes/games"));
app.use("/api/events", require("./routes/events"));

// If we're in production, serve the client/build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

module.exports = app;
