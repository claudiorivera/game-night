const express = require("express");
const router = express.Router();

// Model
const User = require("../models/User");

// Routes
router.post("/register", (req, res) => {
  res.status(200).json(req.body);
});

router.post("/login", (req, res) => {
  res.status(200).json(req.body);
});

router.get("/logout", (req, res) => {
  res.status(200).json(null);
});

module.exports = router;
