import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar.jsx"; // Import the Navbar component
import { EmployeeSidebar } from "../empcomponent/employee-sidebar.jsx"; // Import the EmployeeSidebar component
import axios from "axios";

const EmpSalary = () => {
  const [user, setUser] = useState('Guest'); // Initialize user state
  const navigate = useNavigate(); // useNavigate must be called inside the component
  const [salaryDetails, setSalaryDetails] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Check if access token exists in localStorage
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    } else {
      const token = localStorage.getItem('access_token');
      console.log(token);

      // Verify the token via API call
      axios.post("ems-backend-six.vercel.app/api/auth/leave", {}, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((resp) => {
        const usernew = resp.data.user.name;
        setUser(usernew || 'Guest');
        
      //  fetchSalaryDetails(resp.data.user.id)
        axios.get(`ems-backend-six.vercel.app/api/auth/get-employee-byuserid?id=${resp.data.user.id}`).then(
            (resp)=>{ 
             // console.log("somthing",resp.data.data)
              // console.log("response in employee",resp.data.data._id);
               fetchSalaryDetails(resp.data.data._id);

            }
        ).catch((err)=>{
             console.log("error in emp salary in emp dashblard",err.message)
        });


        console.log("Response in employee dashboard", resp.data);
      })
      .catch((error) => {
        console.log("Error in employee dashboard API", error.message);
        navigate('/login'); // Navigate to login on error or token verification failure
      });
    }
  }, [navigate]); // Add navigate as a dependency


  const fetchSalaryDetails = (id) => {
    console.log("id",id)
    axios.get(`ems-backend-six.vercel.app/api/auth/get-salary-details?employeeId=${id}`)
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
    <div className="flex h-screen bg-gray-100">
      {/* Employee Sidebar */}
      <EmployeeSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar user={user} /> {/* Display fetched employee name */}
        
        {/* Main content */}
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
                          src={`ems-backend-six.vercel.app/${salary.employeeId.image}`}
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

export default EmpSalary;
