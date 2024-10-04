import React from 'react';
import { FaBuilding } from 'react-icons/fa';

const TotalDepartments = ({ count }) => {
  return (
    <div className="bg-white p-4 shadow rounded flex items-center">
      <FaBuilding className="text-green-500 text-3xl mr-2" /> {/* Color green */}
      <div>
        <h3 className="text-xl">Total Departments</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default TotalDepartments;
