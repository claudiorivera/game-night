import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import Game from "../../../models/Game";
import { getSession } from "next-auth/client";

const handler = nextConnect();

handler.use(middleware);

// GET api/user
// Returns current user
handler.get(async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    try {
      res.json({
        success: true,
        message: "Successfully fetched all users",
        user: session.user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Users not found",
      });
    }
  } else {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized GET /api/user" });
  }
});

export default handler;
