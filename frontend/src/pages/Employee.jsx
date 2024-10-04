import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { EmployeeSidebar } from "../components/dashboard/empcomponent/employee-sidebar.jsx"; // Import EmployeeSidebar
import { Navbar } from "../components/dashboard/navbar.jsx"; // Import Navbar
import axios from "axios";

const Employee = () => {
  const [user, setUser] = useState('');
  const [leaves, setLeaves] = useState([]); // State for leave data
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      return navigate('/login');
    }

    const token = localStorage.getItem('access_token');

    // Fetch user data
    axios.post("ems-backend-six.vercel.app/api/auth/verify", {}, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((resp) => {
      const usernew = resp.data.user.name;
      setUser(usernew || 'Guest');
      fetchLeaves(resp.data.user.id); // Pass the user ID to fetch leaves
      console.log("User data in employee dashboard", resp.data);
    }).catch((error) => {
      console.log("Error in employee dashboard API", error.message);
    });

  }, [navigate]);

  // Fetch leaves function with user ID as parameter
  const fetchLeaves = (userId) => {
    axios.get(`ems-backend-six.vercel.app/api/auth//leaves-employee?userId=${userId}`).then((resp) => {
      // Ensure resp.data.filteredLeaves is an array
      
      setLeaves(
        (resp.data) ? resp.data : []);
      console.log("Leave data", leaves);
    }).catch((error) => {
      console.log("Error fetching leave data", error.message);
    });
  }

  return (
    <div className="flex h-screen">
      {/* Include the EmployeeSidebar */}
      <EmployeeSidebar />
      <div className="flex-1 flex flex-col">
        {/* Include the Navbar and pass the user state */}
        <Navbar user={user} />
        <div className="p-6">
          {/* Welcome message for the user */}
          <h1 className="text-xl">Welcome, {user}</h1>

          {/* Table to display leave data */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Leave Details</h2>
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Leave Name</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date From</th>
                  <th className="px-4 py-2">Date To</th>
                </tr>
              </thead>
              <tbody>
                {leaves && leaves.length > 0 ? (
                  leaves.map((leave, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{leave.leave_name}</td>
                      <td className="border px-4 py-2">{leave.status}</td>
                      <td className="border px-4 py-2">{new Date(leave.date_from).toLocaleDateString()}</td>
                      <td className="border px-4 py-2">{new Date(leave.date_to).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border px-4 py-2 text-center">
                      No leaves available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Employee };
