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
    switch (req.query.events) {
      case "hosting":
        try {
          const user = await User.findById(req.query.id);
          res.json({
            success: true,
            message: "Successfully fetched events user hosting",
            events: user.eventsHosting,
          });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: error.message || "Hosting events not found",
          });
        }
        return;
      case "attending":
        try {
          const events = await Event.find({
            guests: {
              _id: req.query.id,
            },
          }).lean();
          res.json({
            success: true,
            message: "Successfully fetched events user attending",
            events,
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message || "Attending events not found",
          });
        }
        return;
      default:
        res.status(400).json({ success: false, message: "Bad request" });
        return;
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
