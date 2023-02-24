const { Show, User } = require("../models/index");
const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

// GET all shows
router.get("/", async (req, res) => {
  const result = await Show.findAll();
  res.json(result);
});

// GET one show
router.get("/:id", async (req, res) => {
  const result = await Show.findByPk(req.params.id);
  res.json(result);
});

// GET shows of a particular genre (genre in req.params)
router.get("/genre/:genre", async (req, res) => {
  const result = await Show.findAll({ where: { genre: req.params.genre } });
  res.json(result);
});

// PUT update rating of a show that has been watched
router.put("/rating/:id", [check("rating").not().isEmpty().trim(),], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() });
  } else {
    const result = await Show.findByPk(req.params.id);
    result.rating = req.body.rating;
    await result.save();
    const updatedResult = await Show.findByPk(req.params.id);
    res.json(updatedResult);
  }
});

// PUT update the status of a show
router.put(
  "/status/:id",
  [
    check("status").not().isEmpty().trim(),
    check("status").isLength({ min: 5, max: 25 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const result = await Show.findByPk(req.params.id);
      result.status = req.body.status;
      await result.save();
      const updatedResult = await Show.findByPk(req.params.id);
      res.json(updatedResult);
    }
  }
);

// DELETE a show
router.delete("/:id", async (req, res) => {
  const result = await Show.findByPk(req.params.id);
  await result.destroy();
  res.json("200");
});

module.exports = router;
