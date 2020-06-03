const express = require("express");
const router = express.Router();

// Db init and connect
const db = require("../lib/db");

// GET /api/games
// Returns all games
router.get("/", async (req, res, next) => {
  try {
    const games = await db.any("SELECT * FROM games order by game_name");
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// GET /api/games/id
// Returns game by id
router.get("/:id", async (req, res, next) => {
  try {
    const game = await db.one("select * from games where game_id = $1", [
      req.params.id,
    ]);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// POST /api/games
// Adds a game
// req.body: {game_name: [string - game name]}
router.post("/", async (req, res, next) => {
  try {
    const game = await db.one(
      "insert into games (game_name) values ($1) returning *",
      [req.body.game_name]
    );
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// PUT /api/games/id
// Updates game name by id
// req.body: {game_name: [string - new game name]}
router.put("/:id", async (req, res, next) => {
  try {
    const game = await db.one(
      "update games set game_name = $2 where game_id = $1 returning *",
      [req.params.id, req.body.game_name]
    );
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
