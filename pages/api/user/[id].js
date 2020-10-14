import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import User from "../../../models/User";
import Game from "../../../models/Game";

const handler = nextConnect();

handler.use(middleware);

// GET api/user/id?events
// Returns events for user with given id
handler.get(async (req, res) => {
  switch (req.query.events) {
    case "hosting":
      try {
        const events = await Event.find({ eventHost: req.user._id }).lean();
        res.json({
          success: true,
          message: "Successfully fetched events user hosting",
          events,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message || "Hosting events not found",
        });
      }
      return;
    case "attending":
      try {
        const events = await Event.find({
          eventGuests: {
            _id: req.query.id,
          },
        }).lean();
        res.json({
          success: true,
          message: "Successfully fetched events user attending",
          events,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message || "Attending events not found",
        });
      }
      return;
    default:
      res.status(400).json({ success: false, message: "Bad request" });
      return;
  }
});

// DELETE api/user/id
// Deletes user with given id
handler.delete(async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.query.id);
    // https://stackoverflow.com/a/44342416
    await Event.updateMany(
      { eventGuests: user._id },
      { $pull: { eventGuests: user._id } },
      { multi: true }
    );
    await user.deleteOne(); // https://mongoosejs.com/docs/deprecations.html
    res.json({ success: true, message: "Successfully deleted user" });
  } else {
    res.status(500).json({ success: false, message: "No user" });
  }
});

export default handler;
