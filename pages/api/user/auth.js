import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  if (req.user) {
    const { isAdmin, _id, email, name, dateCreated } = req.user;
    res.status(200).json({ isAdmin, _id, email, name, dateCreated });
  } else {
    res.status(200).json(null);
  }
});

export default handler;
