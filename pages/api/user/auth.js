import nextConnect from "next-connect";
import middleware from "../../../middleware";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { user } = await User.authenticate("local");
  if (user) {
    const { isAdmin, _id, email, name, dateCreated } = user;
    res.status(200).json({ isAdmin, _id, email, name, dateCreated });
  } else {
    res.status(200).json(null);
  }
});

export default handler;
