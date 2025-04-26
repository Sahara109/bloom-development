import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const BACKEND = process.env.REACT_APP_BACKEND;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post(`${BACKEND}/api/users/forgot-password`, { email });
      setMessage(res.data.message || 'Password reset link sent to your email');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error sending password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleForgotPassword} className="forgot-password-form">
        <h2>Forgot Password</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Password Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
