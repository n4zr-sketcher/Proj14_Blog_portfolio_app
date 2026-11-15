import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../config/api";
import { useAuth } from "../context/AuthContext";
import Footer from "./common/Footer";

function Blogs() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likingId, setLikingId] = useState(null);

  const fetchBlogs = () => {
    setLoading(true);
    setError("");
    api
      .get("/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const handleLike = async (id) => {
    if (!user) {
      if (window.confirm("You need to be logged in to like posts. Go to login page?")) {
        return navigate("/login");
      }
      return;
    }
    setLikingId(id);
    try {
      const { data } = await api.patch(`/api/blogs/like/${id}`);
      setBlogs((list) => list.map((b) => (b._id === id ? data : b)));
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setLikingId(null);
    }
  };

  return (
    <div className="blog-section py-10 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-orange-500 bg-orange-100 px-3 py-1 rounded-full">
          Articles & Tutorials
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
          Latest <span className="text-orange-500">Blogs</span> 📚
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Read in-depth articles on MERN full stack engineering, database optimization with MongoDB, and security architectures.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Fetching blogs from MongoDB...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="max-w-md mx-auto my-10 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
          <p className="text-red-700 font-semibold mb-2">Failed to load blogs</p>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchBlogs}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-xs font-semibold hover:bg-red-700 transition"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && blogs.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 max-w-lg mx-auto">
          <p className="text-4xl mb-2">📝</p>
          <h3 className="text-lg font-bold text-gray-800">No blog posts yet</h3>
          <p className="text-sm text-gray-500 mt-1">Check back soon or add blogs through the Admin Panel.</p>
        </div>
      )}

      {/* Blog grid */}
      {!loading && !error && blogs.length > 0 && (
        <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto px-4 mb-16">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="blog-post flex flex-col justify-between p-7 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-gray-100"
            >
              <div>
                <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                  <span className="font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                    Tech Insight
                  </span>
                  <span>{blog.date || "Recent"}</span>
                </div>

                <h3 className="blog-title font-bold text-2xl text-gray-900 mb-3 hover:text-orange-500 transition">
                  {blog.newTitle}
                </h3>

                <p className="blog-content text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                  {blog.newContent}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(blog._id)}
                    disabled={likingId === blog._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition active:scale-95 disabled:opacity-50"
                  >
                    <span>❤️</span>
                    <span>{likingId === blog._id ? "Liking..." : "Like"}</span>
                  </button>
                  <span className="text-xs text-gray-500 font-medium">
                    {blog.likes || 0} {blog.likes === 1 ? "like" : "likes"}
                  </span>
                </div>

                {blog.authorEmail && (
                  <span className="text-[11px] text-gray-400 truncate max-w-[150px]">
                    by {blog.authorEmail.split("@")[0]}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Blogs;
