import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import React from "react";

const ProductCard = ({ name, title, price, image, category, isNew, rating }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Use title if name is not provided (for API compatibility)
  const productName = name || title;
  
  // Runtime check for missing or invalid props
  if (!productName || price === undefined || !image) {
    console.warn("ProductCard: Missing required props", { name: productName, price, image });
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
          alt={productName || "Product"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        {isNew && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            NEW
          </span>
        )}
        
        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <button
            className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-red-50 hover:border-red-300 text-gray-600 hover:text-red-500 flex items-center justify-center transition-colors duration-300 shadow-sm"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isFavorited ? "fill-current text-red-500" : ""
              }`} 
            />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 transition-transform duration-300 ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}>
          <button 
            className="w-full bg-gray-900 hover:bg-gray-800 text-gray-100 px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {category && (
          <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
            {category}
          </p>
        )}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {productName || "Unnamed Product"}
        </h3>
        
        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({rating.toFixed(1)})</span>
          </div>
        )}
        
        <p className="text-lg font-semibold text-blue-600">
          {formatPrice(price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;