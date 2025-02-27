import React from 'react';
import './Footer.css'; // Make sure to import the CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Branding and Copyright */}
        <div className="footer-branding">
          <p>© 2025 BLOOM. All Rights Reserved.</p>
        </div>

        {/* Social Media Links */}
        <div className="social-links">
          <a href="#facebook" className="social-icon"><i className="fa fa-facebook"></i></a>
          <a href="#twitter" className="social-icon"><i className="fa fa-twitter"></i></a>
          <a href="#instagram" className="social-icon"><i className="fa fa-instagram"></i></a>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <a href="#terms">Terms of the Services</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
