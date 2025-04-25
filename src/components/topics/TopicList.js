import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllTopics } from '../../services/topicService';
import { AuthContext } from '../../contexts/AuthContext';
import TopicForm from './TopicForm';
import TopicCard from './TopicCard';
import { 
  FaPlus, 
  FaBookOpen, 
  FaExclamationTriangle, 
  FaSyncAlt, 
  FaArrowRight 
} from 'react-icons/fa';
import './TopicList.css';

// Icon mapping using public assets
const ICON_MAPPINGS = {
  'React Fundamentals': '/assets/images/react-icon.png',
  'JavaScript Basics': '/assets/images/js-icon.png',
  'Web APIs': '/assets/images/api-icon.png',
  'CSS and Styling': '/assets/images/css-icon.png'
};

// Custom background colors for each topic
const TOPIC_COLORS = {
  'React Fundamentals': {
    background: '#e6f7ff',
    border: '#61dafb',
    gradient: 'linear-gradient(45deg, #61dafb20, #61dafb40)'
  },
  'JavaScript Basics': {
    background: '#fff9e6',
    border: '#f7df1e',
    gradient: 'linear-gradient(45deg, #f7df1e20, #f7df1e40)'
  },
  'Web APIs': {
    background: '#f6f6f6',
    border: '#6a6a6a',
    gradient: 'linear-gradient(45deg, #6a6a6a20, #6a6a6a40)'
  },
  'CSS and Styling': {
    background: '#f0f7ff',
    border: '#2965f1',
    gradient: 'linear-gradient(45deg, #2965f120, #2965f140)'
  }
};

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const topicsData = await getAllTopics();
      setTopics(topicsData);
      setError(null);
    } catch (err) {
      setError('Failed to load topics. Please try again later.');
      console.error('Error fetching topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicAdded = (newTopic) => {
    setTopics([...topics, newTopic]);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h3>Loading educational resources...</h3>
        <p>Please wait while we retrieve the topics</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle size={48} />
        </div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => fetchTopics()} className="retry-btn">
          <FaSyncAlt size={22} /> Try Again
        </button>
      </div>
    );
  }

  // If showing add form, render the form
  if (showAddForm) {
    return (
      <TopicForm 
        onCancel={() => setShowAddForm(false)}
        onTopicAdded={handleTopicAdded}
      />
    );
  }

  return (
    <div className="topics-container">
      <div className="topics-header">
        <div className="topics-title">
          <h1>Educational Resources</h1>
          <div className="title-decoration"></div>
        </div>
        {user && user.isFacilitator && (
          <button 
            className="add-topic-btn"
            onClick={() => setShowAddForm(true)}
            aria-label="Add new topic"
          >
            <FaPlus size={22} /> Add New Topic
          </button>
        )}
      </div>
      
      <p className="topics-intro">
        Browse through our collection of educational resources by topic. Click on a topic to view all available resources.
      </p>
      
      {topics.length === 0 ? (
        <div className="no-topics">
          <div className="empty-state-image">
            <FaBookOpen size={100} />
          </div>
          <h3>No topics available yet</h3>
          <p>Be the first to create a topic for educational resources!</p>
          {user && user.isFacilitator && (
            <button 
              className="create-first-topic-btn"
              onClick={() => setShowAddForm(true)}
            >
              Create First Topic
            </button>
          )}
        </div>
      ) : (
        <div className="topics-grid">
          {topics.map((topic, index) => {
            const colors = TOPIC_COLORS[topic.name] || { 
              background: 'white', 
              border: '#f0f0f0',
              gradient: 'linear-gradient(45deg, #f0f0f020, #f0f0f040)'
            };
            
            const iconPath = ICON_MAPPINGS[topic.name] || `/assets/images/default-icon.png`;
            
            return (
              <Link 
                to={`/topics/${topic.id}`} 
                className="topic-card" 
                key={topic.id}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="card-background" style={{ background: colors.gradient }}></div>
                <div className="topic-icon" style={{ 
                  background: colors.background,
                  borderColor: colors.border
                }}>
                  <img 
                    src={iconPath}
                    alt={topic.name} 
                    onError={(e) => {
                      e.target.src = '/assets/images/default-profile.png';
                    }}
                  />
                </div>
                <h2>{topic.name}</h2>
                <p>{topic.description}</p>
                <div className="topic-card-footer">
                  <span className="view-details">
                    View Details <FaArrowRight size={22} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopicsList;