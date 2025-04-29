import React, { useState, useEffect } from 'react';
import { uploadFile, getTopicFiles, downloadFile, deleteFile } from '../../services/storageService';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';
import './FileManager.css';

const FileManager = ({ topicId }) => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadFiles();
  }, [topicId]);

  const loadFiles = async () => {
    try {
      setError(null);
      const topicFiles = await getTopicFiles(topicId);
      setFiles(topicFiles);
    } catch (err) {
      console.error('Error loading files:', err);
      setError('Failed to load files. Please try again later.');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const uploadedFile = await uploadFile(file, topicId, user.id);
      setFiles(prev => [...prev, uploadedFile]);
      setSuccess('File uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset file input
    }
  };

  const handleDownload = async (fileId) => {
    try {
      setError(null);
      setSuccess(null);
      await downloadFile(fileId);
      setSuccess('File download started!');
    } catch (err) {
      console.error('Download error:', err);
      setError(err.message || 'Failed to download file. Please try again.');
    }
  };

  const handleDelete = async (fileId) => {
    try {
      setError(null);
      setSuccess(null);
      await deleteFile(fileId);
      setFiles(prev => prev.filter(f => f.id !== fileId));
      setSuccess('File deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete file. Please try again.');
    }
  };

  return (
    <div className="file-manager">
      {user.role === 'teacher' && (
        <div className="upload-section">
          <label className="upload-button">
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading}
              style={{ display: 'none' }}
            />
            {isUploading ? 'Uploading...' : 'Upload File'}
          </label>
          <p className="upload-hint">Supported formats: PDF, JPEG, PNG, DOC (Max 10MB)</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="files-list">
        {files.length === 0 ? (
          <div className="no-files">No files uploaded yet</div>
        ) : (
          files.map(file => (
            <div key={file.id} className="file-item">
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <div className="file-actions">
                <button
                  className="download-btn"
                  onClick={() => handleDownload(file.id)}
                >
                  Download
                </button>
                {user.role === 'teacher' && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(file.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

FileManager.propTypes = {
  topicId: PropTypes.string.isRequired
};

export default FileManager; 