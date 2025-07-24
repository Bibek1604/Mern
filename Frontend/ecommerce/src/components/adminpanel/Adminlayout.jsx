// AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Sidebar from "../adminpanel/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 bg-gray-100 p-6 min-h-screen overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default AdminLayout;