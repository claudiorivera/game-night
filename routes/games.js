const express = require("express");
const router = express.Router();

// GET /api/games
// Returns all games
router.get("/", async (req, res, next) => {
  try {
    // const games = await db.any("SELECT * FROM games order by game_name");
    res.status(200).json({ message: "GET /api/games" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// GET /api/games/id
// Returns game by id
router.get("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: `GET /api/games/${req.params.id}` });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// POST /api/games
// Adds a game
// req.body: {game_name: [string - game name]}
router.post("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "POST /api/games" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// PUT /api/games/id
// Updates game name by id
// req.body: {game_name: [string - new game name]}
router.put("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: `PUT /api/games/${req.params.id}` });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
