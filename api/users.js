const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const User = require("../models/User");

// Routes
router.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  User.register(new User({ email, name }), password, (error, user) => {
    if (error) {
      return res.status(400).json(error);
    }
    passport.authenticate("local")(req, res, () => {
      res.status(200).json(user);
    });
  });
});

router.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res
    .status(400)
    .json({ message: "User not authenticated. Please login." });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json(null);
});

module.exports = router;
