import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

handler
  // GET api/events/id
  // Returns event with given id
  .get(async (req, res) => {
    // GET api/events/id?guests
    // Returns guests attending event with given id
    if ("guests" in req.query) {
      try {
        const event = await Event.findById(req.query.id).lean();
        res.json({
          success: true,
          message: "Successfully fetched guests attending event",
          guests: event.guests,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message || "Event not found",
        });
      }
    } else {
      try {
        const event = await Event.findById(req.query.id)
          .populate("guests host game")
          .lean();
        res.json({
          success: true,
          message: "Successfully fetched event",
          event,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message || "Event not found",
        });
      }
    }
  })
  // DELETE api/events/id
  // Deletes event with given id
  .delete(async (req, res) => {
    try {
      const event = await Event.findById(req.query.id);
      const removedEvent = await event.remove();
      res.json({
        success: true,
        message: "Successfully deleted",
        event: removedEvent,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: error.message || "Event not found" });
    }
  })

  // PUT api/events/id?action=
  // Edits event with given id
  .put(async (req, res) => {
    if (req.user) {
      switch (req.query.action) {
        // PUT api/events/id?action=join
        // Adds current user to event with given id
        case "join":
          const event = await Event.findById(req.query.id);
          if (event.host.toString() === req.user._id.toString()) {
            return res.status(400).json({
              success: false,
              message: "Can't join an event you're hosting",
            });
          }
          event.guests.addToSet(req.user);
          const user = await User.findById(req.user._id);
          user.events.push(event);
          await user.save();
          await event.save();
          break;
        // PUT api/events/id?action=leave
        // Removes current user from event with given id
        case "leave":
          const event = await Event.findById(req.query.id);
          if (event.host.toString() === req.user._id.toString()) {
            return res.status(400).json({
              success: false,
              message:
                "Can't leave an event you're hosting. Delete the event instead.",
            });
          }
          event.guests.pull(req.user);
          const user = await User.findById(req.user._id);
          user.events.pull(event);
          await user.save();
          const savedEvent = await event.save();
          res.json({
            success: true,
            message: "Successfully left event",
            event: savedEvent,
          });
          break;
        // PUT api/events/id?action=edit
        // Updates event with given id
        case "edit":
          await Event.findById(req.query.id, (error, event) => {
            if (error)
              return res.status(400).json({
                success: false,
                message: error.message || "Event not found",
              });
            event.set(req.body);
            const updatedEvent = event.save();
            res.json({
              success: true,
              message: "Successfully updated event",
              event: updatedEvent,
            });
          });
          break;
        default:
          res
            .status(400)
            .json({ success: false, message: "Unable to edit event" });
      }
    } else {
      res.status(400).json({ success: false, message: "Unauthorized user" });
    }
  });

export default handler;
