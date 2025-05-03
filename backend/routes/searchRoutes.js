const express = require("express");
const router = express.Router();
const Exercise = require("../models/exerciseModel");
const Article = require("../models/Article");

// GET /api/search?q=keyword
router.get("/", async (req, res) => {
  const q = req.query.q || "";
  try {
    const exerciseResults = await Exercise.find({
      name: { $regex: q, $options: "i" }
    }).select("name _id");

    const articleResults = await Article.find({
      title: { $regex: q, $options: "i" }
    }).select("title _id");

    res.json({
      exercises: exerciseResults,
      articles: articleResults
    });
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

module.exports = router;
