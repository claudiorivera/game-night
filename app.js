require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");

const app = express();

// Db config and connect
const db = mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log(`MongoDB connected`)
);

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

// Route handlers
app.use("/api/users", require("./routes/users"));
app.use("/api/games", require("./routes/games"));
app.use("/api/events", require("./routes/events"));

// If we're in production, serve the client/build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

module.exports = app;
