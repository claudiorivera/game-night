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
