// Mock topic data - in a real app, this would be connected to a backend API
const topics = [
    {
      id: 1,
      name: 'React Fundamentals',
      description: 'Learn the core concepts of React library',
      icon: 'react-icon.png'
    },
    {
      id: 2,
      name: 'JavaScript Basics',
      description: 'Foundation concepts of JavaScript programming',
      icon: 'js-icon.png'
    },
    {
      id: 3,
      name: 'Web APIs',
      description: 'Understanding and working with various web APIs',
      icon: 'api-icon.png'
    },
    {
      id: 4,
      name: 'CSS and Styling',
      description: 'Advanced styling techniques for web applications',
      icon: 'css-icon.png'
    }
  ];
  
  export const getAllTopics = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...topics]);
      }, 500);
    });
  };
  
  export const getTopicById = (topicId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const topic = topics.find(t => t.id === parseInt(topicId));
        if (topic) {
          resolve(topic);
        } else {
          reject(new Error('Topic not found'));
        }
      }, 300);
    });
  };
  
  export const addTopic = (topicData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTopic = {
          id: topics.length + 1,
          ...topicData
        };
        topics.push(newTopic);
        resolve(newTopic);
      }, 500);
    });
  };