import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import CSS for styling
import backgroundImage from "../../assets/images/background2.png"; // Adjust image path accordingly

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        name,
        email,
        password,
      });
      alert(response.data.message); // Show success message
    } catch (error) {
      alert('Error: ' + error.response.data.message); // Show error message
    }
  };

  return (
    <div className="register-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 className="register-title">Create Account</h2>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
