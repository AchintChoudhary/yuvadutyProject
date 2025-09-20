// FILE: frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ReportIssuePage from './pages/ReportIssuePage.jsx';
import CommunityFeedPage from './pages/CommunityFeedPage.jsx';
import SupportChatPage from './pages/SupportChatPage.jsx';
import OrganizationDashboard from './pages/OrganizationDashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import Login from './components/LoginPage.jsx';
import Signup from './components/SignUpPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (    
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={
            <ProtectedRoute>
              <ReportIssuePage />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <CommunityFeedPage />
            </ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute>
              <SupportChatPage />
            </ProtectedRoute>
          } />
          <Route path="/organization" element={<OrganizationDashboard />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;