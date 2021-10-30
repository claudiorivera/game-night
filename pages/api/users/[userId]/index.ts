import middleware from "middleware";
import { UserModel } from "models";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.use(middleware);

// GET api/users/userId
// Returns the given user
handler.get(async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) throw new Error("User not logged in");
    const user = await UserModel.findById(req.query.userId)
      .select("_id image name")
      .lean();
    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Unable to get user",
    });
  }
});

export default handler;
