import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landing';
import StudentDashboard from './components/studentdashboard';
import Joblisting from './components/joblistings';
import StudentApplications from './components/studentapplications';
import StudentProfile from './components/studentprofile';
import JobDetails from './components/singlejobdetails';
import CompanyDashboard from './components/companydashboard';
import CompanyProfile from './components/companyprofile';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/studentdashboard" element={<StudentDashboard/>} />
      <Route path="/joblisting" element={<Joblisting/>} />
      <Route path="/studentapplications" element={<StudentApplications/>} />
      <Route path="/studentprofile" element={<StudentProfile/>} />
      <Route path="/job/:id" element={<JobDetails/>} />
      <Route path="/companydashboard" element={<CompanyDashboard/>} />
      <Route path="/companyprofile" element={<CompanyProfile/>} />



    </Routes>
    </BrowserRouter>
  );
}

export default App;
