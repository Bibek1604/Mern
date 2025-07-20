// src/components/adminpanel/AdminProduct.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar"; // Sidebar component
import { useProductStore } from "../../store"; // Your Zustand product store

const AdminProduct = () => {
  const {
    products,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    error,
  } = useProductStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    rating: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result }); // base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
      rating: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, form);
    } else {
      await createProduct(form);
    }
    resetForm();
    getAllProducts(); // Refresh list
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id || product.id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    getAllProducts(); // Refresh list
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 ml-64">
        <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

        {error && (
          <p className="text-red-500 mb-4">
            Error: {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
          {["title", "description", "price", "category", "rating"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          ))}

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="col-span-2"
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id || p.id} className="text-center">
                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">{p.rating}</td>
                <td className="p-2 border">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-10 w-10 object-cover mx-auto"
                  />
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id || p.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProduct;
