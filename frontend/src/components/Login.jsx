import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuthMessage } from "../config/authErrors";

function Login() {
  const navigate = useNavigate();
  const { login, isFirebaseConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await login(email, password);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/home"), 800);
    } catch (err) {
      setError(getAuthMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-10 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            {isFirebaseConfigured ? "🔥 Firebase Auth Active" : "🛠️ Local Demo Mode (Firebase Ready)"}
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 disabled:opacity-60"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* Quick test credentials for evaluation */}
        <div className="mt-6 pt-5 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Quick Fill Demo Accounts:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => fillCredentials("admin@blog.com", "password123")}
              className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded border text-left truncate"
            >
              👑 <span className="font-semibold">Admin</span> (Full Access)
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("reader@blog.com", "password123")}
              className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded border text-left truncate"
            >
              👤 <span className="font-semibold">Reader</span> (User Access)
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
