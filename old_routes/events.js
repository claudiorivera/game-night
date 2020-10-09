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
