const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Database Connection
const userRoutes = require("./routes/userRoutes"); // Auth Routes
const userManagementRoutes = require("./routes/userManagementRoutes"); // User CRUD Routes
const articleRoutes = require("./routes/articleRoutes");
const videoRoutes = require("./routes/videoRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

const cors = require("cors");

dotenv.config();
connectDB();

const app = express(); // Initialize Express BEFORE using it
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Use Routes
app.use("/api/users", userRoutes); // Authentication routes
app.use("/api/user-management", userManagementRoutes); // User management routes
app.use("/api/articles", articleRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/exercises", exerciseRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));