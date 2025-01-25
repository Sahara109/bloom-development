import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
          <Route path="/mental-health-education" element={<MentalHealthEducation />} /> {/* Add this route */}
          <Route path="/profile" element={<ProtectedRoute Component={Profile} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
