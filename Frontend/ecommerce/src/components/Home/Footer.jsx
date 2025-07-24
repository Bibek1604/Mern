import { Instagram, Twitter, Facebook } from "lucide-react";
import React from "react";

const Footer = () => {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "COLLECTIONS", path: "/collections" },
    { name: "ABOUT", path: "/about" },
  ];


  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight md:text-4xl">
                Ghar Sansar
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-md text-base">
                Transform your space with our curated collection of premium home decor,
                furniture, and accessories designed for the modern lifestyle.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-gray-900 font-semibold tracking-wide uppercase">
                Stay Updated
              </p>
              <div className="flex max-w-md group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-l-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 group-hover:shadow-md"
                />
                <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-r-lg hover:bg-gray-800 transition-all duration-300 shadow-lg group-hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 animate-fade-in-up animation-delay-200">
            <h3 className="text-lg font-semibold text-gray-900 tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium tracking-wide hover:underline"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

  
        </div>

        {/* Copyright & Additional Info */}
        <div className="pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-600">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Ghar Sansar. All rights reserved.
            </p>
            <div className="flex space-x-6 text-a text-gray-600">
              <a href="/privacy" className="hover:text-blue-600 transition-colors duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-blue-600 transition-colors duration-300 hover:underline">
                Terms of Service
              </a>
              <a href="/shipping" className="hover:text-blue-600 transition-colors duration-300 hover:underline">
                Shipping Info
              </a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Crafted with care in Nepal • Premium quality guaranteed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;