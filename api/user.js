const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const User = require("../models/User");
const Event = require("../models/Event");

// POST /api/user/register
// Params: email, name, password
// Returns user on success
router.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  User.register(new User({ email, name }), password, (error, user) => {
    if (error) {
      return res.status(400).json(error.message);
    }
    passport.authenticate("local")(req, res, () => {
      const { isAdmin, _id, email, name, dateCreated } = user;
      res.status(200).json({ isAdmin, _id, email, name, dateCreated });
    });
  });
});

// GET /api/user/id/events
// Params: User ID
// Returns all events a given user is going to
router.get("/:id/events", async (req, res) => {
  try {
    const events = await Event.find({
      guests: {
        _id: req.params.id,
      },
    }).populate("host game guests");
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET /api/user/id/events/hosting
// Params: User ID
// Returns all events a given user is hosting
router.get("/:id/events/hosting", async (req, res) => {
  try {
    const events = await Event.find({
      host: {
        _id: req.params.id,
      },
    })
      .populate("host game guests")
      .sort({ eventDateTime: "asc" });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST /api/user/login
// Params: email and password
// Returns user on success
router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    const { isAdmin, _id, email, name, dateCreated } = req.user;
    res.status(200).json({ isAdmin, _id, email, name, dateCreated });
  }
});

// GET /api/user/auth
// Returns user on success
router.get("/auth", (req, res) => {
  if (req.user) {
    const { isAdmin, _id, email, name, dateCreated } = req.user;
    res.status(200).json({ isAdmin, _id, email, name, dateCreated });
  } else {
    res.status(200).json(null);
  }
});

// GET /api/user/logout
// Params: none
// Returns null on success (for front-end user reducer)
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json(null);
});

// DELETE /api/user/:id
// Params: user id
// Returns null on success (for front-end user reducer)
router.delete("/:id", (req, res) => {
  if (req.user) {
    User.findOneAndDelete({ _id: req.params.id }, (error, user) => {
      if (error) {
        res.status(400).json(error);
      } else {
        // https://stackoverflow.com/a/44342416
        Event.updateMany(
          { guests: user._id },
          { $pull: { guests: user._id } },
          { multi: true },
          (error) => {
            if (error) {
              console.log(error);
              return res.status(400).json(null);
            }
          }
        );
        res.status(200).json(null);
      }
    });
  } else {
    res.status(400).json({ message: "No user" });
  }
});

module.exports = router;
