import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import { useProductStore } from "../../store";

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
      setForm({ ...form, image: reader.result });
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
    getAllProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id || product.id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    getAllProducts();
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Products</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}

          {/* Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {editingId ? "Update Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "title", type: "text", placeholder: "Product Title" },
                { name: "description", type: "text", placeholder: "Description" },
                { name: "price", type: "number", placeholder: "Price", step: "0.01" },
                { name: "category", type: "text", placeholder: "Category" },
                { name: "rating", type: "number", placeholder: "Rating", step: "0.1" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1 capitalize">{field.name}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  disabled={isLoading}
                >
                  {editingId ? "Update Product" : "Add Product"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full md:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Rating</th>
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id || p.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{p.title}</td>
                    <td className="p-4">${parseFloat(p.price).toFixed(2)}</td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4">{p.rating}</td>
                    <td className="p-4">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id || p.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-6 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;