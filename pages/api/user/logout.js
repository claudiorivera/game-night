import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();

handler.use(middleware);

// GET api/user/logout
// Logs out current user and returns a null user
handler.get(async (req, res) => {
  req.logout();
  res.json({ success: true, message: "Successfully logged out" });
});

export default handler;
