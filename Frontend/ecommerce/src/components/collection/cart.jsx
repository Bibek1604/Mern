import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore"; // Your Zustand cart store
import { ShoppingCart, Trash2, ChevronLeft, Loader2 } from "lucide-react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import axios from "axios";

// Constants for scalability
const COLORS = {
  primary: "blue-600",
  secondary: "gray-600",
  accent: "green-600",
  danger: "red-600",
  background: "white",
  border: "gray-100",
};

const PAYMENT_METHODS = [
  { value: "Cash on Delivery", label: "Cash on Delivery" },
  { value: "eSewa", label: "eSewa" },
  { value: "Khalti", label: "Khalti" },
  { value: "Card", label: "Debit/Credit Card" },
];

// Reusable Breadcrumb Component
const Breadcrumb = () => (
  <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
    <a href="/" className="hover:text-blue-600 transition-colors">
      Home
    </a>
    <span>/</span>
    <a href="/collections" className="hover:text-blue-600 transition-colors">
      Collections
    </a>
    <span>/</span>
    <span className="text-gray-900">Cart</span>
  </div>
);

// Reusable CartItem Component
const CartItem = ({ item, updateQuantity, removeFromCart }) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <img
      src={item.image || "https://via.placeholder.com/100"}
      alt={item.name || "Product"}
      className="w-20 h-20 object-cover rounded-lg"
    />
    <div className="flex-1 space-y-2">
      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
      <p className="text-sm text-gray-600">Rs. {item.price}</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label={`Decrease quantity of ${item.name}`}
          >
            -
          </button>
          <span className="px-4 py-1 text-gray-900">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>
        <p className="text-sm font-medium text-gray-900">Rs. {item.price * item.quantity}</p>
      </div>
    </div>
    <button
      onClick={() => removeFromCart(item.id)}
      className="text-red-600 hover:text-red-700 transition-colors"
      aria-label={`Remove ${item.name} from cart`}
    >
      <Trash2 className="w-5 h-5" />
    </button>
  </div>
);

// Reusable CartSummary Component
const CartSummary = ({ totalPrice, clearCart }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-20">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>Rs. {totalPrice}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-3">
        <span>Total</span>
        <span>Rs. {totalPrice}</span>
      </div>
    </div>
    <button
      onClick={clearCart}
      className="mt-4 w-full px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Clear Cart
    </button>
  </div>
);

// Reusable CheckoutForm Component
const CheckoutForm = ({ formData, handleInputChange, handlePlaceOrder, loading }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Checkout</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Your Name"
        className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        aria-label="Your Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email Address"
        className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        aria-label="Email Address"
        required
      />
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleInputChange}
        placeholder="Contact Number"
        className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        aria-label="Contact Number"
        required
      />
      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleInputChange}
        className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        aria-label="Payment Method"
      >
        {PAYMENT_METHODS.map((method) => (
          <option key={method.value} value={method.value}>
            {method.label}
          </option>
        ))}
      </select>
    </div>
    <textarea
      name="address"
      value={formData.address}
      onChange={handleInputChange}
      placeholder="Shipping Address"
      className="w-full mt-4 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
      rows={3}
      aria-label="Shipping Address"
      required
    />
    <button
      onClick={handlePlaceOrder}
      disabled={loading}
      className={`mt-6 w-full px-6 py-3 rounded-lg text-white transition flex items-center justify-center gap-2 ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
      }`}
      aria-label="Place Order"
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {loading ? "Placing Order..." : "Place Order"}
    </button>
  </div>
);

// Main Cart Component
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
        <section className="min-h-[80vh] py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add products to your cart.</p>
            <button
              onClick={() => navigate("/collections")}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              aria-label="Shop Products"
            >
              <ShoppingCart className="w-5 h-5" />
              Shop Products
            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Skeleton Loader
  if (loading && cartItems.length > 0) {
    return (
      <>
        <Header />
        <section className="min-h-[80vh] py-16 bg-white">
          <div className="container mx-auto px-4">
            <Breadcrumb />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 animate-pulse"
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="min-h-[80vh] py-16 bg-white">
        <div className="container mx-auto px-4">
          <Breadcrumb />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>

            {/* Order Summary & Checkout */}
            <div className="space-y-6">
              <CartSummary totalPrice={totalPrice} clearCart={clearCart} />
              <CheckoutForm
                formData={formData}
                handleInputChange={handleInputChange}
                handlePlaceOrder={handlePlaceOrder}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;