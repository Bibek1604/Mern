import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./AdminSidebar"; // Sidebar visible on left

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/admin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 ml-64">
        <h1 className="text-2xl font-semibold mb-4">All Orders</h1>

        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">
                  {order.User?.name}
                  <br />
                  <span className="text-xs text-gray-500">
                    {order.User?.email}
                  </span>
                </td>
                <td className="p-2 border text-left">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      • {item.title} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-2 border">${order.total}</td>
                <td className="p-2 border capitalize">{order.status}</td>
                <td className="p-2 border">{order.shippingAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
