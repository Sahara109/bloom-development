const mongoose = require("mongoose");

// const exerciseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { type: String, enum: ["breathing", "meditation"], required: true },
//   duration: { type: Number, required: true }, // Duration in minutes
//   media: { type: String }, // Link to video/audio guide (optional)
// });

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Image field (can be used for thumbnails)
  video: { type: String }, // Link to the video file (hosted on your server)
  steps: { type: [String] }, // Array of steps for the exercise
  benefits: { type: [String] }, // Array of benefits for the exercise
});


const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
