// controllers/videoController.js
const Video = require('../models/Video');
const Activity = require('../models/Activity'); 

// Create a new video
// controllers/videoController.js
const createVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const newVideo = new Video({
      title,
      description,
      url: `/videos2/${req.file.filename}`,
    });

    await newVideo.save();

    // Log admin activity
    await Activity.create({
      description: `Admin added a new video titled "${title}"`,
      user: req.user ? req.user._id : null,
    });

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating video', error: error.message });
  }
};


// Get all videos
// controllers/videoController.js
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({}, 'title description url createdAt');
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Update a video
const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { title, description, url },
      { new: true }
    );

    // Log admin activity
    await Activity.create({
      description: `Admin updated video with ID ${id}`,
      user: req.user ? req.user._id : null,
    });

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating video', error });
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    await Video.findByIdAndDelete(id);

    // Log admin activity
    await Activity.create({
      description: `Admin deleted video with ID ${id}`,
      user: req.user ? req.user._id : null,
    });

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error });
  }
};

// Get a single video by ID
const getVideoById = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video', error });
    }
};

module.exports = {
    createVideo,
    getVideos,
    updateVideo,
    deleteVideo,
    getVideoById, 
};
