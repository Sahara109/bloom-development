const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Image field 
  video: { type: String }, // Link to the video file 
  steps: { type: [String] }, // Array of steps for the exercise
  benefits: { type: [String] }, // Array of benefits for the exercise
});


const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
