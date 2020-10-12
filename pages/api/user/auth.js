import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();

handler.use(middleware);

// GET api/user/auth
// Returns a user if logged in or null if onot
handler.get(async (req, res) => {
  if (req.user) {
    const {
      _id,
      email,
      name,
      events,
      eventsHosting,
      isAdmin,
      dateCreated,
    } = req.user;
    res.json({
      success: true,
      message: "Successfully authenticated user",
      user: {
        _id,
        email,
        name,
        events,
        eventsHosting,
        isAdmin,
        dateCreated,
      },
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Unabled to authenticate user" });
  }
});

export default handler;
