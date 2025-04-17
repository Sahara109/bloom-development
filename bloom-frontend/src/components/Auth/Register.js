import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import backgroundImage from "../../assets/images/background2.png";
import { useAuth } from '../../context/AuthContext'; // Adjust path accordingly


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5001/api/users/sign', {
        name,
        email,
        password,
      });

      setMessage(res.data.message || 'OTP sent to your email. Please verify.');
      setShowOtpField(true); // Show OTP field
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const { login } = useAuth();

const handleVerifyOtp = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5001/api/users/verify-otp", {
      email,
      otp,
    });

    const { token, user } = res.data;

    // Update context state and localStorage
    login(token, user);

    // Redirect to homepage
    navigate("/");
  } catch (error) {
    console.error("Error verifying OTP:", error);
    setError(error.response?.data?.message || "OTP verification failed");
  }
};


  return (
    <div className="register-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="register-container">
        <form onSubmit={showOtpField ? handleVerifyOtp : handleRegister} className="register-form">
          <h2 className="register-title">
            {showOtpField ? 'Verify Your Email' : 'Create Account'}
          </h2>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          {!showOtpField && (
            <>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
              </div>
            </>
          )}

          {showOtpField && (
            <div className="form-group">
              <label htmlFor="otp" className="form-label">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP sent to your email"
                required
                className="form-input"
              />
            </div>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading
              ? (showOtpField ? 'Verifying...' : 'Registering...')
              : (showOtpField ? 'Verify OTP' : 'Register')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
