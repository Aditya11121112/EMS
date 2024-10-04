import React from 'react';
import { FaUsers } from 'react-icons/fa';

const TotalEmployees = ({ count }) => {
  return (
    <div className="bg-white p-4 shadow rounded flex items-center">
      <FaUsers className="text-blue-500 text-3xl mr-2" /> {/* Color blue */}
      <div>
        <h3 className="text-xl">Total Employees</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default TotalEmployees;
