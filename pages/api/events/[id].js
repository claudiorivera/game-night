import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";

const handler = nextConnect();

handler.use(middleware);

handler
  .get(async (req, res) => {
    if ("guests" in req.query) {
      try {
        const event = await Event.findById(req.query.id);
        res.status(200).json(event.guests);
      } catch (error) {
        res
          .status(400)
          .json(error.message || { message: "Something went wrong :(" });
      }
    } else {
      try {
        const event = await Event.findById(req.query.id).populate(
          "guests host game"
        );
        res.status(200).json(event);
      } catch (error) {
        res
          .status(400)
          .json(error.message || { message: "Something went wrong :(" });
      }
    }
  })
  .delete(async (req, res) => {
    try {
      const event = await Event.findById(req.query.id);
      event.remove();
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      res
        .status(400)
        .json(error.message || { message: "Something went wrong :(" });
    }
  })
  .put(async (req, res) => {
    if (req.user) {
      const event = await Event.findByIdAndUpdate(req.query.id, {
        game: req.body.gameId,
        eventDateTime: req.body.eventDateTime,
      });
      res.status(200).json(event);
    } else {
      res.status(400).json({ message: "Unauthorized user" });
    }
  });

export default handler;
