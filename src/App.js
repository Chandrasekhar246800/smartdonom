import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Donor from './components/Donor';
import NGO from './components/ngo';
import Admin from './components/BooksDashboard';
import PublicDonor from './components/PublicDonor';
import OrganizationDonor from './components/OrganizationDonor';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import NGOSignup from './components/NGOSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/ngo" element={<NGO />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/donor/public" element={<PublicDonor />} />
        <Route path="/donor/organization" element={<OrganizationDonor />} />
        <Route path="/donor/public/forgot-password" element={<ForgotPassword userType="public" />} />
        <Route path="/donor/organization/forgot-password" element={<ForgotPassword userType="organization" />} />
        <Route path="/ngo/forgot-password" element={<ForgotPassword userType="ngo" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ngo/signup" element={<NGOSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
