import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Game from "../../../models/Game";

const handler = nextConnect();

handler.use(middleware);

// GET api/games
// Returns all games
handler.get(async (_, res) => {
  try {
    const games = await Game.find({}).sort({ numOfRatings: "desc" }).lean();
    res.json({
      success: true,
      message: "Successfully fetched all games",
      games,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: error.message || "Games not found" });
  }
});

// POST api/games
// Adds game and returns the game
handler.post(async (req, res) => {
  if (req.user?.isAdmin) {
    try {
      const game = new Game({
        name: req.body.name,
        imageSrc: req.body.imageSrc,
        thumbnailSrc: req.body.thumbnailSrc,
        description: req.body.description,
        authors: req.body.authors,
        categories: req.body.categories,
        gameMechanics: req.body.gameMechanics,
        bggId: req.body.bggId,
        yearPublished: req.body.yearPublished,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        playingTime: req.body.playingTime,
        minAge: req.body.minAge,
        rating: req.body.rating,
        numOfRatings: req.body.numOfRatings,
      });
      const savedGame = await game.save();
      res.status(201).json({
        success: true,
        message: "Successfully added game",
        game: savedGame,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Unable to add game",
      });
    }
  } else {
    res.status(400).json({ success: false, message: "Unauthorized user" });
  }
});

export default handler;
