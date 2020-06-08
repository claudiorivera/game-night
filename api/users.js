const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const User = require("../models/User");

// Routes

// POST /api/users/register
// Params: email, name, password
// Returns user on success
router.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  User.register(new User({ email, name }), password, (error, user) => {
    if (error) {
      return res.status(400).json(error.message);
    }
    passport.authenticate("local")(req, res, () => {
      res.status(200).json(user);
    });
  });
});

// POST /api/users/login
// Params: email and password
// Returns user on success
router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  }
});

// GET /api/users/logout
// Params: none
// Returns null on success (for front-end user reducer)
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json(null);
});

// DELETE /api/users/:id
// Params: user id
// Returns null on success (for front-end user reducer)
router.delete("/:id", async (req, res) => {
  if (req.user) {
    User.findOneAndDelete({ _id: req.params.id }, (error) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(null);
      }
    });
  } else {
    res.status(400).json({ message: "No user" });
  }
});

module.exports = router;
