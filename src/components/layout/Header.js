import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/assets/images/logo.png" alt="Resource Blog" />
          <span>Resource Blog</span>
        </Link>
        
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          {user && user.isFacilitator && (
            <Link to="/upload" className="nav-link">Upload Resource</Link>
          )}
        </nav>
        
        <div className="auth-container">
          {user ? (
            <div className="user-info">
              <span className="user-name">
                {user.name}
                {user.isFacilitator && <span className="badge">Facilitator</span>}
              </span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;