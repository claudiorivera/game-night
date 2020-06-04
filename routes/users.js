const express = require("express");
const router = express.Router();

// GET /api/users/login
// Login page
router.get("/login", (req, res) => res.send("Login"));

// GET /api/users/register
// Registration page
router.get("/register", (req, res) => res.send("Register"));

// GET /api/users
// Returns all users
router.get("/", async (req, res, next) => {
  try {
    // const users = await db.any("SELECT * FROM users");
    res.status(200).json({ message: "GET /api/users" });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
});

// GET /api/users/id
// Returns user by id
router.get("/:id", async (req, res, next) => {
  try {
    // const user = await db.one("SELECT * FROM users WHERE user_id = $1", [
    //   req.params.id,
    // ]);
    res.status(200).json({ message: `GET /api/users/${req.params.id}` });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
});

// GET /api/users/id/events
// Returns all events a given user id is attending
router.get("/:id/events", async (req, res, next) => {
  try {
    //   const events = await db.any(
    //     `
    //     select users_events.event_id, events.event_date_time, games.game_id, games.game_name, users.user_id as host_id, users.user_username as host_username, users.user_fullname as host_fullname
    //     from users_events
    //     join events on users_events.event_id = events.event_id
    //     join games on events.game_id = games.game_id
    //     join users on events.host_id = users.user_id
    //     where users_events.user_id = $1;
    // `,
    //     [req.params.id]
    //   );
    res.status(200).json({ message: `GET /api/users/${req.params.id}/events` });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// POST /api/users
// Adds a user
// req.body: {user_username: [string - username], user_fullname: [string - full name]}
router.post("/", async (req, res, next) => {
  try {
    // const user = await db.one(
    //   "insert into users (user_username, user_fullname) values ($1, $2) returning *",
    //   [req.body.user_username, req.body.user_fullname]
    // );
    res.status(200).json({ message: "POST /api/users" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// PUT /api/users/id
// Updates a user
// req.body: {user_username: [string - username], user_fullname: [string - full name]}
router.put("/:id", async (req, res, next) => {
  try {
    // const { user_username, user_fullname } = req.body;
    // const user = await db.one(
    //   `
    //   update users
    //   set user_username = $2, user_fullname = $3
    //   where user_id = $1
    //   returning *;
    // `,
    //   [req.params.id, user_username, user_fullname]
    // );
    res.status(200).json({ message: `PUT /api/users/${req.params.id}` });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
