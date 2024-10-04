import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminSidebar } from "../dashboard/adminSidebar";
import { Navbar } from "../dashboard/navbar.jsx";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({ show: false, employeeId: null });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/auth/get-employees')
      .then(response => {
        if (response.data.success) {
          setEmployees(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching employees", error));
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);

    // Call backend API to search employees
    axios.get(`http://localhost:4000/api/auth/search-employees?query=${e.target.value}`)
      .then(response => {
        if (response.data.success) {
          setEmployees(response.data.data);
        }
      })
      .catch(error => console.error("Error searching employees", error));
  };

  const handleEdit = (employeeId) => {
    navigate(`/employee/edit/${employeeId}`);
  };

  const handleDeleteConfirmation = (employeeId) => {
    setConfirmDelete({ show: true, employeeId });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/auth/delete-employee/${confirmDelete.employeeId}`);
      if (response.data.success) {
        // Remove the deleted employee from the state
        setEmployees(employees.filter(emp => emp._id !== confirmDelete.employeeId));
        setConfirmDelete({ show: false, employeeId: null }); // Close the confirmation dialog
      } else {
        alert("Failed to delete employee.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      alert("An error occurred while deleting the employee.");
    }
  };

  const handleSalary = (employeeId) => {
    navigate(`/employee/salary/${employeeId}`);
  };

  const handleLeaves = (employeeId) => {
    navigate(`/employee/leaves/${employeeId}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col ">
        {/* Navbar */}
        <Navbar />

        {/* Employee Management Section */}
        <div className="p-6 ml-[20%]">
          <h2 className="text-xl">Employee Management</h2>

          {/* Search by text input */}
          <div className="mt-4">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Employee</label>
            <textarea
              id="search"
              name="search"
              value={searchText}
              onChange={handleSearch}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              rows="2"
              placeholder="Type employee name or other details..."
            />
          </div>

          {/* Add Employee Button */}
          <div className="mt-6">
            <Link to="/add-employee" className="bg-green-500 text-white px-4 py-2 rounded mr-4">Add Employee</Link>
          </div>

          {/* Employee Table */}
          <div className="mt-6">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border border-gray-200 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                  <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">S.No</th>
                  <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">Image</th>
                  <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">Name</th>
                  <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">DOB</th>
                  <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">Department</th>
                  <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-left block md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {employees.map((employee, index) => (
                  <tr key={employee._id} className="bg-white border border-gray-200 md:border-none block md:table-row">
                    {/* S.No */}
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{index + 1}</td>

                    {/* Image */}
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                      {employee.image ? (
                        <img src={`http://localhost:4000/uploads/${employee.image}`} alt={employee.employeeId} className="w-12 h-12 rounded-full" />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    {/* Name */}
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{employee.employeeId}</td>

                    {/* DOB */}
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{new Date(employee.dob).toLocaleDateString()}</td>

                    {/* Department */}
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{employee.departmentId?.dep_name || 'N/A'}</td>

                    {/* Actions */}
                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                      <button onClick={() => handleEdit(employee._id)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                      <button onClick={() => handleDeleteConfirmation(employee._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                      <button onClick={() => handleSalary(employee._id)} className="bg-green-500 text-white px-2 py-1 rounded ml-2">Salary</button>
                      <button onClick={() => handleLeaves(employee._id)} className="bg-yellow-500 text-white px-2 py-1 rounded ml-2">Leaves</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Confirmation Dialog */}
          {confirmDelete.show && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-lg font-bold">Confirm Deletion</h3>
                <p>Are you sure you want to delete this employee?</p>
                <div className="mt-4">
                  <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes, Delete</button>
                  <button onClick={() => setConfirmDelete({ show: false, employeeId: null })} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
