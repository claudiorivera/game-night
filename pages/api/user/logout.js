import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  req.logout();
  res.status(200).json(null);
});

export default handler;
