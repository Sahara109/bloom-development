import React, { useState } from "react";
import Modal from "react-modal";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Footer from "./components/Home/Footer";
import Landing from "./components/Landing/Landing";
import MentalHealthEducation from "./components/MentalHealthEducation/MentalHealthEducation";
import ArticlePage from "./components/MentalHealthEducation/ArticlePage"; 
import MindfulExercises from "./components/MindfulExercises/MindfulExercises";
import CommunitySupport from "./components/CommunitySupport/CommunitySupport";
import StoryFeed from "./components/CommunitySupport/StoryFeed";
import StoryForm from "./components/CommunitySupport/StoryForm";
import StoryDetail from './components/CommunitySupport/StoryDetail'; 
import Chatbot from "./components/Chatbot-AI/Chatbot_bl";

// Import admin components from components/Admin folder
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageUsers from './components/Admin/ManageUsers';
import ManageArticles from './components/Admin/ManageArticles';
import ManageVideos from './components/Admin/ManageVideos';
import ManageExercises from './components/Admin/ManageExercises';
import ManageCommunityStories from './components/Admin/ManageCommunityStories';
import AddArticle from "./components/Admin/AddArticle";
import UpdateArticle from "./components/Admin/UpdateArticle";


Modal.setAppElement("#root");

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleStoryAdded = () => {
    setRefresh((prev) => !prev); // Toggle refresh state to trigger re-render
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<ProtectedRoute Component={Landing} />} />
          <Route path="/mental-health-education" element={<MentalHealthEducation />} />
          <Route path="/article/:id" element={<ArticlePage />} /> {/* Define route for article page */}
          <Route path="/profile" element={<ProtectedRoute Component={Profile} />} />
          <Route path="/about" element={<About />} />
          <Route path="/mindful-exercises" element={<MindfulExercises />} />
          <Route path="/community-support" element={<CommunitySupport />} />
          
        

          {/* Routes for Community Stories */}
          <Route
            path="/stories"
            element={<StoryFeed key={refresh} />} // Force re-render when refresh changes
          />
          <Route
            path="/create-story"
            element={<StoryForm onStoryAdded={handleStoryAdded} />} // Trigger refresh when a story is added
          />

          <Route path="/story/:id" element={<StoryDetail />} />

          <Route path="*" element={<div>404: Page Not Found</div>} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute Component={AdminDashboard} isAdminRoute />} />
          <Route path="/admin/users" element={<ProtectedRoute Component={ManageUsers} isAdminRoute />} />
          <Route path="/admin/articles" element={<ProtectedRoute Component={ManageArticles} isAdminRoute />} />
          <Route path="/admin/videos" element={<ProtectedRoute Component={ManageVideos} isAdminRoute />} />
          <Route path="/admin/exercises" element={<ProtectedRoute Component={ManageExercises} isAdminRoute />} />
          <Route path="/admin/community-stories" element={<ProtectedRoute Component={ManageCommunityStories} isAdminRoute />} />
          <Route path="/admin/update-article/:id" element={<ProtectedRoute Component={UpdateArticle} isAdminRoute />} />
          <Route path="/admin/add-article" element={<ProtectedRoute Component={AddArticle} isAdminRoute />} />
        
        </Routes>
   
        <Chatbot /> {/* Place it outside <Routes> */}

        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;