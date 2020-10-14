import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

// GET api/events
// Returns all events
handler.get(async (_, res) => {
  try {
    const events = await Event.find({})
      .populate([
        { path: "host", model: "Event" },
        { path: "game", model: "Event" },
        { path: "guests", model: "Event" },
      ])
      .sort({ eventDateTime: "asc" })
      .lean();
    res.json({
      success: true,
      message: "Successfully fetched all events",
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching all events",
      events: null,
    });
  }
});

// POST api/events
// Adds a new event and returns the event
handler.post(async (req, res) => {
  if (req.user) {
    try {
      const event = new Event({
        host: req.user,
        eventDateTime: req.body.eventDateTime,
        game: req.body.gameId,
      });
      const user = await User.findById(req.user._id);
      user.eventsHosting.push(event);
      await event.save();
      await user.save();
      res.status(201).json({
        success: true,
        message: "Successfully added event",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Unable to add event",
      });
    }
  } else {
    res.status(500).json({ success: false, message: "Unauthorized user" });
  }
});

export default handler;
