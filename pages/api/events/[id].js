import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();

handler.use(middleware);

handler
  .get(async (req, res) => {
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
  });

export default handler;
