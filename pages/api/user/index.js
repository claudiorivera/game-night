import nextConnect from "next-connect";
import middleware from "../../../middleware";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

// TODO: Add authorization to this route or remove it all together
// GET api/user
// Returns all users
handler.get(async (_, res) => {
  try {
    const users = await User.find({}).sort({ numOfRatings: "desc" }).lean();
    res.json({
      success: true,
      message: "Successfully fetched all users",
      users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || "Users not found" });
  }
});

export default handler;
