import nextConnect from "next-connect";
import middleware from "../../../middleware";
import User from "../../../models/User";
import Event from "../../../models/Event";

const handler = nextConnect();

handler.use(middleware);

handler
  // GET api/user/id?events
  // Returns events for user with given id
  .get(async (req, res) => {
    if ("events" in req.query) {
      if (req.query.events === "hosting") {
        try {
          const events = await Event.find({
            host: {
              _id: req.query.id,
            },
          })
            .populate("host game guests")
            .sort({ eventDateTime: "asc" })
            .lean();
          res.json({
            success: true,
            message: "Successfully fetched user events",
            events,
          });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: error.message || "Events not found",
          });
        }
      } else {
        try {
          const events = await Event.find({
            guests: {
              _id: req.query.id,
            },
          })
            .populate("host game guests")
            .lean();
          res.json({
            success: true,
            message: "Successfully fetched user events",
            events,
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message || "Events not found",
          });
        }
      }
    } else {
      res.status(400).json({ success: false, message: "Bad request" });
    }
  })
  // DELETE api/user/id
  // Deletes user with given id
  .delete(async (req, res) => {
    if (req.user) {
      const user = await User.findById(req.query.id);
      // https://stackoverflow.com/a/44342416
      await Event.updateMany(
        { guests: user._id },
        { $pull: { guests: user._id } },
        { multi: true }
      );
      res.json({ success: true, message: "Successfully deleted user" });
    } else {
      res.status(400).json({ success: false, message: "No user" });
    }
  });

export default handler;
