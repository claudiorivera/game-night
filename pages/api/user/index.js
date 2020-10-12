import nextConnect from "next-connect";
import middleware from "../../../middleware";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

handler
  // GET api/user
  // Returns all users - FOR DEVELOPMENT ONLY
  .get(async (_, res) => {
    try {
      const users = await User.find({}).sort({ numOfRatings: "desc" }).lean();
      res.json({
        success: true,
        message: "Successfully fetched all users",
        users,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: error.message || "Users not found" });
    }
  });

export default handler;
