import React from "react";
import { Navbar } from "../navbar.jsx"; // Import the Navbar component
import { EmployeeSidebar } from "../empcomponent/employee-sidebar.jsx"; // Import the EmployeeSidebar component

const EmpSetting = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Employee Sidebar */}
      <EmployeeSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar user="Employee Name" /> {/* Display default employee name */}
        
        {/* Main content can be added here */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">Employee Profile</h1>
          {/* Add more content here as needed */}
        </div>
      </div>
    </div>
  );
};

export default EmpSetting;
