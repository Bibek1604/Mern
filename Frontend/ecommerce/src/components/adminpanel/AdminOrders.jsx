import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./AdminSidebar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/admin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
        setError("Failed to fetch orders. Please try again.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Orders</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {orders.length === 0 && !error ? (
            <div className="bg-white shadow-lg rounded-lg p-6 text-center text-gray-500">
              No orders found.
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-4 font-semibold">Order ID</th>
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Items</th>
                    <th className="p-4 font-semibold">Total</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Shipping Address</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{order.id}</td>
                      <td className="p-4">
                        <div className="font-medium text-gray-800">{order.User?.name || "N/A"}</div>
                        <div className="text-xs text-gray-500">{order.User?.email || "N/A"}</div>
                      </td>
                      <td className="p-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm">
                            • {item.title} <span className="text-gray-500">× {item.quantity}</span>
                          </div>
                        ))}
                      </td>
                      <td className="p-4">${parseFloat(order.total).toFixed(2)}</td>
                      <td className="p-4 capitalize">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{order.shippingAddress || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;