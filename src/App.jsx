import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import LoginPage from './Components/LoginPage';
import LandingPage from './Components/LandingPage';
import DomainList from './Components/DomainList';
import DomainDetails from './Components/DomainDetails';
import AddRuleForm from './Components/Forms/AddRuleForm';
import EditRuleForm from './Components/Forms/EditRuleForm';

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
            <Route path="/domains/domainDetails" element={<DomainDetails />} />
            <Route path="/domains/add-rule" element={<AddRuleForm />} />
            <Route path="/domains/editrule" element={<EditRuleForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
