import nextConnect from "next-connect";
import middleware from "../../../middleware";
import { extractUser } from "../../../util/extractUser";
import passport from "../../../util/passport";

const handler = nextConnect();

handler.use(middleware);

// POST api/user/login
// Returns user if successfully authenticated
handler.post(passport.authenticate("local"), (req, res) => {
  res.json(extractUser(req));
});

export default handler;
