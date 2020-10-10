import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Game from "../../../models/Game";

const handler = nextConnect();

handler.use(middleware);

handler
  // GET api/games
  // Returns all games
  .get(async (req, res) => {
    try {
      const games = await Game.find({}).sort({ numOfRatings: "desc" });
      res.json({ success: true, games });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: error.message || "Games not found" });
    }
  })
  // POST api/games
  // Adds game and returns the game
  .post(async (req, res) => {
    if (req.user?.isAdmin) {
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

      game.save((error, savedGame) => {
        if (error)
          return res.status(400).json({
            success: false,
            message: error.message || "Unable to add game",
          });
        res.status(201).json({ success: true, game: savedGame });
      });
    } else {
      res.status(400).json({ success: false, message: "Unauthorized user" });
    }
  });

export default handler;
