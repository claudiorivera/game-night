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
        const event = await Event.findById(req.query.id);
        res.json({ success: true, guests: event.guests });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message || "Event not found",
        });
      }
    } else {
      try {
        const event = await Event.findById(req.query.id).populate(
          "guests host game"
        );
        res.json({ success: true, event });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message || "Event not found",
        });
      }
    }
  })
  // DELETE api/events/id
  // Deletes event with given id
  .delete(async (req, res) => {
    const event = await Event.findById(req.query.id);
    if (event) {
      event.remove((error, removedEvent) => {
        if (error)
          return res.status(400).json({
            success: false,
            message: error.message || "Unable to remove event",
          });
        res.json({
          success: true,
          message: "Successfully deleted",
          event: removedEvent,
        });
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Event not found" });
    }
  })
  // PUT api/events/id
  // Updates event with given id
  .put(async (req, res) => {
    // PUT api/events/id?join
    // Adds current user to event with given id
    if ("join" in req.query) {
      if (req.user) {
        const event = await Event.findById(req.query.id);
        if (event) {
          if (event.host.toString() === req.user._id.toString()) {
            return res.status(400).json({
              success: false,
              message: "Can't join an event you're hosting",
            });
          }
          event.guests.addToSet(req.user);
          const user = await User.findById(req.user._id);
          user.events.push(event);
          await user.save((error) => {
            if (error)
              return res.status(400).json({
                success: false,
                message: error.message || "Unable to join event",
              });
          });
          await event.save((error) => {
            if (error) {
              return res.status(400).json({
                success: false,
                message: error.message || "Unable to join event",
              });
            }
            res.json({ success: true, event });
          });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Event not found" });
        }
      } else {
        res.status(400).json({ success: false, message: "Unauthorized user" });
      }
      // PUT api/events/id?leave
      // Removes current user from event with given id
    } else if ("leave" in req.query) {
      if (req.user) {
        const event = await Event.findById(req.query.id);
        if (event) {
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
          await user.save((error) => {
            if (error)
              return res.status(400).json({
                success: false,
                message: error.message || "Unable to leave event",
              });
          });
          await event.save((error, savedEvent) => {
            if (error)
              return res.status(400).json({
                success: false,
                message: error.message || "Unable to leave event",
              });

            res.json({ success: true, event: savedEvent });
          });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Event not found" });
        }
      } else {
        res.status(400).json({ success: false, message: "Unauthorized user" });
      }
    } else {
      if (req.user) {
        await Event.findById(req.query.id, (error, event) => {
          if (error)
            return res.status(400).json({
              success: false,
              message: error.message || "Event not found",
            });
          event.set(req.body);
          event.save((error, updatedEvent) => {
            if (error)
              return res.status(400).json({
                success: false,
                message: error.message || "Unable to save event",
              });
            res.json({ success: true, event: updatedEvent });
          });
        });
      } else {
        res.status(400).json({ success: false, message: "Unauthorized user" });
      }
    }
  });

export default handler;
