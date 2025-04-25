import React from 'react';
import './PlaceholderPage.css';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="placeholder-container">
      <div className="placeholder-content">
        <h1>{title}</h1>
        <p className="placeholder-description">{description}</p>
        
        <div className="coming-soon-box">
          <div className="coming-soon-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#4A6BFF"/>
              <path d="M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="#4A6BFF"/>
            </svg>
          </div>
          <h2>Coming Soon!</h2>
          <p>We're working hard to bring you this feature. Please check back later.</p>
        </div>
        
        <div className="placeholder-features">
          <h3>Planned Features</h3>
          <ul>
            <li>Easy navigation and search</li>
            <li>Personalized recommendations</li>
            <li>Interactive content</li>
            <li>Community contributions</li>
          </ul>
        </div>
        
        <button className="back-button" onClick={() => window.history.back()}>
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default PlaceholderPage; 