import middleware from "@middleware";
import Event from "@models/Event";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

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
        eventGuests: event.eventGuests,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Unable to fetch guests for event",
      });
    }
  } else {
    try {
      const event = await Event.findById(req.query.id)
        .populate("eventHost", "name image")
        .populate("eventGuests", "name image")
        .populate("eventGame")
        .lean();
      res.json({
        success: true,
        message: "Successfully fetched event",
        event,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Unable to fetch event",
      });
    }
  }
});

// DELETE api/events/id
// Deletes event with given id
// TODO: Validate that session user is the host or an admin
handler.delete(async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    try {
      const eventToRemove = await Event.findById(req.query.id);
      await eventToRemove.deleteOne(); // https://mongoosejs.com/docs/deprecations.html
      res.json({
        success: true,
        message: "Successfully deleted event",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Unable to delete event",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized DELETE /api/events/id",
    });
  }
  res.end();
});

// Event update
handler.put(async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    switch (req.query.action) {
      // PUT api/events/id?action=join
      // Adds current user to event with given id
      case "join":
        try {
          const eventToJoin = await Event.findById(req.query.id);
          if (eventToJoin.eventHost.toString() === session.user.id) {
            return res.status(400).json({
              success: false,
              message: "Can't join an event you're hosting",
            });
          }
          eventToJoin.eventGuests.addToSet(session.user.id);
          await eventToJoin.save();
          res.json({
            success: true,
            message: "Successfully joined event!",
            eventJoined: eventToJoin,
            user: session.user.id,
          });
        } catch (error) {
          res.status(500).json({
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
          if (eventToLeave.eventHost.toString() === session.user.id) {
            return res.status(400).json({
              success: false,
              message:
                "Can't leave an event you're hosting. Delete the event instead.",
            });
          }
          eventToLeave.eventGuests.pull({ _id: session.user.id });
          await eventToLeave.save();
          res.json({
            success: true,
            message: "Successfully left event",
          });
        } catch (error) {
          res
            .status(500)
            .json({ success: false, message: "Unable to leave event" });
        }
        return;

      // PUT api/events/id?action=edit
      // Updates event with given id
      case "edit":
        try {
          const eventToEdit = await Event.findById(req.query.id);
          eventToEdit.eventGame = req.body.gameId;
          eventToEdit.eventDateTime = req.body.eventDateTime;
          await eventToEdit.save();
          res.json({
            success: true,
            message: "Successfully updated event",
          });
        } catch (error) {
          res
            .status(500)
            .json({ success: false, message: "Unable to edit event" });
        }
        return;
      default:
        res
          .status(500)
          .json({ success: false, message: "Unable to edit event" });
    }
  } else {
    res.status(401).json({ success: false, message: "Unauthorized user" });
  }
});

export default handler;
