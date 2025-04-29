import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
  error: null
});

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for saved user and token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        if (savedUser && token && tokenExpiry) {
          // Check if token is expired
          if (new Date().getTime() > parseInt(tokenExpiry)) {
            logout();
            return;
          }
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        setError('Failed to restore session');
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function with token management
  const login = async (userData, token) => {
    try {
      // Set token expiry to 24 hours from now
      const tokenExpiry = new Date().getTime() + 24 * 60 * 60 * 1000;
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiry', tokenExpiry.toString());
      
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('Failed to save session');
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      setError(null);
    } catch (err) {
      setError('Failed to clear session');
    }
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    isLoading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;