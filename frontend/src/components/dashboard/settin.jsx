import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AdminSidebar } from "../dashboard/adminSidebar.jsx";
import { Navbar } from "../dashboard/navbar.jsx";


const Setting = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/login');
    }

    const usernew = localStorage.getItem("user");
    setUser(usernew || 'Guest');

    // Fetch the values from backend or set static values here
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="p-6">
        <h2 className="text-xl mt-4 ml-[25%]">Setting overview</h2>
        </div>
      </div>
    </div>
  );
};

export default Setting ;
