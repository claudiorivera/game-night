const express = require("express");
const router = express.Router();

// Model
const Event = require("../models/Event");

// GET /api/events
// Params: none
// Returns all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({})
      .populate("game host guests")
      .sort({ eventDate: "asc" });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET /api/events/id/guests
// Params: Event ID
// Returns all guests going to a given event
router.get("/:id/guests", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("guests");
    res.status(200).json(event.guests);
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST /api/events/add
// Params: host (req.user), eventDate, and game (_id)
// Returns the added event
router.post("/add", (req, res) => {
  const eventToAdd = {
    host: req.user,
    eventDate: req.body.eventDate,
    game: req.body.game._id,
  };

  if (req.user) {
    const addedEvent = new Event(eventToAdd);
    addedEvent.save((error) => {
      if (error) {
        return res
          .status(400)
          .json(error.message || { message: "Something happen like error" });
      }
      res.status(200).json(addedEvent);
    });
  } else {
    res.status(400).json({ message: "Unauthorized user" });
  }
});

// PUT /api/events/id/join
// Params: event id
// Returns the event after successful join
router.put("/:id/join", async (req, res) => {
  if (req.user) {
    const event = await Event.findOne({ _id: req.params.id });
    event.guests.push(req.user);
    await event.save((error) => {
      if (error) {
        return res
          .status(400)
          .json(error.message || { message: "Something went wrong" });
      }
      res.status(200).json(event);
    });
  } else {
    res.status(400).json({ message: "Unauthorized user" });
  }
});

module.exports = router;
