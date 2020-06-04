const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// GET /api/users/login
// Login page
router.get("/login", (req, res) => res.send("Login"));

// POST /api/users/register
// Register a new user
router.post(
  "/register",
  [
    check("name").isLength({ min: 1 }).withMessage("Name is required"),
    check("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email address"),
    check("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      // https://express-validator.github.io/docs/custom-validators-sanitizers.html
      .custom((value, { req }) => {
        if (value !== req.body.password_confirm) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.status(200).send("register passed");
  }
);

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
    res.status(200).json({ message: `PUT /api/users/${req.params.id}` });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
