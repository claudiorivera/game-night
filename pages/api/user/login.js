import nextConnect from "next-connect";
import middleware from "../../../middleware";
import passport from "../../../util/passport";

const handler = nextConnect();

handler.use(middleware);

// POST api/user/login
// Returns user if successfully authenticated
handler.post(passport.authenticate("local"), (req, res) => {
  const { _id, name, email, isAdmin } = req.user;
  res.json({ success: true, user: { _id, name, email, isAdmin } });
});

export default handler;
