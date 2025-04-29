import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadResource } from '../../services/resourceService';
import { AuthContext } from '../../contexts/AuthContext';
import './UploadResource.css';

const UploadResource = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const topicId = new URLSearchParams(location.search).get('topicId');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log('Selected file:', {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      });
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (!user) {
      setError('You must be logged in to upload resources');
      return;
    }

    if (!topicId) {
      setError('Topic ID is missing');
      return;
    }

    console.log('Starting upload with:', {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      topicId,
      userId: user.id
    });

    try {
      setUploading(true);
      setError(null);
      
      const result = await uploadResource(file, topicId, user.id);
      console.log('Upload successful:', result);
      navigate(`/topics/${topicId}`);
    } catch (err) {
      console.error('Upload error details:', err);
      setError(`Failed to upload resource: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-resource-container">
      <h2>Upload Resource</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="file">Select File</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          disabled={uploading || !file}
          className="upload-button"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadResource; 