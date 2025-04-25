import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TopicCard from './TopicCard';
import { FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';
import './TopicList.css';

const TopicList = ({ isAdmin, onDelete }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // This would be replaced with an actual API call
        // For now, using mock data
        const mockTopics = [
          {
            id: 1,
            name: 'React Fundamentals',
            description: 'Learn the core concepts of React including components, props, state, and hooks.',
            createdAt: '2023-05-10T08:30:00Z',
            imageUrl: 'https://picsum.photos/200/200',
          },
          {
            id: 2,
            name: 'JavaScript ES6+',
            description: 'Explore modern JavaScript features including arrow functions, destructuring, and async/await.',
            createdAt: '2023-05-15T10:45:00Z',
          },
          {
            id: 3,
            name: 'CSS Grid & Flexbox',
            description: 'Master modern CSS layout techniques with Grid and Flexbox for responsive designs.',
            createdAt: '2023-05-20T14:20:00Z',
            imageUrl: 'https://picsum.photos/200/200?random=1',
          },
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setTopics(mockTopics);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to fetch topics. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleDelete = async (topicId) => {
    try {
      // This would be replaced with an actual API call
      // For now, just updating the state
      setTopics(topics.filter(topic => topic.id !== topicId));
      
      if (onDelete) {
        onDelete(topicId);
      }
    } catch (err) {
      setError('Failed to delete topic. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="topics-loading">
        <div className="spinner"></div>
        <p>Loading topics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="topics-error">
        <div className="error-icon">
          <FaExclamationTriangle size={48} />
        </div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          <FaSyncAlt size={32} /> Retry
        </button>
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="topics-empty">
        <p>No topics found. Be the first to create a topic!</p>
      </div>
    );
  }

  return (
    <div className="topics-list">
      {topics.map(topic => (
        <TopicCard
          key={topic.id}
          topic={topic}
          isAdmin={isAdmin}
          onDelete={() => handleDelete(topic.id)}
        />
      ))}
    </div>
  );
};

TopicList.propTypes = {
  isAdmin: PropTypes.bool,
  onDelete: PropTypes.func,
};

TopicList.defaultProps = {
  isAdmin: false,
};

export default TopicList; 