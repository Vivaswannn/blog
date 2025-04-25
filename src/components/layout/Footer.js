import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube 
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Function to handle link clicks
  const handleLinkClick = () => {
    // This ensures footer links scroll to top even if the ScrollToTop component doesn't catch it
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <ul className="footer-links">
              <li><Link to="/about" onClick={handleLinkClick}>Our Mission</Link></li>
              <li><Link to="/about/team" onClick={handleLinkClick}>Our Team</Link></li>
              <li><Link to="/about/story" onClick={handleLinkClick}>Our Story</Link></li>
              <li><Link to="/careers" onClick={handleLinkClick}>Careers</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><Link to="/topics" onClick={handleLinkClick}>All Topics</Link></li>
              <li><Link to="/categories" onClick={handleLinkClick}>Categories</Link></li>
              <li><Link to="/featured" onClick={handleLinkClick}>Featured Resources</Link></li>
              <li><Link to="/latest" onClick={handleLinkClick}>Latest Uploads</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><Link to="/help" onClick={handleLinkClick}>Help Center</Link></li>
              <li><Link to="/faq" onClick={handleLinkClick}>FAQs</Link></li>
              <li><Link to="/contact" onClick={handleLinkClick}>Contact Us</Link></li>
              <li><Link to="/feedback" onClick={handleLinkClick}>Feedback</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><Link to="/terms" onClick={handleLinkClick}>Terms of Service</Link></li>
              <li><Link to="/privacy" onClick={handleLinkClick}>Privacy Policy</Link></li>
              <li><Link to="/copyright" onClick={handleLinkClick}>Copyright</Link></li>
              <li><Link to="/accessibility" onClick={handleLinkClick}>Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-info">
          <div className="footer-brand">
            <img src="/assets/images/logo.png" alt="Resource Blog" />
            <span>Resource Blog</span>
          </div>
          <p>A comprehensive platform dedicated to sharing high-quality educational resources for students, teachers, and lifelong learners.</p>
        </div>
        
        <div className="footer-nav">
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/topics" onClick={handleLinkClick}>Topics</Link>
          <Link to="/about" onClick={handleLinkClick}>About</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          <Link to="/login" onClick={handleLinkClick}>Login</Link>
        </div>
        
        <div className="footer-social">
          <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://youtube.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {currentYear} Resource Blog. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <p>Made with <span style={{ color: '#e25555' }}>♥</span> for education</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;