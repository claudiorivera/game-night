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
            .sort({ eventDateTime: "asc" });
          res.status(200).json(events);
        } catch (error) {
          return res
            .status(400)
            .json({ message: error.message || "Events not found" });
        }
      } else {
        try {
          const events = await Event.find({
            guests: {
              _id: req.query.id,
            },
          }).populate("host game guests");
          res.status(200).json(events);
        } catch (error) {
          return res
            .status(400)
            .json({ message: error.message || "Events not found" });
        }
      }
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  })
  // DELETE api/user/id
  // Deletes user with given id
  .delete(async (req, res) => {
    if (req.user) {
      await User.findById(req.query.id, (error, user) => {
        if (error)
          return res
            .status(400)
            .json({ message: error.message || "User not found" });
        // https://stackoverflow.com/a/44342416
        Event.updateMany(
          { guests: user._id },
          { $pull: { guests: user._id } },
          { multi: true },
          (error) => {
            if (error) {
              return res
                .status(400)
                .json({ message: error.message || "Unable to delete user" });
            }
          }
        );
        res.status(200).json({ message: "Successfully deleted user" });
      });
    } else {
      res.status(400).json({ message: "No user" });
    }
  });

export default handler;
