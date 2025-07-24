import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Home from "./components/Home/Home";
import About from "./components/Home/About";
import NotFound from "./components/Home/Notfound";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Collections from "./components/collection/collection";
import ProductDetail from "./components/collection/view";
import Cart from "./components/collection/cart";

// Auth and layout wrappers
import PrivateRoute from "./components/authentication/PrivateRoute";
import AdminLogin from "./components/authentication/Adminlogin";
import AdminProtectedRoute from "./components/authentication/AdminProtectedRoute";
import AdminLayout from "./components/adminpanel/Adminlayout";

// Admin pages
import AdminDashboard from "./components/adminpanel/AdminDashboard";
import AdminProduct from "./components/adminpanel/Adminproduct";
import AdminOrders from "./components/adminpanel/AdminOrders";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/details/:id" element={<ProductDetail />} />

        {/* User-protected route */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin protected layout and nested routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
