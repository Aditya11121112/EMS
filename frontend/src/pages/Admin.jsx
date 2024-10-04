import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from "../components/dashboard/adminSidebar.jsx";
import { Navbar } from "../components/dashboard/navbar.jsx";
import TotalEmployees from "../components/dashboard/TotalEmployees.jsx";
import TotalDepartments from "../components/dashboard/TotalDepartments.jsx";
import MonthlyOverview from "../components/dashboard/MonthlyOverview.jsx";
import LeavesApplied from "../components/dashboard/LeavesApplied.jsx";
import LeavesApproved from "../components/dashboard/LeavesApproved.jsx";
import LeavesPending from "../components/dashboard/LeavesPending.jsx";
import LeavesRejected from "../components/dashboard/LeavesRejected.jsx";

const Admin = () => {
  const [user, setUser] = useState('');
  const [totalEmployees, setTotalEmployees] = useState(100);
  const [totalDepartments, setTotalDepartments] = useState(10);
  const [monthlyOverview, setMonthlyOverview] = useState(5);
  const [leavesApplied, setLeavesApplied] = useState(20);
  const [leavesApproved, setLeavesApproved] = useState(15);
  const [leavesPending, setLeavesPending] = useState(3);
  const [leavesRejected, setLeavesRejected] = useState(2);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate('/login');
    }

    const usernew = localStorage.getItem("user");
    setUser(usernew || 'Guest');

    // Fetch the values from backend or set static values here
    setTotalEmployees(100); 
    setTotalDepartments(10);
    setMonthlyOverview(5);
    setLeavesApplied(20);
    setLeavesApproved(15);
    setLeavesPending(3);
    setLeavesRejected(2);
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="p-6">
          <h2 className="text-xl mt-4 ml-[25%]">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ml-[20%]">
            <TotalEmployees count={totalEmployees} />
            <TotalDepartments count={totalDepartments} />
            <MonthlyOverview count={monthlyOverview} />
            <LeavesApplied count={leavesApplied} />
            <LeavesApproved count={leavesApproved} />
            <LeavesPending count={leavesPending} />
            <LeavesRejected count={leavesRejected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Admin };
