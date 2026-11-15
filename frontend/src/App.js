import React from "react";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import About from "./components/About";
import Navbar from "./components/common/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminPanel from "./components/admin/AdminPanel";
import AdminRoute from "./components/common/AdminRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AuthProvider>
        <BrowserRouter>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 bg-white min-h-screen shadow-sm border-x border-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
