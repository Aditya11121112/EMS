import React, { useState, useEffect } from "react";
import { Navbar } from "../navbar.jsx";
import { useNavigate } from "react-router-dom";
import { EmployeeSidebar } from "../empcomponent/employee-sidebar.jsx";
import axios from "axios";

const EmpLeave = () => {
  const [employee, setEmployee] = useState({ id: "" }); // Employee ID only
  const [leaveName, setLeaveName] = useState("casual"); // Default leave name
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [user, setUser] = useState('Guest'); 
  const [status] = useState("pending"); // Default leave status

  const navigate = useNavigate();



 useEffect(() => {
 
    // Check if access token exists in localStorage
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    } else {
      const token = localStorage.getItem('access_token');
      console.log(token);

      // Verify the token via API call
      axios.post("ems-backend-six.vercel.app/api/auth/verify", {}, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((resp) => {
        const usernew = resp.data.user.name;
        setUser(usernew || 'Guest');
        //console.log(resp.data.user)
        fetchEmployee(resp.data.user.id);
      })
      .catch((error) => {
        console.log("Error in employee dashboard API", error.message);
        navigate('/login'); // Navigate to login on error or token verification failure
      });
    }
  }, [navigate]);


const fetchEmployee = (id)=>{
  //console.log("whats  the id ",id)
  axios
      .get(`ems-backend-six.vercel.app/api/auth/get-employee-byid?id=${id}`)
      .then((response) => {
       // console.log("response data",response.data)
        const empData = response.data.data; // Assuming employee details are returned
        //console.log(empData)
        setEmployee({
          id: empData._id,
        });
      })
      .catch((error) => {
        console.error("Error fetching employee data", error);
      });

}


const handleSubmit = (e) => {
  e.preventDefault();

  // Prepare the leave data to send to the backend
  const leaveData = {
    leave_name: leaveName,
    userid: employee.id,
    date_from: dateFrom,
    date_to: dateTo,
    status: status, // default to pending
  };

  axios
    .post("ems-backend-six.vercel.app/api/auth/create-leave", leaveData)
    .then((response) => {
      if(response.data.success){
        alert("Leave request submitted successfully!");
        navigate('/employee-dashboard');
      }else{
        console.log("error falile din fetch leaves ")
      }
      
    })
    .catch((error) => {
      console.error("Error submitting leave request", error);
    });
};
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Employee Sidebar */}
      <EmployeeSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar user="Employee" /> {/* Default employee placeholder */}

        {/* Main content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">Apply for Leave</h1>

          {/* Leave Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4 bg-white p-6 shadow-lg rounded-md"
          >
            {/* Leave Type Dropdown */}
            <div>
              <label
                htmlFor="leaveType"
                className="block text-sm font-medium text-gray-700"
              >
                Leave Type
              </label>
              <select
                id="leaveType"
                value={leaveName}
                onChange={(e) => setLeaveName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="maritial">Marital Leave</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <label
                htmlFor="dateFrom"
                className="block text-sm font-medium text-gray-700"
              >
                Date From
              </label>
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Date To */}
            <div>
              <label
                htmlFor="dateTo"
                className="block text-sm font-medium text-gray-700"
              >
                Date To
              </label>
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Leave Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpLeave;
