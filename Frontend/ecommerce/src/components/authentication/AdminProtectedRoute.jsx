import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAdminlogin from "../../store/adminlogin";

const AdminProtectedRoute = () => {
  const { isAdmin, token } = useAdminlogin();

  if (!isAdmin || !token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
