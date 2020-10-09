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
  // DELETE api/events/id
  // Deletes event with given id
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
  // PUT api/events/id
  // Updates event with given id
  .put(async (req, res) => {
    // PUT api/events/id?join
    // Adds current user to event with given id
    if ("join" in req.query) {
      if (req.user) {
        const event = await Event.findById(req.query.id);
        if (event.host.toString() === req.user._id.toString()) {
          return res
            .status(400)
            .json({ message: "Can't join an event you're hosting" });
        }
        event.guests.addToSet(req.user);
        try {
          const user = await User.findById(req.user._id);
          user.events.push(event);
          await user.save((error) => {
            if (error) return res.status(400).json(error);
          });
        } catch (error) {
          return res.status(400).json(error);
        }
        await event.save((error) => {
          if (error) {
            return res
              .status(400)
              .json(error.message || { message: "Something went wrong" });
          }
          res.status(200).json(event);
        });
      } else {
        res.status(400).json({ message: "Unauthorized user" });
      }
      // PUT api/events/id?leave
      // Removes current user from event with given id
    } else if ("leave" in req.query) {
      if (req.user) {
        const event = await Event.findById(req.query.id);
        if (event.host.toString() === req.user._id.toString()) {
          return res.status(400).json({
            message:
              "Can't leave an event you're hosting. Delete the event instead.",
          });
        }
        event.guests.pull(req.user);
        try {
          const user = await User.findById(req.user._id);
          user.events.pull(event);
          await user.save((error) => {
            if (error)
              return res
                .status(400)
                .json(error.message || { message: "Something went wrong :(" });
          });
        } catch (error) {
          return res
            .status(400)
            .json(error.message || { message: "Something went wrong :(" });
        }
        await event.save((error) => {
          if (error) {
            return res
              .status(400)
              .json(error.message || { message: "Something went wrong" });
          }
          res.status(200).json(event);
        });
      } else {
        res.status(400).json({ message: "Unauthorized user" });
      }
    } else {
      if (req.user) {
        const event = await Event.findByIdAndUpdate(req.query.id, {
          game: req.body.gameId,
          eventDateTime: req.body.eventDateTime,
        });
        res.status(200).json(event);
      } else {
        res.status(400).json({ message: "Unauthorized user" });
      }
    }
  });

export default handler;
