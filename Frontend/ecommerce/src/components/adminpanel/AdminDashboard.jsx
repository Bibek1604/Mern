// src/pages/AdminDashboard.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../adminpanel/AdminSidebar";
import AdminProduct from "../adminpanel/Adminproduct";
import AdminOrders from "../adminpanel/AdminOrders";
import React from "react";
import Footer from "../Home/Footer";
import Header from "../Home/Header";

const AdminDashboard = () => {
  return (
    <><Header /><div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 bg-gray-100 p-6">
              <Routes>
                  <Route path="products" element={<AdminProduct />} />
                  <Route path="orders" element={<AdminOrders />} />
              </Routes>
          </div>
      </div><Footer /></>
  );
};

export default AdminDashboard;
