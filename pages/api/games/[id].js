import middleware from "@middleware";
import Game from "@models/Game";
import nextConnect from "next-connect";

const handler = nextConnect();

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Game not found",
    });
  }
});

export default handler;
