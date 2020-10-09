import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";

const handler = nextConnect();

handler.use(middleware);

handler
  .get(async (req, res) => {
    try {
      const events = await Event.find({})
        .populate("game host guests")
        .sort({ eventDateTime: "asc" });
      res.status(200).json(events);
    } catch (error) {
      res
        .status(400)
        .json(error.message || { message: "Something went wrong :(" });
    }
  })
  .post(async (req, res) => {
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
        res.sendStatus(201);
      });
    } else {
      res.status(400).json({ message: "Unauthorized user" });
    }
  });

export default handler;
