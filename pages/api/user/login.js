import nextConnect from "next-connect";
import middleware from "../../../middleware";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { user } = await User.authenticate()(req.body.email, req.body.password);
  const { isAdmin, _id, email, name, dateCreated } = user;
  res.status(200).json({ isAdmin, _id, email, name, dateCreated });
});

export default handler;
