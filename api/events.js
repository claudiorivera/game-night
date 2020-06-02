const express = require("express");
const router = express.Router();

// Db init and connect
const db = require("../config/db");

// GET /api/events
// Returns all events
router.get("/", async (req, res, next) => {
  try {
    const events = await db.any(`
      select event_id, event_date_time, games.game_id, games.game_name, users.user_id as host_id, users.user_username as host_username, users.user_fullname as host_fullname
      from events
      join games on events.game_id = games.game_id
      join users on events.host_id = users.user_id;
    `);
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// GET /api/events/id
// Returns an event by id
router.get("/:id", async (req, res, next) => {
  try {
    const event = await db.one(
      `
      select event_id, event_date_time, games.game_id, games.game_name, users.user_id as host_id, users.user_username as host_username, users.user_fullname as host_fullname
      from events
      join games on events.game_id = games.game_id
      join users on events.host_id = users.user_id
      where event_id = $1;
    `,
      [req.params.id]
    );
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// GET /api/events/id/users
// Returns a list of users attending an event by id
router.get("/:id/users", async (req, res, next) => {
  try {
    const users = await db.any(
      `
      select users.user_id, users.user_username, users.user_fullname
      from users
      join users_events on users_events.user_id = users.user_id
      where users_events.event_id = $1;
    `,
      [req.params.id]
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// PUT /api/events
// Add an event
router.put("/", async (req, res, next) => {
  try {
    const { event_date_time, game_id, host_id } = req.body;
    const event = await db.one(
      `
      with new_event as (
      insert into events (event_date_time, game_id, host_id)
      values ($1, $2, $3)
      returning event_id, host_id)
      insert into users_events (user_id, event_id)
      values ((select host_id from new_event), (select event_id from new_event))
      returning *;
    `,
      [event_date_time, game_id, host_id]
    );
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// PUT /api/events/id
// Updates an event by id
router.put("/:id", async (req, res, next) => {
  try {
    const { event_date_time, game_id } = req.body;
    const event = await db.one(
      `
      update events
      set event_date_time = $2, game_id = $3
      where event_id = $1 returning *;
    `,
      [req.params.id, event_date_time, game_id]
    );
    res.status(200).json(event);
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error });
  }
});

// DELETE /api/events/id
// Deletes an event by id
router.delete("/:id", async (req, res, next) => {
  try {
    await db.none(
      `
      delete from events
      where events.event_id = $1;
    `,
      [req.params.id]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
