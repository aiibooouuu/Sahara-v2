import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import EmployerPage from './pages/EmployerPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import JobApplicationsPage from './pages/JobApplicationsPage';
import ProfilePage from './pages/ProfilePage';
import Applications from './pages/Applications';
import ViewApplications from './pages/ViewApplications';
import LoginPage  from './pages/LoginPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/employer" element={<EmployerPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/applications" element={<JobApplicationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/jobsapplications" element={<Applications />} />
        <Route path="/viewapplications" element={<ViewApplications />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
