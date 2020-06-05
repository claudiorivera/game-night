const express = require("express");
const router = express.Router();
const passport = require("passport");
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
        res.status(500).json(error);
      } else {
        passport.authenticate("local")(req, res, () => {
          User.findOne(
            {
              email,
            },
            (error, person) => {
              res.status(200).json({
                success: true,
                status: "Registration Successful!",
                user: req.user,
              });
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
    (err, person) => {
      res.status(200).json({
        success: true,
        status: "You are successfully logged in!",
        user: req.user,
      });
    }
  );
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("session-id");
        res.json({
          message: "You are successfully logged out!",
        });
      }
    });
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
