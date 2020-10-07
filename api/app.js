const express = require("express");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

const app = express();

// Model
const User = require("./models/User");

// Database
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("MongoDB connected")
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware
app.use(
  session({
    name: "game-night-user-session",
    cookie: {
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 2,
    },
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Route handlers
app.use("/api/user", require("./api/user"));
app.use("/api/games", require("./api/games"));
app.use("/api/events", require("./api/events"));

module.exports = app;
