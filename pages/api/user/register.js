import nextConnect from "next-connect";
import middleware from "../../../middleware";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

// POST api/user/register
// Add a new user and returns the user
handler.post(async (req, res, next) => {
  const { email, name, password } = req.body;

  User.register(new User({ email, name }), password, (error, user) => {
    if (error) {
      return next(error);
    }
    req.logIn(user, (error) => {
      if (error)
        return res.status(500).json({
          success: false,
          message: error.message || "Unable to log in",
          user: null,
        });
      const {
        _id,
        email,
        name,
        events,
        eventsHosting,
        isAdmin,
        dateCreated,
      } = user;
      res.status(201).json({
        success: true,
        message: "Successfully registered",
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
    });
  });
});

export default handler;
