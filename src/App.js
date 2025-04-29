import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import TopicsList from './components/topics/TopicList.js';
import TopicDetail from './components/topics/TopicDetail';
import TopicForm from './components/topics/TopicForm';
import ResourceUpload from './components/resources/ResourceUpload';
import ScrollToTop from './components/common/ScrollToTop';
import Dashboard from './components/dashboard/Dashboard';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import FAQ from './components/pages/FAQ';
import Terms from './components/pages/Terms';
import PlaceholderPage from './components/pages/PlaceholderPage';

// Contexts
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { useContext } from 'react';

// Protected route component
const ProtectedRoute = ({ children, requiredRole = 'facilitator' }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'facilitator' && !user.isFacilitator) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <Router>
        <ScrollToTop />
          <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TopicsList />} />
              <Route path="/login" element={<Login />} />
                <Route path="/topics/:topicId" element={<TopicDetail />} />
                <Route path="/upload" element={
                  <ProtectedRoute>
                    <ResourceUpload />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;