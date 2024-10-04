import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from "../dashboard/adminSidebar.jsx";
import { Navbar } from "../dashboard/navbar.jsx";
import axios from 'axios';

const Emp_part_leave = () => {
  const [user, setUser] = useState('');
  const [leaves, setLeaves] = useState([]); // State to store leave data
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the leave being edited
  const [newStatus, setNewStatus] = useState(''); // Store the new status being edited
  const navigate = useNavigate();
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const empid = querySearch.get("empid");

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/login');
    }

    const usernew = localStorage.getItem("user");
    setUser(usernew || 'Guest');
    
    leaves_data(empid); // Fetch leave data
  }, [empid, navigate]);

  const leaves_data = (id) => {
    axios.get(`http://localhost:4000/api/auth/leaves?userId=${id}`)
      .then((resp) => {
        if (!resp) {
          console.log('No response from the API.');
          return;
        }
        setLeaves(resp.data); // Store the fetched leave data in state
      })
      .catch((err) => {
        console.log("Error fetching leave data:", err.message);
      });
  }

  // Handle status field edit
  const handleEditStatus = (index) => {
    setEditingIndex(index); // Set the index of the leave being edited
    setNewStatus(leaves[index].status); // Set the current status in the input field
  }

  // Handle saving the updated status
  const handleSaveStatus = (leaveId) => {
    axios.put(`http://localhost:4000/api/auth/updateLeaveStatus/${leaveId}`, {
  
      status: newStatus,
    })
    .then((response) => {
      console.log('Status updated successfully', response.data.user);
      // Update the status in the local state
      const updatedLeaves = [...leaves];
      updatedLeaves[editingIndex].status = newStatus;
      setLeaves(updatedLeaves);
      setEditingIndex(null); // Exit edit mode
    })
    .catch((err) => {
      console.log("Error updating status:", err.message);
    });
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="p-6">
          <h2 className="text-xl mt-4 ml-[25%]">Particular Leave Overview</h2>

          {/* Render leave data in a table */}
          <div className="mt-6 ml-[25%] overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4">Leave Name</th>
                  <th className="py-2 px-4">Date From</th>
                  <th className="py-2 px-4">Date To</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.length > 0 ? (
                  leaves.map((leave, index) => (
                    <tr key={index} className="text-center">
                      <td className="border px-4 py-2">{leave.leave_name || 'N/A'}</td>
                      <td className="border px-4 py-2">{new Date(leave.date_from).toLocaleDateString() || 'N/A'}</td>
                      <td className="border px-4 py-2">{new Date(leave.date_to).toLocaleDateString() || 'N/A'}</td>
                      
                      {/* Editable status field */}
                      <td className="border px-4 py-2">
                        {editingIndex === index ? (
                          <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="border px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        ) : (
                          leave.status || 'N/A'
                        )}
                      </td>

                      {/* Edit/Save button */}
                      <td className="border px-4 py-2">
                        {editingIndex === index ? (
                          <button
                            onClick={() => handleSaveStatus(leave._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditStatus(index)}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No leave data available.</td>
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

export default Emp_part_leave;
