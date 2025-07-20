import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/Home/Home";
import Collections from "./components/collection/collection";
import About from "./components/Home/About";
import NotFound from "./components/Home/Notfound";

import ProductDetail from "./components/collection/view";
import Cart from "./components/collection/cart";

import AdminLogin from "./components/authentication/Adminlogin";
import AdminProtectedRoute from "./components/authentication/AdminProtectedRoute";
import AdminDashboard from "./components/adminpanel/AdminDashboard";
import AdminProduct from "./components/adminpanel/Adminproduct";
import AdminOrders from "./components/adminpanel/AdminOrders";

import PrivateRoute from "./components/authentication/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/not-found" element={<NotFound />} />

        {/* User protected */}
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

        {/* Admin protected with nested routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
