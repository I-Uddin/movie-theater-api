const { Show, User } = require("../models/index");
const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// SELF MADE
// CREATE USER
router.post("/", async (req, res) => {
  const result = await User.create(req.body);
  res.json("????");
});

// GET all users
router.get("/", async (req, res) => {
  const result = await User.findAll();
  res.json(result);
});

// GET one user
router.get("/:id", async (req, res) => {
  const result = await User.findByPk(req.params.id);
  res.json(result);
});

// GET all shows watched by a user (user id in req.params)
router.get("/shows/:id", async (req, res) => {
  const shows = await Show.findAll({ where: { userId: req.params.id } });
  res.json(shows);
});

// PUT update and add a show if a user has watched it
router.put("/shows/:id", async (req, res) => {
    const result = await Show.findByPk(req.body.movieId);
    result.userId = req.params.id;
    await result.save();
    const updatedResult = await Show.findByPk(req.body.movieId);
    res.json(updatedResult);
});

module.exports = router;
