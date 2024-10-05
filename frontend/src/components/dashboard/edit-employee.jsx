import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AdminSidebar } from "../dashboard/adminSidebar.jsx";
import { Navbar } from "../dashboard/navbar.jsx";
import axios from "axios";

const Edit_Employee = () => {
  const { employeeId } = useParams(); // Get employee ID from the route
  const [user, setUser] = useState('');
  const [formData, setFormData] = useState({
    salary: "",
    dob: "",
    maritalStatus: "",
    departmentId: ""
  });
  const [departments, setDepartments] = useState([]);
  const [initialDepartmentName, setInitialDepartmentName] = useState(''); // To store initial department name
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/login');
    }
  
    const usernew = localStorage.getItem("user");
    setUser(usernew || 'Guest');
  
    // Fetch the employee data from backend and populate the form
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`https://ems-backend-six.vercel.app/api/auth/get-employee-id/${employeeId}`);
        const employeeData = response.data.employee;
        
        // Set the form data with fetched employee info
        setFormData({
          salary: employeeData.salary,
          dob: employeeData.dob.split('T')[0], // Remove the time part from dob
          maritalStatus: employeeData.maritalStatus,
          departmentId: employeeData.departmentId._id // Use department's _id here
        });

        // Set initial department name for display in dropdown
        setInitialDepartmentName(employeeData.departmentId.dep_name);
  
        // Fetch departments to display in the department dropdown
        const departmentResponse = await axios.get("ems-backend-six.vercel.app/api/auth/get-department");
        setDepartments(departmentResponse.data.user);
  
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };
  
    fetchEmployeeData();
  }, [navigate, employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ems-backend-six.vercel.app/api/auth/update-employee/${employeeId}`, formData);

      if (response.data.success) {
        alert("Employee updated successfully!");
        navigate("/employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="p-6">
          <h2 className="text-xl mt-4 ml-[25%]">Edit Employee</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">

            <div>
              <label className="block text-sm font-medium text-gray-700">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter salary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border
                border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="departmentId"
                value={formData.departmentId} // This will be the _id of the department
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                {/* Show initial department name as the first option */}
                <option value={formData.departmentId}>{initialDepartmentName || "Select Department"}</option>
                
                {/* Map through departments and show them in the dropdown */}
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.dep_name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit_Employee;
