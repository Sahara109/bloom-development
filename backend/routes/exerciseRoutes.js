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
  const { name, description, image, video } = req.body;

  const newExercise = new Exercise({
    name,
    description,
    image,
    video,
    steps, 
    benefits, 
  });

  try {
    const savedExercise = await newExercise.save();
    res.status(201).json(savedExercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an exercise
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, image, video } = req.body;

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      id,
      { name, description, image, video },
      { new: true }
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(updatedExercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an exercise
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Exercise.findByIdAndDelete(id);
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
