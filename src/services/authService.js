// Mock user data - in a real app, this would be connected to a backend API
const users = [
    { id: 1, username: 'admin', password: 'admin123', name: 'Admin User', isFacilitator: true },
    { id: 2, username: 'facilitator1', password: 'pass123', name: 'John Doe', isFacilitator: true },
    { id: 3, username: 'facilitator2', password: 'pass123', name: 'Jane Smith', isFacilitator: true },
    { id: 4, username: 'student1', password: 'student123', name: 'Alex Johnson', isFacilitator: false }
  ];
  
  export const authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          // Don't send the password to the client
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 500);
    });
  };
  
  export const checkAuthStatus = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  };