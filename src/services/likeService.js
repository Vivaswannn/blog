// Mock data for likes
const mockLikes = [];

// Check if a user has already liked a topic
export const hasUserLikedTopic = async (userId, topicId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hasLiked = mockLikes.some(like => 
        like.userId === userId && like.topicId === topicId
      );
      resolve(hasLiked);
    }, 100);
  });
};

// Add a like to a topic
export const addLike = async (userId, topicId, isTeacher) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user has already liked
      const hasLiked = mockLikes.some(like => 
        like.userId === userId && like.topicId === topicId
      );
      
      if (hasLiked) {
        reject(new Error('You have already liked this topic'));
        return;
      }

      // Add the like
      mockLikes.push({
        id: Date.now().toString(),
        userId,
        topicId,
        createdAt: new Date()
      });
      
      resolve(true);
    }, 100);
  });
};

// Remove a like from a topic
export const removeLike = async (userId, topicId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockLikes.findIndex(like => 
        like.userId === userId && like.topicId === topicId
      );
      
      if (index !== -1) {
        mockLikes.splice(index, 1);
      }
      
      resolve(true);
    }, 100);
  });
};

// Get like count for a topic
export const getLikeCount = async (topicId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const count = mockLikes.filter(like => like.topicId === topicId).length;
      resolve(count);
    }, 100);
  });
}; 