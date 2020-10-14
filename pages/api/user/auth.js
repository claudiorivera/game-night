import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import User from "../../../models/User";
import Game from "../../../models/Game";

const handler = nextConnect();

handler.use(middleware);

// GET api/user/auth
// Returns a user if logged in or null if onot
handler.get((req, res) => {
  if (req.user) {
    const {
      _id,
      email,
      name,
      eventsAttending,
      eventsHosting,
      isAdmin,
      dateCreated,
    } = req.user;
    res.json({
      user: {
        _id,
        email,
        name,
        eventsAttending,
        eventsHosting,
        isAdmin,
        dateCreated,
      },
    });
  } else {
    res.status(401).end();
  }
});

// POST api/user/auth
// Logs out the user
handler.post((req, res) => {
  req.logout();
  res.status(204).end();
});

export default handler;
