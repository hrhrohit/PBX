import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    const path = location.pathname;
    
    if (path === '/landing') {
      navigate('/');
    } else if (path === '/domains') {
      navigate('/landing');
    } else if (path.startsWith('/domains/')) {
      navigate('/domains');
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