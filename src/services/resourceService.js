// Mock resource data - in a real app, this would be connected to a backend API
let resources = [
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Basics of React components and JSX',
      fileType: 'pdf',
      fileUrl: '/assets/mock/intro-to-react.pdf',
      topicId: 1,
      uploader: { id: 2, name: 'John Doe' },
      uploadDate: '2023-12-15T10:30:00',
      likes: 24
    },
    {
      id: 2,
      title: 'Advanced React Hooks',
      description: 'Deep dive into React hooks',
      fileType: 'pdf',
      fileUrl: '/assets/mock/advanced-hooks.pdf',
      topicId: 1,
      uploader: { id: 3, name: 'Jane Smith' },
      uploadDate: '2023-12-17T14:15:00',
      likes: 18
    },
    {
      id: 3,
      title: 'JavaScript Fundamentals',
      description: 'Core concepts of JavaScript language',
      fileType: 'ppt',
      fileUrl: '/assets/mock/js-fundamentals.ppt',
      topicId: 2,
      uploader: { id: 2, name: 'John Doe' },
      uploadDate: '2023-12-10T09:45:00',
      likes: 32
    },
    {
      id: 4,
      title: 'Building RESTful APIs',
      description: 'How to design and implement REST APIs',
      fileType: 'pdf',
      fileUrl: '/assets/mock/restful-apis.pdf',
      topicId: 3,
      uploader: { id: 3, name: 'Jane Smith' },
      uploadDate: '2023-12-12T16:20:00',
      likes: 15
    }
  ];
  
  export const getAllResources = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...resources]);
      }, 500);
    });
  };
  
  export const getResourcesByTopic = (topicId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredResources = resources.filter(r => r.topicId === parseInt(topicId));
        resolve(filteredResources);
      }, 500);
    });
  };
  
  export const uploadResource = (resourceData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newResource = {
          id: resources.length + 1,
          ...resourceData,
          likes: 0,
          uploadDate: new Date().toISOString()
        };
        resources = [...resources, newResource];
        resolve(newResource);
      }, 800);
    });
  };
  
  export const likeResource = (resourceId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resources = resources.map(r => {
          if (r.id === resourceId) {
            return { ...r, likes: r.likes + 1 };
          }
          return r;
        });
        resolve(resources.find(r => r.id === resourceId));
      }, 300);
    });
  };