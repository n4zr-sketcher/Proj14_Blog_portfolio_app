import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${
      isActive
        ? "text-orange-600 font-bold border-b-2 border-orange-500"
        : "text-gray-700 hover:text-orange-500"
    }`;

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/home" className="flex items-center gap-2 text-2xl font-black tracking-tight text-gray-900">
          <span>Blog</span>
          <span className="text-orange-500">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/home" className={navLinkClass}>Home</NavLink>
          <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                }`
              }
            >
              👑 Admin Panel
            </NavLink>
          )}

          {user ? (
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="text-right">
                <span className="block text-xs font-semibold text-gray-800 truncate max-w-[150px]">
                  {user.email}
                </span>
                {isAdmin ? (
                  <span className="text-[10px] uppercase font-bold text-orange-600">Administrator</span>
                ) : (
                  <span className="text-[10px] uppercase font-medium text-gray-400">Reader</span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-semibold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <button
                onClick={() => navigate("/login")}
                className="button-style text-sm"
              >
                Sign In
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <span className="text-xs text-gray-600 font-medium truncate max-w-[100px]">
              {user.email?.split("@")[0]}
            </span>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-md focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden py-3 border-t border-gray-100 flex flex-col gap-2">
          <Link
            to="/home"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
          >
            About
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 rounded"
            >
              👑 Admin Panel
            </Link>
          )}
          <div className="pt-2 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500 px-3">{user.email}</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="mx-3 text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full text-center button-style text-sm mt-1"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
