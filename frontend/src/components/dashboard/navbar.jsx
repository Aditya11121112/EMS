import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-full bg-gray-800 text-white flex justify-between items-center p-4 shadow-md">
      {user && (
        <div className="text-xl font-bold ml-[21%]">Welcome, {user}</div>
      )}
      <button 
        onClick={handleLogout} 
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export { Navbar };
