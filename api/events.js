const express = require("express");
const router = express.Router();

// Model
const Event = require("../models/Event");

// GET /api/events
// Params: none
// Returns all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({}).sort({ eventDate: "asc" });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT /api/events/add
// Params: host (req.user), eventDate, and game (_id)
// Returns the added event
router.put("/add", (req, res) => {
  const eventToAdd = {
    host: req.user,
    eventDate: req.body.eventDate,
    game: req.body.game._id,
  };

  if (req.user) {
    const addedEvent = new Event(eventToAdd);
    addedEvent.save((error) => {
      if (error) {
        res
          .status(400)
          .json(error.message || { message: "Something happen like error" });
      } else {
        res.status(200).json(addedEvent);
      }
    });
  } else {
    res.status(400).json({ message: "Unauthorized user" });
  }
});

module.exports = router;
