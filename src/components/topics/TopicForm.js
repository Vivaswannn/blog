import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTopic } from '../../services/topicService';
import { AuthContext } from '../../contexts/AuthContext';
import './TopicForm.css';

const ICON_OPTIONS = [
  { value: 'javascript-icon.png', label: 'JavaScript' },
  { value: 'react-icon.png', label: 'React' },
  { value: 'node-icon.png', label: 'Node.js' },
  { value: 'html-icon.png', label: 'HTML' },
  { value: 'css-icon.png', label: 'CSS' },
  { value: 'python-icon.png', label: 'Python' },
  { value: 'java-icon.png', label: 'Java' },
  { value: 'database-icon.png', label: 'Database' },
  { value: 'default-icon.png', label: 'Default' }
];

const TopicForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'default-icon.png'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not a facilitator
    if (!user || !user.isFacilitator) {
      navigate('/login');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Topic name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      const newTopic = await createTopic(formData);
      
      // Redirect to the new topic's page
      navigate(`/topics/${newTopic.id}`);
    } catch (error) {
      console.error('Error creating topic:', error);
      setErrors({ submit: 'Failed to create topic. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="topic-form-container">
      <div className="topic-form-header">
        <h1>Create New Topic</h1>
        <p>Add a new topic to the resource library</p>
      </div>
      
      <form className="topic-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Topic Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter a topic name"
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a description for this topic"
            className={errors.description ? 'error-input' : ''}
            rows={5}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>
        
        <div className="form-group">
          <label>Icon</label>
          <div className="icon-selection">
            {ICON_OPTIONS.map((icon) => (
              <div 
                key={icon.value}
                className={`icon-option ${formData.icon === icon.value ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, icon: icon.value }))}
              >
                <img 
                  src={`/assets/images/${icon.value}`} 
                  alt={icon.label}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/default-icon.png';
                  }}
                />
                <span>{icon.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Topic'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopicForm; 