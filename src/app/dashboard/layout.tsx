import SideBar from "@/components/SideBar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <SideBar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
