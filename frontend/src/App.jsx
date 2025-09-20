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
function App() {
  return (    
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/community" element={<CommunityFeedPage />} />
          <Route path="/support" element={<SupportChatPage />} />
          <Route path="/organization" element={<OrganizationDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path='/login' element={<Login/>}
/>
<Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;