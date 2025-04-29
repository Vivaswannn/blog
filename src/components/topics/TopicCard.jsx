import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCalendarAlt, FaArrowRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { addLike, removeLike, getLikeCount, hasUserLikedTopic } from '../../services/likeService';
import './TopicCard.css';

const TopicCard = ({ topic, onDelete, isAdmin, user }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (user && !isAdmin) { // Only students can like
        try {
          const [hasLiked, count] = await Promise.all([
            hasUserLikedTopic(user.id, topic.id),
            getLikeCount(topic.id)
          ]);
          setIsLiked(hasLiked);
          setLikeCount(count);
        } catch (err) {
          console.error('Error fetching like status:', err);
        }
      }
    };

    fetchLikeStatus();
  }, [user, topic.id, isAdmin]);

  const handleLike = async () => {
    if (!user || isAdmin || user.id === topic.createdBy) return; // Teachers can't like their own content
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (isLiked) {
        await removeLike(user.id, topic.id);
        setLikeCount(prev => prev - 1);
      } else {
        await addLike(user.id, topic.id, isAdmin);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Handle image error
  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/assets/images/default-icon.png';
    e.target.style.objectFit = 'contain';
    e.target.style.padding = '8px';
  };

  // Ensure icon URL has the correct path
  const getIconUrl = (url) => {
    console.log("Original icon URL:", url); // Debug log
    
    if (!url) {
      console.log("No URL provided, using default icon");
      return '/assets/images/default-icon.png';
    }
    
    // If it's already absolute, use as is
    if (url.startsWith('http') || url.startsWith('/')) {
      console.log("Using absolute URL:", url);
      return url;
    }
    
    // Otherwise prepend the public path
    const fullUrl = `/assets/images/${url}`;
    console.log("Using constructed URL:", fullUrl);
    return fullUrl;
  };

  const iconUrl = getIconUrl(topic.iconUrl);
  console.log("Final icon URL for topic", topic.name, ":", iconUrl); // Debug log

  return (
    <div className="topic-card">
      <div className="topic-card-header">
        <h3 className="topic-name">{topic.name}</h3>
      </div>
      
      <div className="topic-card-body">
        <p className="topic-description">{topic.description}</p>
        
        <div className="topic-meta">
          <div className="topic-date">
            <FaCalendarAlt size={24} />
            <span>Created: {formatDate(topic.createdAt)}</span>
          </div>
          {user && !isAdmin && user.id !== topic.createdBy && (
            <button 
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
              disabled={isLoading}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              <span>{likeCount}</span>
            </button>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      
      {/* View details button */}
      <div className="topic-card-actions">
        <Link to={`/topics/${topic.id}`} className="view-btn">
          View Details <FaArrowRight size={24} />
        </Link>
      </div>
      
      {/* Admin actions shown only for admins */}
      {isAdmin && (
        <div className="admin-actions-container">
          <div className="admin-actions">
            <Link to={`/topics/edit/${topic.id}`} className="edit-btn">
              <FaEdit size={20} /> Edit
            </Link>
            <button 
              onClick={() => onDelete(topic.id)} 
              className="delete-btn"
              aria-label={`Delete ${topic.name}`}
            >
              <FaTrash size={20} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

TopicCard.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ]),
    createdBy: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

TopicCard.defaultProps = {
  isAdmin: false,
  user: null
};

export default TopicCard; 