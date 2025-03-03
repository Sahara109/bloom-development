import React from 'react';
import Modal from 'react-modal'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Footer from './components/Home/Footer';
import Landing from './components/Landing/Landing';
import MentalHealthEducation from './components/MentalHealthEducation/MentalHealthEducation';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddArticle from './components/Admin/AddArticle';
import UpdateArticle from './components/Admin/UpdateArticle';
import MindfulExercises from "./components/MindfulExercises/MindfulExercises";
import CommunitySupport from "./components/CommunitySupport/CommunitySupport";

Modal.setAppElement('#root');

const App = () => {
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
          <Route path="/profile" element={<ProtectedRoute Component={Profile} />} />
          <Route path="/about" element={<About />} />
          <Route path="/mindful-exercises" element={<MindfulExercises />} />
          <Route path="/community-support" element={<CommunitySupport />} />
          <Route path="*" element={<div>404: Page Not Found</div>} />

          {/* Protected route for admin */}
          <Route path="/admin" element={<ProtectedRoute Component={AdminDashboard} isAdminRoute />} />
          
          {/* Admin routes */}
          <Route path="/admin/add-article" element={<ProtectedRoute Component={AddArticle} isAdminRoute />} />
          <Route path="/admin/update-article/:id" element={<ProtectedRoute Component={UpdateArticle} isAdminRoute />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;