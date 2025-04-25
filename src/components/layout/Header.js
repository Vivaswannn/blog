import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { 
  FaHome, 
  FaBook, 
  FaCloudUploadAlt, 
  FaChartLine, 
  FaInfoCircle, 
  FaUser, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaStar 
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/assets/images/logo.png" alt="Resource Blog" />
          <span>Resource Blog</span>
        </Link>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <FaHome /> Home
          </Link>
          <Link to="/topics" className={`nav-link ${isActive('/topics')}`}>
            <FaBook /> Topics
          </Link>
          {user && user.isFacilitator && (
            <>
              <Link to="/upload" className={`nav-link ${isActive('/upload')}`}>
                <FaCloudUploadAlt /> Upload
              </Link>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                <FaChartLine /> Dashboard
              </Link>
            </>
          )}
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>
            <FaInfoCircle /> About
          </Link>
        </nav>
        
        <div className="auth-container">
          {user ? (
            <div className="user-info">
              <div className="user-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <span className="user-name">
                <span>{user.name}</span>
                {user.isFacilitator && (
                  <span className="badge">
                    <FaStar /> Facilitator
                  </span>
                )}
              </span>
              <button className="logout-btn" onClick={handleLogout} title="Logout">
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">
              <FaUser /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;