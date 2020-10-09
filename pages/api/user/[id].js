import nextConnect from "next-connect";
import middleware from "../../../middleware";
import User from "../../../models/User";
import Event from "../../../models/Event";

const handler = nextConnect();

handler.use(middleware);

handler.delete(async (req, res) => {
  if (req.user) {
    User.findOneAndDelete({ _id: req.query.id }, (error, user) => {
      if (error) {
        res.status(400).json(error);
      } else {
        // https://stackoverflow.com/a/44342416
        Event.updateMany(
          { guests: user._id },
          { $pull: { guests: user._id } },
          { multi: true },
          (error) => {
            if (error) {
              console.log(error);
              return res.status(400).json(null);
            }
          }
        );
        res.status(200).json(null);
      }
    });
  } else {
    res.status(400).json({ message: "No user" });
  }
});

export default handler;
