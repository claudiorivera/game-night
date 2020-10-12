import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

// GET api/events/id
// Returns event with given id
handler.get(async (req, res) => {
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
        message: error.message || "Unable to fetch guests for event",
      });
    }
  } else {
    try {
      const event = await Event.findById(req.query.id).lean();
      if (event) {
        res.json({
          success: true,
          message: "Successfully fetched event",
          event,
        });
      } else {
        throw new Error("No event found with that id");
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Unable to fetch event",
      });
    }
  }
});

// DELETE api/events/id
// Deletes event with given id
handler.delete(async (req, res) => {
  try {
    const eventToRemove = await Event.findById(req.query.id);
    await eventToRemove.remove();
    res.json({
      success: true,
      message: "Successfully deleted event",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Unable to delete event",
    });
  }
});

// Event update
handler.put(async (req, res) => {
  if (req.user) {
    switch (req.query.action) {
      // PUT api/events/id?action=join
      // Adds current user to event with given id
      case "join":
        try {
          const eventToJoin = await Event.findById(req.query.id);
          if (eventToJoin.host.toString() === req.user._id.toString()) {
            return res.status(400).json({
              success: false,
              message: "Can't join an event you're hosting",
            });
          }
          // Add user to guests array in event
          eventToJoin.guests.addToSet(req.user);
          // Add event to events array in user
          const userJoining = await User.findById(req.user._id);
          userJoining.events.push(eventToJoin);
          // Save both
          await userJoining.save();
          await eventToJoin.save();
          res.json({ success: true, message: "Successfully joined event!" });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: error.message || "Unable to join event",
          });
        }
        return;

      // PUT api/events/id?action=leave
      // Removes current user from event with given id
      case "leave":
        try {
          const eventToLeave = await Event.findById(req.query.id);
          if (eventToLeave.host.toString() === req.user._id.toString()) {
            return res.status(400).json({
              success: false,
              message:
                "Can't leave an event you're hosting. Delete the event instead.",
            });
          }
          // Remove user from guests array of event
          eventToLeave.guests.pull(req.user);
          // Remove event from events array of user
          const userLeaving = await User.findById(req.user._id);
          userLeaving.events.pull(eventToLeave);
          // Save both
          await userLeaving.save();
          const savedEvent = await eventToLeave.save();
          res.json({
            success: true,
            message: "Successfully left event",
            event: savedEvent,
          });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: "Unable to leave event" });
        }
        return;

      // PUT api/events/id?action=edit
      // Updates event with given id
      case "edit":
        try {
          const eventToEdit = await Event.findById(req.query.id);
          eventToEdit.set(req.body);
          const updatedEvent = await eventToEdit.save();
          res.json({
            success: true,
            message: "Successfully updated event",
            event: updatedEvent,
          });
        } catch (error) {
          res
            .status(400)
            .json({ success: false, message: "Unable to edit event" });
        }
        return;
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
