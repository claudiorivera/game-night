import middleware from "@middleware";
import Game from "@models/Game";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(middleware);

// GET api/games/id
// Returns game with given id
handler.get(async (req, res) => {
  try {
    const game = await Game.findById(req.query.id).lean();
    res.json({
      success: true,
      message: "Successfully fetched the game",
      game,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Game not found",
    });
  }
});

export default handler;
