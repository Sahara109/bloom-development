import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css'; // Make sure to import the CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Branding and Copyright */}
        <div className="footer-branding">
          <p>© 2025 BLOOM. All rights reserved.</p>
        </div>

        {/* Social Media Links */}
        <div className="social-links">
          <a href="https://www.facebook.com/BLOOMMentalHealth" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://twitter.com/BLOOMWellbeing" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/BLOOMMentalHealth" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fa fa-instagram"></i>
          </a>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
        <Link to="/terms-of-service">Terms of Service</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/contact-us">Contact</Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
