const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const Game = require("../models/Game");

// Routes

// POST /api/games/add
// Params: game object
// Returns the added game object on success
router.post("/add", (req, res) => {
  if (req.user && req.user.isAdmin) {
    const addedGame = new Game(
      ({
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
      } = req.body)
    );
    res.status(200).json({ message: "user is admin", addedGame });
  } else {
    res.status(400).json({ message: "no user or user not admin" });
  }
});

module.exports = router;
