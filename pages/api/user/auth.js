import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();

handler.use(middleware);

// GET api/user/auth
// Returns a user if logged in or null if onot
handler.get(async (req, res) => {
  if (req.user) {
    const { isAdmin, _id, email, name, dateCreated } = req.user;
    res.json({
      success: true,
      data: { isAdmin, _id, email, name, dateCreated },
    });
  } else {
    res.json({ success: false, message: "No user" });
  }
});

export default handler;
