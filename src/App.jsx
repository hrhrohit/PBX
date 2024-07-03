import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import DomainList from './Components/DomainList';
import Navbar from './Components/NavBar/Navbar';
import LoginPage from './Components/LoginPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/domains" element={<DomainList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;