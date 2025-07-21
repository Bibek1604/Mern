// src/components/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore, useCartStore } from "../../store";
import { ShoppingCart, ChevronLeft, Star } from "lucide-react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

// Constants for scalability
const COLORS = {
  primary: "blue-600",
  secondary: "gray-600",
  background: "white",
  border: "gray-100",
};

// Reusable ProductImage Component
const ProductImage = ({ image, alt }) => (
  <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
    <img
      src={image || "https://via.placeholder.com/500"}
      alt={alt}
      className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
  </div>
);

// Reusable ProductInfo Component
const ProductInfo = ({ product, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {product.title || product.name}
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold text-blue-600">Rs. {product.price}</p>
          {product.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description || "No description available."}
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Quantity:</label>
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-50"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 py-1 text-gray-900">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-50"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => handleAddToCart(quantity)}
        className="inline-flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Add to cart"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>

      <p className="text-sm text-gray-600">
        <span className="font-medium">100% Original product.</span>
        <br />
        Cash on delivery is available on this product.
      </p>
    </div>
  );
};

// Reusable ProductDescription Component
const ProductDescription = ({ description, longDescription }) => (
  <div className="mt-16 border rounded-lg p-6 bg-gray-50">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      {longDescription || description || "No detailed description available."}
    </p>
  </div>
);

// Reusable Breadcrumb Component
const Breadcrumb = ({ productName }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
    <a href="/" className="hover:text-blue-600 transition-colors">
      Home
    </a>
    <span>/</span>
    <a href="/collections" className="hover:text-blue-600 transition-colors">
      Collections
    </a>
    <span>/</span>
    <span className="text-gray-900">{productName}</span>
  </div>
);

// Main ProductDetail Component
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProduct, getProductById, clearCurrentProduct, isLoading, error } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    getProductById(id);
    return () => clearCurrentProduct();
  }, [id, getProductById, clearCurrentProduct]);

  const handleAddToCart = (quantity) => {
    if (currentProduct) {
      const productToAdd = { ...currentProduct, id: currentProduct.id || currentProduct._id, quantity };
      addToCart(productToAdd);
      // Optional: Show a toast notification here (requires a toast library like react-toastify)
    }
  };

  // Skeleton Loader
  if (isLoading) {
    return (
      <>
        <Header />
        <section className="min-h-[80vh] py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="rounded-xl bg-gray-200 h-[400px] animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <section className="min-h-[80vh] py-16 bg-white">
          <div className="container mx-auto px-4 text-center text-red-600">
            {error}
            <button
              onClick={() => getProductById(id)}
              className="mt-4 text-sm underline hover:no-underline focus:outline-none"
            >
              Try again
            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (!currentProduct) {
    return (
      <>
        <Header />
        <section className="min-h-[80vh] py-16 bg-white">
          <div className="container mx-auto px-4 text-center text-gray-600">
            Product not found.
            <button
              onClick={() => navigate("/collections")}
              className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Collections
            </button>
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
          {/* Breadcrumb */}
          <Breadcrumb productName={currentProduct.title || currentProduct.name} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <ProductImage image={currentProduct.image} alt={currentProduct.title || currentProduct.name} />

            {/* Product Info */}
            <ProductInfo product={currentProduct} handleAddToCart={handleAddToCart} />
          </div>

          {/* Product Description */}
          <ProductDescription
            description={currentProduct.description}
            longDescription={currentProduct.longDescription}
          />
        </div>
      </section>

      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Ghar Sansar</h4>
          <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
            We believe your home should reflect your personality, taste, and lifestyle. That’s why we’re passionate
            about curating and offering a wide range of elegant, modern, and timeless decor items that transform your
            space into something truly special.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetail;