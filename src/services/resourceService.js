const API_URL = 'http://localhost:5000/api';

export const getAllResources = async () => {
  try {
    const response = await fetch(`${API_URL}/files`);
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

export const getResourcesByTopic = async (topicId) => {
  try {
    const response = await fetch(`${API_URL}/files?topicId=${topicId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch topic resources');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching topic resources:', error);
    throw error;
  }
};

export const uploadResource = async (file, topicId, userId) => {
  try {
    console.log('Preparing upload with:', {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      topicId,
      userId
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('topicId', topicId);
    formData.append('userId', userId);

    console.log('Sending upload request to:', `${API_URL}/files/upload`);
    
    const response = await fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header, let the browser set it with the boundary
    });

    console.log('Upload response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Upload failed with status:', response.status, 'Error:', errorData);
      throw new Error(errorData.error || 'Failed to upload resource');
    }

    const result = await response.json();
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Upload error in resourceService:', error);
    throw error;
  }
  };
  
export const downloadResource = async (fileId) => {
  try {
    const response = await fetch(`${API_URL}/files/${fileId}`);
    if (!response.ok) {
      throw new Error('Failed to download resource');
    }
    return response;
  } catch (error) {
    console.error('Error downloading resource:', error);
    throw error;
  }
  };
  
export const deleteResource = async (fileId) => {
  try {
    const response = await fetch(`${API_URL}/files/${fileId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete resource');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
  };
  
export const likeResource = async (fileId) => {
  try {
    const response = await fetch(`${API_URL}/files/${fileId}/like`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to like resource');
    }
    return await response.json();
  } catch (error) {
    console.error('Error liking resource:', error);
    throw error;
  }
  };