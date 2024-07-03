import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const buttons = [
    { name: 'Prime', color: 'bg-green-500 hover:bg-green-600', onClick: () => navigate('/domains') },
    { name: 'Call Waveform', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Hodusoft', color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Resellers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`${button.color} text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={button.onClick}
          >
            {button.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;