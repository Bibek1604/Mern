import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import useAdminlogin from "../../store/adminlogin";

const AdminSidebar = () => {
  const { logoutAdmin } = useAdminlogin();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const navItems = [
    { name: "Dashboard", to: "/admin/dashboard", icon: HomeIcon },
    { name: "Products", to: "/admin/products", icon: ShoppingBagIcon },
    { name: "Orders", to: "/admin/orders", icon: DocumentTextIcon },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <aside className="w-56 bg-[#0f172a] text-white min-h-screen flex flex-col justify-between fixed z-50 shadow-md">
        {/* Logo */}
        <div className="p-5 border-b border-gray-800">
          <h1 className="text-xl font-bold">
            <span className="text-blue-500">Ghar</span> Sansar
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2">
          {navItems.map(({ name, to, icon: Icon }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-red-400 hover:bg-red-600 hover:text-white transition"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
