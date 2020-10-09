import session from "express-session";
import mongoose from "mongoose";

const MongoStore = require("connect-mongo")(session);

const sessionMiddleware = (req, res, next) =>
  session({
    name: "game-night-user-session",
    cookie: {
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 2,
    },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: false,
  })(req, res, next);

export default sessionMiddleware;
