import nextConnect from "next-connect";
import middleware from "../../../middleware";
import { extractUser } from "../../../util/extractUser";
import passport from "../../../util/passport";

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate("local"), (req, res) => {
  res.json(extractUser(req));
});

export default handler;
