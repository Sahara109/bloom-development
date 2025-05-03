const express = require("express");
const router = express.Router();
const multer = require('multer');
const Exercise = require("../models/exerciseModel");
const path = require("path");
const fs = require('fs');

// Ensure the upload folder exists
const videoDir = path.join(__dirname, '../public/videos');
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Helper to slugify exercise name for safe filenames
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

// Multer setup for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videoDir);
  },
  filename: function (req, file, cb) {
    // Use exercise name from the form to generate the filename
    const exerciseName = req.body.name || 'exercise';
    const ext = path.extname(file.originalname);
    const safeName = slugify(exerciseName) + ext;
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size: 50MB
});

// Helper to parse steps/benefits into arrays
function parseStepsOrBenefits(str) {
  if (!str) return [];
  return str.split(/\d+\.\s+/).map(s => s.trim()).filter(Boolean);
}

// Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get exercise by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new exercise (with file upload)
router.post("/", upload.single('video'), async (req, res) => {
  const { name, description, image, steps, benefits } = req.body;
  const video = req.file ? req.file.filename : null; // e.g. "deep-breathing.mp4"

  const newExercise = new Exercise({
    name,
    description,
    image,
    video, // just the filename!
    steps: parseStepsOrBenefits(steps),
    benefits: parseStepsOrBenefits(benefits),
  });

  try {
    const savedExercise = await newExercise.save();
    res.status(201).json(savedExercise);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an exercise (with file upload)
router.put("/:id", upload.single('video'), async (req, res) => {
  const { id } = req.params;
  const { name, description, image, steps, benefits } = req.body;
  let video = req.body.video;
  if (req.file) {
    video = req.file.filename; // Overwrite if a new video is uploaded
  }

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        video,
        steps: parseStepsOrBenefits(steps),
        benefits: parseStepsOrBenefits(benefits)
      },
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
