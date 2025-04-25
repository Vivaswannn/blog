import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getTopicsByFacilitator } from '../../services/topicService';
import { FaPlus, FaEdit, FaBook, FaFileUpload, FaChartBar } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    topicsCount: 0,
    resourcesCount: 0,
    totalViews: 0,
    totalDownloads: 0
  });

  useEffect(() => {
    const fetchFacilitatorData = async () => {
      if (!user || !user.isFacilitator) return;
      
      try {
        setLoading(true);
        // Fetch topics created by this facilitator
        const topicsData = await getTopicsByFacilitator(user.id);
        setTopics(topicsData);
        
        // Calculate some basic stats
        setStats({
          topicsCount: topicsData.length,
          resourcesCount: Math.floor(Math.random() * 50), // Mock data
          totalViews: Math.floor(Math.random() * 5000), // Mock data
          totalDownloads: Math.floor(Math.random() * 1000) // Mock data
        });
        
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilitatorData();
  }, [user]);

  if (!user || !user.isFacilitator) {
    return (
      <div className="dashboard-unauthorized">
        <h2>Facilitator Access Required</h2>
        <p>You need to be logged in as a facilitator to access the dashboard.</p>
        <Link to="/login" className="auth-button">Log In</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <h3>Loading dashboard data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h3>Error Loading Dashboard</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Facilitator Dashboard</h1>
        <p>Welcome back, {user.name}! Manage your educational resources and track engagement.</p>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/topics/new" className="dashboard-action-btn create-topic">
          <FaPlus />
          <span>Create Topic</span>
        </Link>
        <Link to="/upload" className="dashboard-action-btn upload-resource">
          <FaFileUpload />
          <span>Upload Resource</span>
        </Link>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon topics">
            <FaBook />
          </div>
          <div className="stat-info">
            <h3>{stats.topicsCount}</h3>
            <p>Topics Created</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon resources">
            <FaFileUpload />
          </div>
          <div className="stat-info">
            <h3>{stats.resourcesCount}</h3>
            <p>Resources Uploaded</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon views">
            <FaChartBar />
          </div>
          <div className="stat-info">
            <h3>{stats.totalViews.toLocaleString()}</h3>
            <p>Total Views</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon downloads">
            <FaFileUpload />
          </div>
          <div className="stat-info">
            <h3>{stats.totalDownloads.toLocaleString()}</h3>
            <p>Total Downloads</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-section your-topics">
        <div className="section-header">
          <h2>Your Topics</h2>
          <Link to="/topics/new" className="create-new-btn">
            <FaPlus /> New Topic
          </Link>
        </div>
        
        {topics.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any topics yet.</p>
            <Link to="/topics/new" className="start-btn">Create Your First Topic</Link>
          </div>
        ) : (
          <div className="topics-grid">
            {topics.map(topic => (
              <div key={topic.id} className="topic-card">
                <div className="topic-icon">
                  {topic.iconUrl ? (
                    <img src={topic.iconUrl} alt={topic.name} />
                  ) : (
                    <div className="default-icon">{topic.name.charAt(0)}</div>
                  )}
                </div>
                <div className="topic-info">
                  <h3>{topic.name}</h3>
                  <p className="topic-description">{topic.description.substring(0, 100)}...</p>
                </div>
                <div className="topic-actions">
                  <Link to={`/topics/${topic.id}`} className="view-btn">View</Link>
                  <Link to={`/topics/edit/${topic.id}`} className="edit-btn">
                    <FaEdit />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="dashboard-section recent-activity">
        <h2>Recent Activity</h2>
        
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon view"></div>
            <div className="activity-details">
              <p>A user viewed your <strong>"JavaScript Basics"</strong> topic</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon download"></div>
            <div className="activity-details">
              <p>A resource from <strong>"React Fundamentals"</strong> was downloaded</p>
              <span className="activity-time">Yesterday</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon upload"></div>
            <div className="activity-details">
              <p>You uploaded a new resource to <strong>"Web APIs"</strong></p>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 