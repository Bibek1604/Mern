// src/components/Collections.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../store";
import { Filter, Search, X } from "lucide-react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ProductCard from "../Home/ProductCard";

// Constants for scalability
const SORT_OPTIONS = [
  { value: "name", label: "Sort by Name" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

// Reusable FilterSidebar Component
const FilterSidebar = ({ categories, selectedCategories, handleCategoryChange, setSelectedCategories, setSearchTerm, sortBy, setSortBy, showMobileFilters, setShowMobileFilters }) => (
  <aside className={`lg:w-80 ${showMobileFilters ? "block" : "hidden"} lg:block fixed lg:sticky top-0 lg:top-20 z-20 h-screen lg:h-auto bg-white lg:bg-transparent transition-all duration-300`}>
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      {/* Mobile Filter Header */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button onClick={() => setShowMobileFilters(false)}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Desktop Sort */}
      <div className="hidden lg:block mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  aria-label={`Filter by ${category}`}
                />
                <span className="text-sm text-gray-700 capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {(selectedCategories.length > 0 || setSearchTerm) && (
        <button
          onClick={() => {
            setSelectedCategories([]);
            setSearchTerm("");
          }}
          className="mt-4 w-full px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  </aside>
);

// Reusable SearchBar Component
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="mb-6 max-w-md mx-auto">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
        aria-label="Search products"
      />
    </div>
  </div>
);

// Reusable ProductGrid Component
const ProductGrid = ({ sortedProducts, navigate }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {sortedProducts.map((product) => (
      <div
        key={product.id || product._id}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="p-4">
          <ProductCard {...product} />
          <button
            onClick={() => navigate(`/details/${product.id || product._id}`)}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            aria-label={`View details for ${product.title || product.name}`}
          >
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
);

// Main Collections Component
const Collections = () => {
  const navigate = useNavigate();
  const { products, getAllProducts, isLoading, error } = useProductStore();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const categories = [...new Set(products.map((p) => p.category))];

  // Filter products based on category, search term
  let filteredProducts = products;

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort products based on sortBy value
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
      default:
        return (a.title || a.name || "").localeCompare(b.title || b.name || "");
    }
  });

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our curated collection of premium products designed for your lifestyle
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Mobile Controls */}
        <div className="lg:hidden mb-6 flex justify-between items-center gap-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Toggle filters"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors shadow-sm"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error loading products</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => getAllProducts()}
              className="mt-2 text-sm underline hover:no-underline focus:outline-none"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading State with Skeleton Loader */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        {!isLoading && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              setSelectedCategories={setSelectedCategories}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Info */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">
                  Showing {sortedProducts.length} of {products.length} products
                </p>
              </div>

              {/* No Results */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSearchTerm("");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {sortedProducts.length > 0 && (
                <ProductGrid sortedProducts={sortedProducts} navigate={navigate} />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Collections;