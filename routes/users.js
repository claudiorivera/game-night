const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

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
        if (value !== req.body.passwordConfirm) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // User input validated
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json([{ msg: "Email address already registered" }]);
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      // Hash the password
      bcrypt.genSalt((error, salt) =>
        bcrypt.hash(newUser.password, salt, async (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          const user = await newUser.save();
          res
            .status(200)
            .json({
              id: user._id,
              name: user.name,
              email: user.email,
              dateCreated: user.dateCreated,
            });
        })
      );
    }
  }
);

// GET /api/users/login
// Login page
router.get("/login", (req, res) => res.send("Login"));

module.exports = router;
