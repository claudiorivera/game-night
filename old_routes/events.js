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
