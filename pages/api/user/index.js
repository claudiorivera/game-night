import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import User from "../../../models/User";
import Game from "../../../models/Game";

const handler = nextConnect();

handler.use(middleware);

// TODO: Add authorization to this route or remove it all together
// GET api/user
// Returns all users
handler.get(async (_, res) => {
  try {
    const users = await User.find().lean();
    res.json({
      success: true,
      message: "Successfully fetched all users",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Users not found",
    });
  }
});

export default handler;
