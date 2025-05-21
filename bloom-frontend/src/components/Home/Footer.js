import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Branding and Mission */}
        <div className="footer-section about">
          <h3>BLOOM</h3>
          <p>Promoting mental wellbeing through awareness, support, and self-care.</p>
          <p className="copyright">© 2025 BLOOM. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media & Contact Info */}
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/BLOOMMentalHealth" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="https://twitter.com/BLOOMWellbeing" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/BLOOMMentalHealth" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
          <div className="contact-info">
            📞 <a href="tel:+1234567890">+1 (234) 567-890</a><br />
            📧 <a href="mailto:support@bloomwellbeing.com">bloommentalcare@gmail.com</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
