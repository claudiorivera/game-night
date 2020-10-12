import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

handler
  // GET api/events
  // Returns all events
  .get(async (_, res) => {
    try {
      const events = await Event.find({}).sort({ eventDateTime: "asc" }).lean();
      res.json({
        success: true,
        message: "Successfully fetched all events",
        events,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: "Events not found" });
    }
  })
  // POST api/events
  // Adds a new event and returns the event
  .post(async (req, res) => {
    if (req.user) {
      try {
        const event = new Event({
          host: req.user,
          eventDateTime: req.body.eventDateTime,
          game: req.body.gameId,
        });
        const user = await User.findById(req.user._id).exec();
        user.eventsHosting.push(event);
        const savedEvent = await event.save();
        await user.save();
        res.status(201).json({
          success: true,
          message: "Successfully added event",
          event: savedEvent,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message || "Unable to add event",
        });
      }
    } else {
      res.status(400).json({ success: false, message: "Unauthorized user" });
    }
  });

export default handler;
