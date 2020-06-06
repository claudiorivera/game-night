const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const User = require("../models/User");

// https://chunkbytes.com/2019/02/user-authentication-with-passport-express/
router.post("/register", (req, res, next) => {
  const { email, password, name } = req.body;
  User.register(
    new User({
      email,
      name,
    }),
    password,
    (error, user) => {
      if (error) {
        res.status(400).json(error);
      } else {
        passport.authenticate("local")(req, res, () => {
          User.findOne(
            {
              email,
            },
            (error, person) => {
              const user = req.user;
              res.status(200).json({ user });
            }
          );
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const { email } = req.body;
  User.findOne(
    {
      email,
    },
    (error, person) => {
      const user = req.user;
      res.status(200).json({ user });
    }
  );
});

// https://stackoverflow.com/questions/36486397/passport-login-and-persisting-session
const isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  else
    return res.status(401).json({
      isAuthenticated: false,
    });
};
router.get("/auth", isAuthenticated, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.logout();
    req.session.destroy((error) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.clearCookie("session-id");
        res.json({
          message: "You are successfully logged out!",
        });
      }
    });
  } else {
    const error = new Error("You are not logged in!");
    error.status = 403;
    next(error);
  }
});

module.exports = router;
