import { Link, NavLink } from "react-router-dom";
import React from "react";
import { HomeIcon, ShoppingBagIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed shadow-xl">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-700">
        <Link to="/">
          <h2 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
            <span className="text-blue-400">Admin</span> Dashboard
          </h2>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <ShoppingBagIcon className="w-5 h-5" />
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <DocumentTextIcon className="w-5 h-5" />
          Orders
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <HomeIcon className="w-5 h-5" />
          Home
        </NavLink>
      </nav>

      {/* Footer Section (Optional) */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2025 Admin Panel</p>
      </div>
    </div>
  );
};

export default Sidebar;