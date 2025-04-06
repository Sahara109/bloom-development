// controllers/videoController.js
const Video = require('../models/Video');

// Create a new video
const createVideo = async (req, res) => {
    const { title, description, url } = req.body;
    try {
        const newVideo = new Video({
            title,
            description,
            url,
        });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating video', error });
    }
};

// Get all videos
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error });
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

