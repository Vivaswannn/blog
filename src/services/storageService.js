// Mock storage implementation
// In a real app, this would use a cloud storage service like Firebase Storage or AWS S3

const API_URL = 'http://localhost:5000/api';

// Upload a file
export const uploadFile = async (file, topicId, userId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('topicId', topicId);
  formData.append('userId', userId);

  try {
    const response = await fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload file');
    }

    const data = await response.json();
    console.log('Upload successful:', data);
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Get all files for a topic
export const getTopicFiles = async (topicId) => {
  try {
    const response = await fetch(`${API_URL}/files?topicId=${topicId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch files');
    }

    const data = await response.json();
    console.log('Files fetched:', data);
    return data;
  } catch (error) {
    console.error('Fetch files error:', error);
    throw error;
  }
};

// Download a file
export const downloadFile = async (fileId) => {
  try {
    console.log('Attempting to download file:', fileId);
    const response = await fetch(`${API_URL}/files/${fileId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to download file');
    }

    // Create a temporary link and trigger download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileId;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    console.log('Download successful');
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

// Delete a file
export const deleteFile = async (fileId) => {
  try {
    const response = await fetch(`${API_URL}/files/${fileId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete file');
    }

    const data = await response.json();
    console.log('Delete successful:', data);
    return data;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}; 