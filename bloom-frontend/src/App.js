import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import About from './components/About/About';
import Footer from './components/Home/Footer';  


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />  {/* About page route */}
      </Routes>
      <Footer /> {/* Place the Footer here so it shows on all pages */}
    </Router>
  );
};

export default App;
