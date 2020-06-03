require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

// Route handlers
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");
const eventsRouter = require("./routes/events");
app.use("/api/users", usersRouter);
app.use("/api/games", gamesRouter);
app.use("/api/events", eventsRouter);

// If we're in production, serve the client/build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

module.exports = app;
