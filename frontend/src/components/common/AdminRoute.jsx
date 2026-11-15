import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminRoute({ children }) {
  const { user, isAdmin, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 mt-4 text-sm font-medium">Verifying Administrator privileges...</p>
      </div>
    );
  }

  // Not logged in -> Redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not in ADMIN_EMAILS -> Restricted Access
  if (!isAdmin) {
    return (
      <div className="max-w-lg mx-auto my-20 p-8 bg-white border border-red-100 rounded-2xl shadow-xl text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4">
          🚫
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Restricted Admin Access</h2>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          You are currently signed in as <span className="font-semibold text-gray-800">{user.email}</span>, which does not have administrator privileges.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Administrator accounts are configured via the <code className="bg-gray-100 px-1 py-0.5 rounded">ADMIN_EMAILS</code> environment variable.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/home"
            className="px-5 py-2.5 rounded-md text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Return to Home
          </Link>
          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-md text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition shadow-sm"
          >
            Sign Out & Switch Account
          </button>
        </div>
      </div>
    );
  }

  return children;
}

export default AdminRoute;
