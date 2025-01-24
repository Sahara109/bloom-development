import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import CSS for styling
import backgroundImage from "../../assets/images/background2.png"; // Adjust image path accordingly

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        name,
        email,
        password,
      });

      setMessage(response.data.message); // Show success message
      setName(''); // Clear name field
      setEmail(''); // Clear email field
      setPassword(''); // Clear password field
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.'); // Show error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="register-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 className="register-title">Create Account</h2>

          {/* Success or Error Messages */}
          {message && (
            <p className="success-message" aria-live="polite">
              {message}
            </p>
          )}
          {error && (
            <p className="error-message" aria-live="polite">
              {error}
            </p>
          )}

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
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
