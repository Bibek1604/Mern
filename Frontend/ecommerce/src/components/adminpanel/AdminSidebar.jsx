// src/components/adminpanel/AdminSidebar.jsx
import { Link, NavLink } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-6 space-y-8 fixed">
      <Link to='/'>
        <h2 className="text-2xl font-bold">Go TO Home</h2>
      </Link>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400 font-bold" : ""}`
          }
        >
          📦 Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400 font-bold" : ""}`
          }
        >
          🧾 Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
