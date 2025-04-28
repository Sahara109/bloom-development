const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const userManagementRoutes = require("./routes/userManagementRoutes");
const articleRoutes = require("./routes/articleRoutes");
const videoRoutes = require("./routes/videoRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const communitySupportRoutes = require("./routes/communitySupport");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");

const { protect: authMiddleware } = require("./middleware/authMiddleware");
const updateLastActive = require("./middleware/updateLastActive");

dotenv.config();
connectDB();

const app = express();

// ✅ Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  // "https://6fcd-110-44-124-75.ngrok-free.app",
];

// ✅ Apply CORS before all routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith(".ngrok-free.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));
app.use(express.json());


// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Profile Image Upload Route
app.post("/uploadProfileImage", upload.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Assuming req.user contains the user ID
  User.findByIdAndUpdate(
    req.user?._id,
    { profileImage: `/uploads/${req.file.filename}` },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: "Error updating profile image" }));
});


// Use Routes
app.use("/api/users", userRoutes);

// Auth middleware applied globally for routes needing authentication
app.use(authMiddleware);

// Update last active timestamp on every authenticated request
app.use(updateLastActive);

app.use("/api/user-management", userManagementRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api", communitySupportRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);



// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
