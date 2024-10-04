import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCogs, FaMoneyBill, FaLeaf } from "react-icons/fa"; // Import icons from react-icons

const EmployeeSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <h2 className="text-xl font-semibold text-center p-4 border-b border-gray-700">Employee Panel</h2> {/* Panel Title */}
      <nav className="p-4">
        <ul>
          <li className="mb-6 flex items-center">
            <FaUser className="mr-4 text-lg" /> {/* Increased margin and icon size */}
            <Link to="/emp-profile" className="hover:text-gray-300">Profile</Link>
          </li>
          <li className="mb-6 flex items-center">
            <FaCogs className="mr-4 text-lg" /> {/* Increased margin and icon size */}
            <Link to="/emp-setting" className="hover:text-gray-300">Setting</Link>
          </li>
          <li className="mb-6 flex items-center">
            <FaLeaf className="mr-4 text-lg" /> {/* Increased margin and icon size */}
            <Link to="/emp-leaves" className="hover:text-gray-300">Leaves</Link>
          </li>
          <li className="mb-6 flex items-center">
            <FaMoneyBill className="mr-4 text-lg" /> {/* Increased margin and icon size */}
            <Link to="/emp-salary" className="hover:text-gray-300">Salary</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { EmployeeSidebar };
