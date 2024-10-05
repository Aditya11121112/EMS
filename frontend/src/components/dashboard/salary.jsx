import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from "../dashboard/adminSidebar.jsx";
import { Navbar } from "../dashboard/navbar.jsx";
import axios from "axios";

const Salary = () => {
  const [user, setUser] = useState('');
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [basicPay, setBasicPay] = useState('');
  const [allowance, setAllowance] = useState('');
  const [deduction, setDeduction] = useState('');
  const [payDate, setPayDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/login');
    }

    const usernew = localStorage.getItem("user");
    setUser(usernew || 'Guest');

    // Fetch departments
    axios.get('https://ems-backend-six.vercel.app/api/auth/get-department')
      .then(response => {
        if (response.data.success) {
          setDepartments(response.data.user);
        }
      })
      .catch(error => console.error("Error fetching departments", error));
  }, [navigate]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    
    axios.get(`https://ems-backend-six.vercel.app/api/auth/get-employees-dept?departmentId=${e.target.value}`)
      .then(response => {
        if (response.data.success) {
          // If returning a single employee
          console.log(response.data)
          if (Array.isArray(response.data.data)) {
            setEmployees(response.data.data); // Set as an array
          } else {
            setEmployees([response.data.data]); // Wrap single employee in an array
          }
        } else { 
          setEmployees([]);
          console.log(response.data.message);
        }
      })
      .catch(error => console.error("Error fetching employees", error.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create salary data to be sent to the backend
    const salaryData = {
      employeeId: selectedEmployee,
      basicPay,
      allowance,
      deduction,
      payDate
    };
    console.log("salary data",salaryData)
    // Post request to update salary
    axios.post('https://ems-backend-six.vercel.app/api/auth/update-salary', salaryData)
      .then(response => {
        if (response.data.success) {
          console.log(response.data);
          alert("Salary updated successfully!");
          // Clear form after successful submission
          setBasicPay('');
          setAllowance('');
          setDeduction('');
          setPayDate('');
          navigate('/employee');
        } else {
          alert("Failed to update salary.");
        }
      })
      .catch(error => {
        console.error("Error updating salary:", error);
        alert("An error occurred while updating the salary.");
      });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="p-6">
          <h2 className="text-xl mt-4 ml-[25%]">Salary Overview</h2>

          <form onSubmit={handleSubmit} className="mt-4 ml-[25%] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <select 
                id="department" 
                name="department" 
                value={selectedDepartment} 
                onChange={handleDepartmentChange} 
                className="mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                {departments.map(department => (
                  <option key={department._id} value={department._id}>{department.dep_name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee</label>
              <select 
                id="employee" 
                name="employee" 
                value={selectedEmployee} 
                onChange={(e) => setSelectedEmployee(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee._id} value={employee._id}>{employee.employeeId}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="basicPay" className="block text-sm font-medium text-gray-700">Basic Pay</label>
              <input 
                type="number"
                id="basicPay" 
                value={basicPay} 
                onChange={(e) => setBasicPay(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="allowance" className="block text-sm font-medium text-gray-700">Allowance</label>
              <input 
                type="number" 
                id="allowance" 
                value={allowance} 
                onChange={(e) => setAllowance(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="deduction" className="block text-sm font-medium text-gray-700">Deduction</label>
              <input 
                type="number" 
                id="deduction" 
                value={deduction} 
                onChange={(e) => setDeduction(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="payDate" className="block text-sm font-medium text-gray-700">Pay Date</label>
              <input 
                type="date" 
                id="payDate" 
                value={payDate} 
                onChange={(e) => setPayDate(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required 
              />
            </div>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded col-span-2">Add Salary</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Salary;
