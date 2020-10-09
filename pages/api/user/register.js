import nextConnect from "next-connect";
import passport from "passport";
import middleware from "../../../middleware";
import User from "../../../models/User";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { email, name, password } = req.body;
  User.register(new User({ email, name }), password, (error, user) => {
    if (error) {
      return res.status(400).json(error.message);
    }
    passport.authenticate("local")(req, res, () => {
      const { isAdmin, _id, email, name, dateCreated } = user;
      res.status(200).json({ isAdmin, _id, email, name, dateCreated });
    });
  });
});

export default handler;
