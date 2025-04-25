import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTopics } from '../../services/topicService';
import './TopicList.css';

// Import icons directly - this is the most reliable method
import reactIcon from '../../assets/icons/react-icon.png';
import jsIcon from '../../assets/icons/js-icon.png';
import apiIcon from '../../assets/icons/api-icon.png';
import cssIcon from '../../assets/icons/css-icon.png';

// Icon mapping
const ICON_MAPPINGS = {
  'React Fundamentals': reactIcon,
  'JavaScript Basics': jsIcon,
  'Web APIs': apiIcon,
  'CSS and Styling': cssIcon
};

// Custom background colors for each topic
const TOPIC_COLORS = {
  'React Fundamentals': {
    background: '#e6f7ff',
    border: '#61dafb'
  },
  'JavaScript Basics': {
    background: '#fff9e6',
    border: '#f7df1e'
  },
  'Web APIs': {
    background: '#f6f6f6',
    border: '#6a6a6a'
  },
  'CSS and Styling': {
    background: '#f0f7ff',
    border: '#2965f1'
  }
};

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await getAllTopics();
        setTopics(topicsData);
      } catch (err) {
        setError('Failed to load topics. Please try again later.');
        console.error('Error fetching topics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading topics...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="topics-container">
      <h1>Educational Resources</h1>
      <p className="topics-intro">
        Browse through our collection of educational resources by topic. Click on a topic to view all available resources.
      </p>
      
      <div className="topics-grid">
        {topics.map(topic => {
          const colors = TOPIC_COLORS[topic.name] || { background: 'white', border: '#f0f0f0' };
          
          return (
            <Link to={`/topics/${topic.id}`} className="topic-card" key={topic.id}>
              <div className="topic-icon" style={{ 
                background: colors.background,
                borderColor: colors.border
              }}>
                <img 
                  src={ICON_MAPPINGS[topic.name]} 
                  alt={topic.name} 
                />
              </div>
              <h2>{topic.name}</h2>
              <p>{topic.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopicsList;