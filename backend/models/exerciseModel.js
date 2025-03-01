const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["breathing", "meditation"], required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  media: { type: String }, // Link to video/audio guide (optional)
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
