const express = require("express");
const router = express.Router();

// Model
const Event = require("../models/Event");
const User = require("../models/User");

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
    res
      .status(400)
      .json(error.message || { message: "Something went wrong :(" });
  }
});

// GET /api/events/id
// Params: Event ID
// Returns event with given ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "guests host game"
    );
    res.status(200).json(event);
  } catch (error) {
    res
      .status(400)
      .json(error.message || { message: "Something went wrong :(" });
  }
});

// DELETE /api/events/id
// Params: Event ID
// Returns success message
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.remove();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res
      .status(400)
      .json(error.message || { message: "Something went wrong :(" });
  }
});

// GET /api/events/id/guests
// Params: Event ID
// Returns all guests going to a given event
router.get("/:id/guests", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event.guests);
  } catch (error) {
    res
      .status(400)
      .json(error.message || { message: "Something went wrong :(" });
  }
});

// POST /api/events/add
// Params: host (req.user), eventDate, and game (_id)
// Returns the added event
router.post("/add", (req, res) => {
  const eventToAdd = {
    host: req.user,
    eventDateTime: req.body.eventDateTime,
    game: req.body.gameId,
  };

  if (req.user) {
    const addedEvent = new Event(eventToAdd);
    addedEvent.save((error) => {
      if (error) {
        return res
          .status(400)
          .json(error.message || { message: "Something went wrong :(" });
      }
      res.status(200).json(addedEvent);
    });
  } else {
    res.status(400).json({ message: "Unauthorized user" });
  }
});

// PUT /api/events/id/edit
// Params: eventDate, and game (_id)
// Returns the edited event
router.put("/:id/edit", async (req, res) => {
  if (req.user) {
    const event = await Event.findByIdAndUpdate(req.params.id, {
      game: req.body.gameId,
      eventDateTime: req.body.eventDateTime,
    });
    res.status(200).json(event);
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
    if (event.host.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Can't join an event you're hosting" });
    }
    event.guests.addToSet(req.user);
    try {
      const user = await User.findById(req.user._id);
      user.events.push(event);
      await user.save((error) => {
        if (error) return res.status(400).json(error);
      });
    } catch (error) {
      return res.status(400).json(error);
    }
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

// PUT /api/events/id/leave
// Params: event id
// Returns the event after successful leave
router.put("/:id/leave", async (req, res) => {
  if (req.user) {
    const event = await Event.findOne({ _id: req.params.id });
    if (event.host.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message:
          "Can't leave an event you're hosting. Delete the event instead.",
      });
    }
    event.guests.pull(req.user);
    try {
      const user = await User.findById(req.user._id);
      user.events.pull(event);
      await user.save((error) => {
        if (error)
          return res
            .status(400)
            .json(error.message || { message: "Something went wrong :(" });
      });
    } catch (error) {
      return res
        .status(400)
        .json(error.message || { message: "Something went wrong :(" });
    }
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
