import nextConnect from "next-connect";
import middleware from "../../../middleware";
import passport from "../../../util/passport";

const handler = nextConnect();

handler.use(middleware);

// POST api/user/login
// Returns user if successfully authenticated
handler.post(passport.authenticate("local"), (req, res) => {
  const {
    _id,
    email,
    name,
    events,
    eventsHosting,
    isAdmin,
    dateCreated,
  } = req.user;
  res.json({
    user: {
      _id,
      email,
      name,
      events,
      eventsHosting,
      isAdmin,
      dateCreated,
    },
  });
});

export default handler;
