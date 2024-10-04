import React from 'react';
import { FaMoneyBill } from 'react-icons/fa'; // Import the money bill icon

const MonthlyOverview = ({ count }) => {
  return (
    <div className="bg-white p-4 shadow rounded flex items-center">
      <FaMoneyBill className="text-green-500 text-3xl mr-2" /> {/* Green color for money */}
      <div>
        <h3 className="text-xl">Monthly Salary</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default MonthlyOverview;
