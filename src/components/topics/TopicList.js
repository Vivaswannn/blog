import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTopics } from '../../services/topicService';
import './TopicList.css';

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
        {topics.map(topic => (
          <Link to={`/topics/${topic.id}`} className="topic-card" key={topic.id}>
            <div className="topic-icon">
              <img src={`/assets/images/${topic.icon}`} alt={topic.name} />
            </div>
            <h2>{topic.name}</h2>
            <p>{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;