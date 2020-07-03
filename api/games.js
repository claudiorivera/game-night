const express = require("express");
const router = express.Router();

// Model
const Game = require("../models/Game");

// GET /api/games
// Params: none
// Returns all games on success
router.get("/", async (req, res) => {
  try {
    const games = await Game.find({}).sort({ numOfRatings: "desc" });
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST /api/games/add
// Params: game object
// Returns the added game object on success
router.post("/add", (req, res) => {
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

  if (req.user && req.user.isAdmin) {
    const addedGame = new Game(gameToAdd);
    addedGame.save((error) => {
      if (error) {
        res
          .status(400)
          .json(error.message || { message: "Something went wrong :(" });
      } else {
        res.status(200).json(addedGame);
      }
    });
  } else {
    res.status(400).json({ message: "Unauthorized user" });
  }
});

module.exports = router;
