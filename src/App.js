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
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || !user.isFacilitator) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Main routes */}
              <Route path="/" element={<TopicsList />} />
              <Route path="/login" element={<Login />} />
              
              {/* Topic routes - Order matters! More specific routes must come first */}
              <Route 
                path="/topics/new" 
                element={
                  <ProtectedRoute>
                    <TopicForm onCancel={() => Navigate('/')} />
                  </ProtectedRoute>
                } 
              />
              <Route path="/topics/:topicId" element={<TopicDetail />} />
              <Route path="/topics" element={<TopicsList />} />
              
              {/* Facilitator routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <ResourceUpload />
                  </ProtectedRoute>
                } 
              />
              
              {/* Resource categories */}
              <Route 
                path="/categories" 
                element={
                  <PlaceholderPage 
                    title="Resource Categories" 
                    description="Browse educational resources by category. Filter by subject, grade level, and resource type." 
                  />
                } 
              />
              <Route 
                path="/featured" 
                element={
                  <PlaceholderPage 
                    title="Featured Resources" 
                    description="Explore our handpicked collection of top-quality educational resources." 
                  />
                } 
              />
              <Route 
                path="/latest" 
                element={
                  <PlaceholderPage 
                    title="Latest Uploads" 
                    description="See the most recently added educational resources from our community of educators." 
                  />
                } 
              />
              
              {/* About pages */}
              <Route path="/about" element={<About />} />
              <Route path="/about/team" element={<About section="team" />} />
              <Route path="/about/mission" element={<About section="mission" />} />
              <Route path="/about/story" element={<About section="story" />} />
              
              {/* Support pages */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<FAQ />} />
              <Route path="/feedback" element={<Contact />} />
              
              {/* Legal pages */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Terms />} />
              <Route path="/copyright" element={<Terms />} />
              <Route path="/accessibility" element={<Terms />} />
              
              {/* Career page */}
              <Route path="/careers" element={<About section="careers" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;