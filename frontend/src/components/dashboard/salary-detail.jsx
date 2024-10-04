import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AdminSidebar } from "../dashboard/adminSidebar.jsx";
import { Navbar } from "../dashboard/navbar.jsx";
import axios from "axios";

const Salary_Detail = () => {
  const [user, setUser] = useState('');
  const [salaryDetails, setSalaryDetails] = useState([]); // Initialize as an empty array
  const { employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/login');
    }

    const usernew = localStorage.getItem("user");
    setUser(usernew || 'Guest');

    if (employeeId) {
      fetchSalaryDetails(employeeId);
    }
  }, [navigate, employeeId]);

  const fetchSalaryDetails = (id) => {
    axios.get(`http://localhost:4000/api/auth/get-salary-details?employeeId=${id}`)
      .then(response => {
        if (response.data.success) {
          console.log("Salary details response:", response.data.salary);
          setSalaryDetails(response.data.salary); // Set the salary details as an array
        } else {
          console.error("Failed to fetch salary details");
        }
      })
      .catch(error => console.error("Error fetching salary details:", error));
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="p-6">
          <h2 className="text-xl mt-4 ml-[25%]">Salary Details Overview</h2>

          {/* Table to display salary details in column-wise format */}
          {salaryDetails.length > 0 ? ( // Check if salaryDetails has any records
            <table className="table-auto mt-6 ml-[25%] border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">S.No</th>
                  <th className="border border-gray-300 p-2">Profile Image</th>
                  <th className="border border-gray-300 p-2">Employee Name</th>
                  <th className="border border-gray-300 p-2">Basic Pay</th>
                  <th className="border border-gray-300 p-2">Allowance</th>
                  <th className="border border-gray-300 p-2">Deduction</th>
                  <th className="border border-gray-300 p-2">Total Pay</th>
                  <th className="border border-gray-300 p-2">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {salaryDetails.map((salary, index) => (
                  <tr key={salary._id}> {/* Use unique identifier from the response */}
                    <td className="border border-gray-300 p-2">{index + 1}</td> {/* S.No */}
                    <td className="border border-gray-300 p-2">
                      {salary.employeeId?.image ? (
                        <img
                          src={`http://localhost:4000/uploads/${salary.employeeId.image}`}
                          alt={salary.employeeId.employeeId}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        'N/A'
                      )}
                    </td> {/* Profile Image */}
                    <td className="border border-gray-300 p-2">
                      {salary.employeeId?.userId?.name || 'N/A'}
                    </td> {/* Employee Name */}
                    <td className="border border-gray-300 p-2">
                      {salary.basicPay || 'N/A'}
                    </td> {/* Basic Pay */}
                    <td className="border border-gray-300 p-2">
                      {salary.allowance || 'N/A'}
                    </td> {/* Allowance */}
                    <td className="border border-gray-300 p-2">
                      {salary.deduction || 'N/A'}
                    </td> {/* Deduction */}
                    <td className="border border-gray-300 p-2">
                      {salary.basicPay && salary.allowance && salary.deduction
                        ? (parseFloat(salary.basicPay) + parseFloat(salary.allowance) - parseFloat(salary.deduction)).toFixed(2)
                        : 'N/A'}
                    </td> {/* Total Pay */}
                    <td className="border border-gray-300 p-2">
                      {salary.payDate || 'N/A'}
                    </td> {/* Pay Date */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="ml-[25%] mt-4">No salary details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Salary_Detail;
