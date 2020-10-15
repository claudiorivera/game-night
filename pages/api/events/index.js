import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import User from "../../../models/User";
import Game from "../../../models/Game";
import { getSession } from "next-auth/client";

const handler = nextConnect();

handler.use(middleware);

// GET api/events
// Returns all events
handler.get(async (_, res) => {
  try {
    const events = await Event.find().lean();
    res.json({
      success: true,
      message: "Successfully fetched all events",
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching all events",
    });
  }
});

// POST api/events
// Adds a new event and returns the event
handler.post(async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const event = new Event({
        eventHost: session.user.id,
        eventDateTime: req.body.eventDateTime,
        eventGame: req.body.gameId,
      });
      const user = await User.findById(session.user.id);
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
    res.status(401).json({ success: false, message: "Unauthorized user" });
  }
});

export default handler;
