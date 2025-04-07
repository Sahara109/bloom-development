import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './Login.css'; // Import CSS for styling
import backgroundImage from "../../assets/images/background2.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading
  
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', { email, password });
      
      console.log("🛠 Backend response user data:", response.data.user);
      
      const { token, user } = response.data;
      
      // Check if role exists
      if (!user.role) {
        console.error("❌ Role missing in backend response:", user);
      }
  
      // Save token and user data to local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Authenticate user in context
      login(token, user);

      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/');
      } else {
        navigate('/landing');
      }
    } catch (err) {
      console.error("❌ Login failed", err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  return (
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Welcome Back</h2>

          {/* Error Message */}
          {error && (
            <p className="error-message" aria-live="assertive">
              {error}
            </p>
          )}

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

          {/* Loading Indicator */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
