import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-gray-100 text-gray-500 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-gray-900">Blog<span className="text-orange-500">Portfolio</span></span>
          <span className="text-xs text-gray-400">| MERN Full Stack Application</span>
        </div>

        <div className="flex gap-6 text-xs font-medium">
          <Link to="/home" className="hover:text-orange-500 transition">Home</Link>
          <Link to="/blogs" className="hover:text-orange-500 transition">Blogs</Link>
          <Link to="/about" className="hover:text-orange-500 transition">About</Link>
          <Link to="/login" className="hover:text-orange-500 transition">Sign In</Link>
        </div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Jacky Thomas. Integrated with MongoDB & Firebase.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
