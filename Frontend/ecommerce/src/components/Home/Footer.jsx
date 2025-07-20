import { Instagram, Twitter, Facebook } from "lucide-react";
import React from "react";

const Footer = () => {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "COLLECTIONS", path: "/collections" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <footer className="bg-gradient-card border-t border-taupe shadow-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Gina Sanchez
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Transform your space with our curated collection of premium home decor, 
                furniture, and accessories designed for the modern lifestyle.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-gray-900 font-medium tracking-wide uppercase">
                Stay Updated
              </p>
              <div className="flex max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-l-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-r-lg hover:bg-gray-800 transition-all duration-300 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 font-medium tracking-wide"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 tracking-wide uppercase">
              Connect
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Email: <a href="mailto:support@ginasanchez.com" className="text-accent hover:text-navy transition-colors">support@ginasanchez.com</a>
                </p>
                <p className="text-sm text-muted-foreground">
                  Phone: <a href="tel:+977-9800000000" className="text-accent hover:text-navy transition-colors">+977-9800000000</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Additional Info */}
        <div className="pt-8 border-t border-taupe">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Gina Sanchez. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-accent transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-accent transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/shipping" className="hover:text-accent transition-colors duration-300">
                Shipping Info
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Crafted with care in Nepal • Premium quality guaranteed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;