import React from 'react';
import { FaTachometerAlt, FaUser, FaCalendarCheck, FaMoneyBill, FaBuilding, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0">
      <div className="p-6 text-center text-xl font-bold border-b border-gray-700">Admin Panel</div>
      <nav className="mt-10">
        <ul className="space-y-4">
          <li>
            <Link to="/admin-dashboard" className="flex items-center p-3 hover:bg-gray-700">
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/employee" className="flex items-center p-3 hover:bg-gray-700">
              <FaUser className="mr-3" />
              Employee
            </Link>
          </li>
          <li>
            <Link to="/department" className="flex items-center p-3 hover:bg-gray-700">
              <FaBuilding className="mr-3" />
              Department
            </Link>
          </li>
          <li>
            <Link to="/leaves" className="flex items-center p-3 hover:bg-gray-700">
              <FaCalendarCheck className="mr-3" />
              Leaves
            </Link>
          </li>
          <li>
            <Link to="/salary" className="flex items-center p-3 hover:bg-gray-700">
              <FaMoneyBill className="mr-3" />
              Salary
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center p-3 hover:bg-gray-700">
              <FaCog className="mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { AdminSidebar };
