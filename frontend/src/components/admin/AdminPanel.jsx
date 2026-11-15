import React, { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import Footer from "../common/Footer";

function AdminPanel() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadBlogs = () => {
    setLoading(true);
    api
      .get("/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => setMessage({ type: "error", text: getErrorMessage(err) }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBlogs();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  // Add a new blog, or save changes when editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage({ type: "error", text: "Title and content cannot be empty." });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      const payload = { newTitle: title.trim(), newContent: content.trim() };
      if (editingId) {
        await api.put(`/api/blogs/${editingId}`, payload);
        setMessage({ type: "success", text: "Blog post updated successfully!" });
      } else {
        await api.post("/api/blogs", payload);
        setMessage({ type: "success", text: "Blog post added to MongoDB successfully!" });
      }
      resetForm();
      loadBlogs();
    } catch (err) {
      setMessage({ type: "error", text: getErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.newTitle);
    setContent(blog.newContent);
    setMessage({ type: "", text: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id, blogTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${blogTitle || "this post"}" from MongoDB?`)) {
      return;
    }
    try {
      await api.delete(`/api/blogs/${id}`);
      setMessage({ type: "success", text: "Blog post deleted successfully." });
      if (editingId === id) resetForm();
      loadBlogs();
    } catch (err) {
      setMessage({ type: "error", text: getErrorMessage(err) });
    }
  };

  return (
    <div className="py-10 min-h-screen">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-orange-500 bg-orange-100 px-3 py-1 rounded-full">
            Restricted Admin Area
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
            Blog Content <span className="text-orange-500">Management</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Logged in as Admin: <span className="font-semibold text-gray-700">{user?.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 text-center">
            <span className="block text-2xl font-black text-orange-600">{blogs.length}</span>
            <span className="text-[10px] uppercase font-bold text-gray-500">Total Posts</span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center justify-between border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{message.type === "success" ? "✅" : "⚠️"}</span>
            <span className="text-sm font-medium">{message.text}</span>
          </div>
          <button
            onClick={() => setMessage({ type: "", text: "" })}
            className="text-xs font-bold opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Add / Edit Form Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-12">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? "✏️ Edit Blog Post" : "➕ Create New Blog Post"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editingId ? "Update existing article in MongoDB" : "Publish new content to MongoDB database"}
            </p>
          </div>
          {editingId && (
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
              Editing Mode
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="e.g., Mastering MongoDB Aggregations in Node.js"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Blog Content
            </label>
            <textarea
              placeholder="Write your article markdown or text content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              rows="6"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="button-style text-sm disabled:opacity-60"
            >
              {saving ? "Saving to MongoDB..." : editingId ? "💾 Save Changes" : "🚀 Publish Post"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Blogs List */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Published Posts ({blogs.length})
          </h2>
          <button
            onClick={loadBlogs}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 px-3 py-1.5 rounded-lg border border-orange-200 hover:bg-orange-50 transition"
          >
            ↻ Refresh List
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-gray-400 mt-2">Loading database entries...</p>
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm">No blogs found in the database. Use the form above to add one!</p>
          </div>
        )}

        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className={`p-6 bg-white rounded-xl border transition-shadow shadow-sm hover:shadow-md ${
                editingId === blog._id ? "border-orange-400 ring-2 ring-orange-100" : "border-gray-100"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-400">
                      {blog.date || "No date"}
                    </span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs font-medium text-rose-500">
                      ❤️ {blog.likes || 0} likes
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{blog.newTitle}</h3>
                  <p className="text-xs text-gray-400 mt-1 truncate max-w-xl">
                    ID: {blog._id} {blog.authorEmail ? `| Author: ${blog.authorEmail}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <button
                    onClick={() => setViewId(viewId === blog._id ? null : blog._id)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-md border border-gray-200 hover:bg-gray-50 text-gray-700 transition"
                  >
                    {viewId === blog._id ? "Hide Content" : "View Content"}
                  </button>
                  <button
                    onClick={() => startEdit(blog)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id, blog.newTitle)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Collapsible View */}
              {viewId === blog._id && (
                <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2">Full Content Preview:</p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.newContent}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminPanel;
