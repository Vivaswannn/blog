import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { likeResource } from '../../services/resourceService';
import './ResourceCard.css';

const ResourceCard = ({ resource }) => {
  const [currentResource, setCurrentResource] = useState(resource);
  const [likeInProgress, setLikeInProgress] = useState(false);
  const { user } = useContext(AuthContext);

  // Format the date to be more readable
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    return fileType === 'pdf' ? 'pdf-icon.png' : 'ppt-icon.png';
  };

  // Handle like click
  const handleLike = async () => {
    if (!user || likeInProgress) return;
    
    setLikeInProgress(true);
    try {
      const updatedResource = await likeResource(currentResource.id);
      setCurrentResource(updatedResource);
    } catch (error) {
      console.error('Error liking resource:', error);
    } finally {
      setLikeInProgress(false);
    }
  };

  return (
    <div className="resource-card">
      <div className="resource-card-header">
        <div className="resource-type-icon">
          <img 
            src={`/assets/images/${getFileIcon(currentResource.fileType)}`} 
            alt={currentResource.fileType} 
          />
        </div>
        <h3 className="resource-title">{currentResource.title}</h3>
      </div>
      
      <p className="resource-description">{currentResource.description}</p>
      
      <div className="resource-meta">
        <div className="resource-uploader">
          <strong>By:</strong> {currentResource.uploader.name}
        </div>
        <div className="resource-date">
          <strong>Uploaded:</strong> {formatDate(currentResource.uploadDate)}
        </div>
      </div>
      
      <div className="resource-actions">
        <a 
          href={currentResource.fileUrl} 
          className="resource-download-btn" 
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Download {currentResource.fileType.toUpperCase()}
        </a>
        
        <button 
          className={`resource-like-btn ${!user ? 'disabled' : ''}`}
          onClick={handleLike}
          disabled={!user || likeInProgress}
        >
          <span className="like-icon">♥</span>
          <span className="like-count">{currentResource.likes}</span>
        </button>
      </div>
      
      {!user && (
        <div className="login-prompt">
          <small>Log in to like this resource</small>
        </div>
      )}
    </div>
  );
};

export default ResourceCard;