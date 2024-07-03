import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (location.pathname === '/domains') {
      navigate('/landing');
    } else {
      navigate(-1);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/landing" className="text-xl font-bold">Reseller App</Link>
        {location.pathname !== '/' && (
          <button 
            onClick={handleBack}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;