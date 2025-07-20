import React, { useState } from "react";
import useCartStore from "../../store/cartStore"; // Your Zustand cart store
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import axios from "axios";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    paymentMethod: "Cash on Delivery",
  });
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = async () => {
    const { name, email, contact, address, paymentMethod } = formData;

    if (!name || !email || !contact || !address) {
      alert("❌ Please fill all required fields.");
      return;
    }

    if (cartItems.length === 0) {
      alert("🛒 Cart is empty. Add some products first.");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        orderNumber: `ORD-${Date.now()}`,
        customerName: name,
        customerEmail: email,
        contactNumber: contact,
        shippingAddress: address,
        paymentMethod,
        items: cartItems,
        total: totalPrice,
      };

      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/orders", orderPayload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (res.data) {
        alert("✅ Order placed successfully!");
        clearCart();
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || "❌ Failed to place order. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
          <button
            onClick={() => navigate("/collections")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Shop Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="min-h-[80vh] container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

        {/* Cart Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">Product</th>
              <th className="border border-gray-300 p-3 text-center">Price</th>
              <th className="border border-gray-300 p-3 text-center">Quantity</th>
              <th className="border border-gray-300 p-3 text-center">Total</th>
              <th className="border border-gray-300 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(({ id, name, price, quantity, image }) => (
              <tr key={id} className="border-t border-gray-300">
                <td className="flex items-center space-x-4 p-3">
                  <img
                    src={image || "https://via.placeholder.com/64"}
                    alt={name || "Product"}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span>{name}</span>
                </td>
                <td className="text-center p-3">Rs. {price}</td>
                <td className="text-center p-3">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = Math.max(1, Number(e.target.value));
                      updateQuantity(id, val);
                    }}
                    className="w-16 text-center border rounded"
                  />
                </td>
                <td className="text-center p-3">Rs. {price * quantity}</td>
                <td className="text-center p-3">
                  <button
                    onClick={() => removeFromCart(id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={clearCart}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Clear Cart
          </button>
          <div className="text-xl font-semibold">Total: Rs. {totalPrice}</div>
        </div>

        {/* Checkout Section */}
        <div className="mt-12 bg-gray-100 p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Contact Number"
              className="p-3 border rounded"
            />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="p-3 border rounded"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="eSewa">eSewa</option>
              <option value="Khalti">Khalti</option>
              <option value="Card">Debit/Credit Card</option>
            </select>
          </div>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Shipping Address"
            className="w-full mt-4 p-3 border rounded"
            rows={3}
          />

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`mt-6 px-6 py-3 rounded text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
