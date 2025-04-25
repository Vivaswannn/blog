import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './TopicCard.css';

const TopicCard = ({ topic, onDelete, isAdmin }) => {
  // Format date to readable format
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const date = timestamp instanceof Date 
      ? timestamp 
      : timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="topic-card">
      <div className="topic-card-header">
        <div className="topic-icon">
          {topic.iconUrl ? (
            <img src={topic.iconUrl} alt={`Icon for ${topic.name}`} />
          ) : (
            <div className="default-icon">{topic.name.charAt(0)}</div>
          )}
        </div>
        <h3 className="topic-name">{topic.name}</h3>
      </div>
      
      <div className="topic-card-body">
        <p className="topic-description">{topic.description}</p>
        
        <div className="topic-meta">
          <div className="topic-date">
            <FaCalendarAlt size={32} />
            <span>Created: {formatDate(topic.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="topic-card-footer">
        <Link to={`/topics/${topic.id}`} className="view-btn">
          View Details <FaArrowRight size={32} />
        </Link>
        
        {isAdmin && (
          <div className="admin-actions">
            <Link to={`/topics/edit/${topic.id}`} className="edit-btn">
              <FaEdit size={32} /> Edit
            </Link>
            <button 
              onClick={() => onDelete(topic.id)} 
              className="delete-btn"
              aria-label={`Delete ${topic.name}`}
            >
              <FaTrash size={32} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

TopicCard.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconUrl: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ])
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool
};

TopicCard.defaultProps = {
  isAdmin: false
};

export default TopicCard; 