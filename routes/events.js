const express = require("express");
const router = express.Router();

// GET /api/events
// Returns all events
router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "GET /api/events" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// GET /api/events/id
// Returns an event by id
router.get("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: `GET /api/events/${req.params.id}` });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// GET /api/events/id/users
// Returns a list of users attending an event by id
router.get("/:id/users", async (req, res, next) => {
  try {
    res.status(200).json({ message: `GET /api/events/${req.params.id}/users` });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// POST /api/events
// Add an event
router.post("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "POST /api/events" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// PUT /api/events/id
// Updates an event by id
router.put("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: `PUT /api/events/${req.params.id}` });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false, error });
  }
});

// DELETE /api/events/id
// Deletes an event by id
router.delete("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: `DELETE /api/events/${req.params.id}` });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
