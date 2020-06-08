const express = require("express");
const router = express.Router();

// Model
const Game = require("../models/Game");

// Routes

// POST /api/games/add
// Params: req.body.email, req.body.name, req.body.password
// Returns user on success
router.post("/add", (req, res) => {
  const {
    name,
    imageSrc,
    thumbnailSrc,
    description,
    authors,
    categories,
    gameMechanics,
    bggId,
    yearPublished,
    minPlayers,
    maxPlayers,
    playingTime,
    minAge,
    rating,
    numOfRatings,
  } = req.body;

  // console.log("req.body: ", {
  //   name,
  //   imageSrc,
  //   thumbnailSrc,
  //   description,
  //   authors,
  //   categories,
  //   gameMechanics,
  //   bggId,
  //   yearPublished,
  //   minPlayers,
  //   maxPlayers,
  //   playingTime,
  //   minAge,
  //   rating,
  //   numOfRatings,
  // });

  const newGame = new Game({
    name,
    imageSrc,
    thumbnailSrc,
    description,
    authors,
    categories,
    gameMechanics,
    bggId,
    yearPublished,
    minPlayers,
    maxPlayers,
    playingTime,
    minAge,
    rating,
    numOfRatings,
  });
  console.log("adding new game: ", newGame);

  // newGame.save((error, gameAdded) => {
  //   if (error) {
  //     res.status(400).json(error);
  //   } else {
  //     res.status(201).json(gameAdded);
  //   }
  // });
  res.status(200).json(newGame);
});

module.exports = router;
