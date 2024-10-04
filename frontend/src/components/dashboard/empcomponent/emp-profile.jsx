import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar.jsx"; // Import the Navbar component
import { EmployeeSidebar } from "../empcomponent/employee-sidebar.jsx"; // Import the EmployeeSidebar component
import axios from "axios"; // Make sure axios is installed

const EmpProfile = () => {
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        // Handle redirection to login if token is not present
        return navigate("/login");
      }

      try {
        const response = await axios.post(
          "ems-backend-six.vercel.app/api/auth/employee-details",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setEmployeeDetails(response.data.data); // Assume the response contains employee details
      } catch (error) {
        console.error("Error fetching employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Employee Sidebar */}
      <EmployeeSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar user={employeeDetails.name || "Employee Name"} /> {/* Display employee name */}

        <div className="p-6">
          {/* Profile Content */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Profile</h1>
          <div className="flex flex-col lg:flex-row  bg-white-800 shadow-md rounded-lg p-8">
            {/* Left Side - Employee Image */}
            <div className="w-full lg:w-1/3 flex justify-center mb-8 mt-4% lg:mb-0">
              {employeeDetails.image ? (
                <img
                  src={`ems-backend-six.vercel.app/uploads/${employeeDetails.image}`}
                  alt="Employee"
                  className="w-48 h-48 rounded-full border-4 border-gray-200 shadow-lg"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-gray-300 text-white-600 rounded-full">
                  No Image
                </div>
              )}
            </div>

            {/* Right Side - Employee Details */}
            <div className="w-full lg:w-2/3 lg:pl-8">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-bold text-gray-700">Department:</td>
                    <td className="py-2 text-gray-600">{employeeDetails.departmentId.dep_name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold text-gray-700">Email:</td>
                    <td className="py-2 text-gray-600">{employeeDetails.email}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold text-gray-700">Salary:</td>
                    <td className="py-2 text-gray-600">{employeeDetails.salary}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold text-gray-700">Designation:</td>
                    <td className="py-2 text-gray-600">{employeeDetails.designation}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold text-gray-700">Role:</td>
                    <td className="py-2 text-gray-600">{employeeDetails.role}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold text-gray-700">Gender:</td>
                    <td className="py-2 text-gray-600">{employeeDetails.gender}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-bold text-gray-700">Marital Status:</td>
                    <td className="py-2 text-gray-600">{employeeDetails.maritalStatus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpProfile;
