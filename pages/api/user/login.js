import nextConnect from "next-connect";
import middleware from "../../../middleware";
import passport from "../../../util/passport";

const handler = nextConnect();

handler.use(middleware);

// POST api/user/login
// Returns user if successfully authenticated
handler.post(passport.authenticate("local"), (req, res) => {
  const {
    isAdmin,
    _id,
    email,
    name,
    events,
    eventsHosting,
    dateCreated,
  } = req.user;
  res.json({
    success: true,
    message: "Successfully logged in",
    user: { isAdmin, _id, email, name, events, eventsHosting, dateCreated },
  });
});

export default handler;
