import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from "../dashboard/adminSidebar.jsx";
import { Navbar } from "../dashboard/navbar.jsx";
import axios from 'axios';
import DataTable from 'react-data-table-component';

const Department = () => {
  const [user, setUser] = useState('');
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [editDepartmentData, setEditDepartmentData] = useState({ dep_name: '', dep_desc: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/login');
    }

    const usernew = localStorage.getItem("user");
    setUser(usernew || 'Guest');

    // Fetch departments from the backend
    axios.get('https://ems-backend-six.vercel.app/api/auth/get-department')
      .then((response) => {
        if (!response.data.success) {
          console.log("Error in backend fetching data");
        } else {
          setDepartments(response.data.user);
        }
      })
      .catch((error) => {
        console.error("Error in fetching departments:", error.message);
      });
  }, [navigate]);

  const handleEdit = (department) => {
    setEditDepartmentId(department._id);
    setEditDepartmentData({ dep_name: department.dep_name, dep_desc: department.dep_desc });
  };

  const handleDelete = (id) => {
    console.log("Delete department with id:", id);
    axios.delete(`https://ems-backend-six.vercel.app/api/auth/delete-department/${id}`)
      .then((response) => {
        console.log(response.data);
        if (!response.data.success) {
          return console.log("There is some error");
        }

        // Update the departments state to remove the deleted department
        setDepartments(departments.filter(department => department._id !== id));

        console.log("Department deleted successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error in delete in frontend:", error.message);
      });
  };

  const handleAddDepartment = () => {
    navigate('/add-department');
  };

  const handleEditChange = (e) => {
    setEditDepartmentData({
      ...editDepartmentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveEdit = () => {
    axios.put(`https://ems-backend-six.vercel.app/api/auth/edit-department/${editDepartmentId}`, editDepartmentData)
      .then((response) => {
        if (response.data.success) {
          setDepartments(departments.map(dep => 
            dep._id === editDepartmentId ? { ...dep, ...editDepartmentData } : dep
          ));
          setEditDepartmentId(null);
        } else {
          console.log("Error updating department");
        }
      })
      .catch((error) => {
        console.error("Error in updating department:", error.message);
      });
  };

  // Define columns for react-data-table-component
  const columns = [
    {
      name: 'Department Name',
      selector: (row) => row.dep_name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.dep_desc,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:underline mr-4"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    }
  ];

  // Filter departments based on search term
  const filteredDepartments = departments.filter(department =>
    department.dep_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.dep_desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="p-6">
          <h2 className="text-xl mt-4">Department Overview</h2>
          
          {/* Search and Add New Department Button */}
          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 ml-[20%]"
            />
            <button
              onClick={handleAddDepartment}
              className="bg-gray-800 text-white px-4 py-2 rounded ml-[20%]"
            >
              Add New Department
            </button>
          </div>

          {/* Edit Form */}
          {editDepartmentId && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-100">
              <h3 className="ml-[50%] mb-[4%]">Edit Department</h3>
              <input
                type="text"
                name="dep_name"
                value={editDepartmentData.dep_name}
                onChange={handleEditChange}
                className="border rounded px-3 py-2 mb-2 w-full ml-[20%]"
                placeholder="Department Name"
              />
              <textarea
                name="dep_desc"
                value={editDepartmentData.dep_desc}
                onChange={handleEditChange}
                className="border rounded px-3 py-2 mb-2 w-full ml-[20%]"
                placeholder="Description"
              />
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-[20%]"
              >
                Save
              </button>
            </div>
          )}

          {/* React Data Table */}
          <div className="mt-6 p-4 rounded-lg ml-[20%] bg-blue-100">
            <DataTable
              title="Departments List"
              columns={columns}
              data={filteredDepartments} // Use filtered departments
              pagination
              highlightOnHover
              striped
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
