import middleware from "middleware";
import { EventModel } from "models";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.use(middleware);

// GET api/users/userId/events
// Returns the given user's events
handler.get(async (req, res) => {
  if ("hosting" in req.query) {
    try {
      const session = await getSession({ req });
      if (!session) throw new Error("User not logged in");
      const events = await EventModel.where("eventHost")
        .equals(req.query.userId)
        .populate("eventHost", "name image")
        .populate("eventGuests", "name image")
        .populate("eventGame")
        .lean();
      res.json(events);
    } catch (error: any) {
      res.status(500).json({
        message: error.message || "Unable to get user",
      });
    }
  } else {
    try {
      const session = await getSession({ req });
      if (!session) throw new Error("User not logged in");
      const events = await EventModel.where("eventGuests")
        .equals(req.query.userId)
        .populate("eventHost", "name image")
        .populate("eventGuests", "name image")
        .populate("eventGame")
        .lean();
      res.json(events);
    } catch (error: any) {
      res.status(500).json({
        message: error.message || "Unable to get user",
      });
    }
  }
});

export default handler;
