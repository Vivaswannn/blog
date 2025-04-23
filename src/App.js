import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import TopicsList from './components/topics/TopicList';
import TopicDetail from './components/topics/TopicDetail';
import ResourceUpload from './components/resources/ResourceUpload';

// Contexts
import { AuthContext } from './contexts/AuthContext';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!user || !user.isFacilitator) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TopicsList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/topics/:topicId" element={<TopicDetail />} />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <ResourceUpload />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;