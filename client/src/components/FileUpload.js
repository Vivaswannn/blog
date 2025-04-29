import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-toastify';

const FileUpload = ({ topicId, userId, onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('topicId', topicId);
    formData.append('userId', userId);

    setIsUploading(true);
    setError(null);

    try {
      console.log('Uploading file:', {
        name: file.name,
        size: file.size,
        type: file.type,
        topicId,
        userId
      });

      const response = await axios.post('http://localhost:5001/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      });

      if (response.status >= 400) {
        throw new Error(response.data.error || 'Upload failed');
      }

      console.log('Upload response:', response.data);
      toast.success('File uploaded successfully!');
      onUploadSuccess(response.data);
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to upload file';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  return (
    <div className="file-upload-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${isUploading ? 'uploading' : ''}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="upload-status">Uploading...</div>
        ) : isDragActive ? (
          <div className="upload-status">Drop the file here...</div>
        ) : (
          <div className="upload-status">
            Drag and drop a file here, or click to select a file
            <br />
            <small>Supported formats: PDF, JPEG, PNG, DOC, DOCX (max 10MB)</small>
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FileUpload; 