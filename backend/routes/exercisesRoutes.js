const express = require("express");
const router = express.Router();
const Exercise = require("../models/exerciseModel");

// Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new exercise
router.post("/", async (req, res) => {
  const { title, description, category, duration, media } = req.body;

  const newExercise = new Exercise({
    title,
    description,
    category,
    duration,
    media,
  });

  try {
    const savedExercise = await newExercise.save();
    res.status(201).json(savedExercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
