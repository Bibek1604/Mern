import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-gray-100 hover:bg-blue-900 transition-all duration-300 font-medium tracking-wide rounded-md"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;