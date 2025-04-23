import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicById } from '../../services/topicService';
import { getResourcesByTopic } from '../../services/resourceService';
import ResourceList from '../resources/ResourceList';
import './TopicList.css';

const TopicDetail = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopicAndResources = async () => {
      try {
        setLoading(true);
        const [topicData, resourcesData] = await Promise.all([
          getTopicById(topicId),
          getResourcesByTopic(topicId)
        ]);
        
        setTopic(topicData);
        setResources(resourcesData);
        setError(null);
      } catch (err) {
        setError('Failed to load topic data. Please try again later.');
        console.error('Error fetching topic details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicAndResources();
  }, [topicId]);

  if (loading) {
    return <div className="loading-container">Loading topic resources...</div>;
  }

  if (error || !topic) {
    return (
      <div className="error-container">
        <p>{error || 'Topic not found'}</p>
        <Link to="/" className="back-link">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="topic-detail-container">
      <div className="topic-header">
        <Link to="/" className="back-button">← Back to Topics</Link>
        <div className="topic-header-content">
          <div className="topic-header-icon">
            <img src={`/assets/images/${topic.icon}`} alt={topic.name} />
          </div>
          <div className="topic-header-info">
            <h1>{topic.name}</h1>
            <p>{topic.description}</p>
          </div>
        </div>
      </div>
      
      <div className="topic-resources">
        <h2>Available Resources</h2>
        {resources.length > 0 ? (
          <ResourceList resources={resources} />
        ) : (
          <div className="no-resources">
            <p>No resources available for this topic yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;