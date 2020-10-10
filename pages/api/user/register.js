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
        return res
          .status(400)
          .json({ message: error.message || "Unable to log in" });
      const { _id, name, email, isAdmin } = user;
      res.status(201).json({ _id, name, email, isAdmin });
    });
  });
});

export default handler;
