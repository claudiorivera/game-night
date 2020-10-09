import nextConnect from "next-connect";
import middleware from "../../../middleware";
import Game from "../../../models/Game";

const handler = nextConnect();

handler.use(middleware);

handler
  .get(async (req, res) => {
    try {
      const games = await Game.find({}).sort({ numOfRatings: "desc" });
      res.status(200).json(games);
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .post(async (req, res) => {
    const gameToAdd = {
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
    };

    if (req.user?.isAdmin) {
      const addedGame = await Game.create(gameToAdd);
      if (addedGame) {
        res.status(200).json(addedGame);
      } else {
        res
          .status(400)
          .json(error.message || { message: "Something went wrong :(" });
      }
    } else {
      res.status(400).json({ message: "Unauthorized user" });
    }
  });

export default handler;
