import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from "../dashboard/adminSidebar.jsx";
import { Navbar } from "../dashboard/navbar.jsx";
import axios from 'axios';

const ADD_DEP = () => {
  const [user, setUser] = useState('');
  const [depName, setDepName] = useState('');
  const [depDesc, setDepDesc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/login');
    }

    const usernew = localStorage.getItem("user");
    setUser(usernew || 'Guest');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/add-department', {
        dep_name: depName,
        dep_desc: depDesc
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
     
      if (response.data.success) {
        alert('Department added successfully!');
        console.log("department created ",response.data)
        setDepName('');
        setDepDesc('');
        navigate('/login')
      }
    } catch (error) {
      console.error('Error adding department:', error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="p-6">
          {/* <h2 className="text-xl mt-4 ml-[25%]">Add-Department OVERVIEW</h2> */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
            <div >
              <label className="block text-sm font-medium text-gray-700">Department Name</label>
              <input
                type="text"
                value={depName}
                onChange={(e) => setDepName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter department name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={depDesc}
                onChange={(e) => setDepDesc(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter department description"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Department
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ADD_DEP;
