require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

/* ---------- Config ---------- */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogDB";

// Admin users = Firebase accounts whose email is listed here (comma-separated)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "admin@blog.com")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// Allowed frontend origins (comma-separated, no trailing slash)
const ALLOWED_ORIGINS = (process.env.CLIENT_ORIGIN || "http://localhost:3000,http://127.0.0.1:3000")
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, ""))
  .filter(Boolean);

/* ---------- Firebase Admin Initialization ---------- */
let firebaseInitialized = false;
if (process.env.FIREBASE_PROJECT_ID) {
  try {
    admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
    firebaseInitialized = true;
    console.log(`[firebase-admin] Initialized with project ID: ${process.env.FIREBASE_PROJECT_ID}`);
  } catch (err) {
    console.warn("[firebase-admin] Initialization notice:", err.message);
  }
} else {
  console.log("[firebase-admin] No FIREBASE_PROJECT_ID set. Dev fallback auth enabled.");
}

/* ---------- Middleware ---------- */
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      // Also allow localhost on any port for smooth development
      if (/^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
        return cb(null, true);
      }
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));

/* ---------- MongoDB Connection & Models ---------- */
const blogSchema = new mongoose.Schema(
  {
    newTitle: { type: String, required: true, trim: true },
    newContent: { type: String, required: true },
    date: { type: String, default: () => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
    likes: { type: Number, default: 0 },
    authorEmail: { type: String, default: "admin@blog.com" },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

const sampleBlogs = [
  {
    newTitle: "Getting Started with MERN Stack Development in 2026",
    newContent:
      "The MERN stack (MongoDB, Express.js, React, Node.js) remains one of the most powerful and popular full-stack development environments. By leveraging JavaScript and TypeScript across both frontend and backend, developers can build scalable, responsive applications rapidly. In this guide, we explore core architecture patterns, MongoDB indexing, and Express middleware best practices.",
    date: "November 10, 2026",
    likes: 14,
    authorEmail: "admin@blog.com",
  },
  {
    newTitle: "Why Tailwind CSS Transforms Modern UI Design",
    newContent:
      "Tailwind CSS has completely shifted how developers think about styling. With utility-first classes, you no longer need to switch between JSX and separate CSS files for basic layout rules. Features like dynamic theme configuration, responsive prefixes, and arbitrary value support make UI development fluid and intuitive.",
    date: "November 12, 2026",
    likes: 22,
    authorEmail: "admin@blog.com",
  },
  {
    newTitle: "Securing Full-Stack Apps with Firebase Authentication & MongoDB",
    newContent:
      "Combining Firebase Authentication with MongoDB provides the best of both worlds: robust identity management, secure token verification, and flexible document-based data persistence. In this post, we discuss JWT ID token verification in Express, role-based admin access control, and route shielding in React Router.",
    date: "November 14, 2026",
    likes: 35,
    authorEmail: "admin@blog.com",
  },
  {
    newTitle: "Building Seamless Admin Portals with Role-Based Access Control",
    newContent:
      "Managing content efficiently requires a well-structured administrative interface. Creating custom Admin routes, validating authorization on each mutation, and offering intuitive CRUD (Create, Read, Update, Delete) controls ensures smooth content operations while keeping the application secure from unauthorized access.",
    date: "November 15, 2026",
    likes: 18,
    authorEmail: "admin@blog.com",
  },
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("[db] Connected to MongoDB at:", MONGO_URI);
    try {
      const count = await Blog.countDocuments();
      if (count === 0) {
        await Blog.insertMany(sampleBlogs);
        console.log(`[db] Auto-seeded ${sampleBlogs.length} sample blog posts.`);
      }
    } catch (seedErr) {
      console.warn("[db] Auto-seed note:", seedErr.message);
    }
  })
  .catch((err) => console.error("[db] MongoDB connection failed:", err.message));

/* ---------- Auth Middleware ---------- */
// Checks the Firebase ID token or dev token sent as "Authorization: Bearer <token>"
async function verifyUser(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Please log in first" });

  // 1. If dev fallback token (used for offline or pre-Firebase testing)
  if (token.startsWith("dev-token:")) {
    const email = token.replace("dev-token:", "").toLowerCase();
    req.user = { uid: "dev-" + email, email };
    return next();
  }

  // 2. Official Firebase Admin token verification
  if (firebaseInitialized) {
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      req.user = { uid: decoded.uid, email: (decoded.email || "").toLowerCase() };
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired login. Please log in again" });
    }
  }

  // 3. Fallback if client sent a JWT or simulated token before Firebase Project ID was configured
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
      if (payload && payload.email) {
        req.user = { uid: payload.user_id || payload.sub || "user", email: payload.email.toLowerCase() };
        return next();
      }
    }
  } catch (_) {}

  // Default fallback if unverified
  return res.status(401).json({ message: "Invalid or expired login. Please log in again" });
}

// Only users listed in ADMIN_EMAILS may continue
function requireAdmin(req, res, next) {
  const userEmail = (req.user?.email || "").toLowerCase();
  if (!ADMIN_EMAILS.includes(userEmail)) {
    return res.status(403).json({ message: "Admin access only. Unauthorized account: " + userEmail });
  }
  next();
}

const today = () =>
  new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

/* ---------- Routes ---------- */

// Root health check
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Blog Portfolio MERN API is running",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    firebaseConfigured: firebaseInitialized,
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    dbReadyState: mongoose.connection.readyState,
    adminEmailsCount: ADMIN_EMAILS.length,
    firebaseConfigured: firebaseInitialized,
  });
});

// Who am I? Returns user email and whether they have admin privileges
app.get("/api/auth/me", verifyUser, (req, res) => {
  const email = (req.user.email || "").toLowerCase();
  res.json({
    email,
    uid: req.user.uid,
    isAdmin: ADMIN_EMAILS.includes(email),
  });
});

// Public: list all blogs from MongoDB (sorted newest first)
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public: view a single blog post
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Invalid blog id" });
  }
});

// Logged-in users: Like a blog
app.patch("/api/blogs/like/:id", verifyUser, async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Blog not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Invalid blog id" });
  }
});

// Admin only: Add a new blog post to MongoDB
app.post("/api/blogs", verifyUser, requireAdmin, async (req, res) => {
  const { newTitle, newContent } = req.body || {};
  if (!newTitle || !newContent) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  try {
    const blog = await Blog.create({
      newTitle: newTitle.trim(),
      newContent: newContent.trim(),
      date: today(),
      likes: 0,
      authorEmail: req.user.email,
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin only: Edit an existing blog post
app.put("/api/blogs/:id", verifyUser, requireAdmin, async (req, res) => {
  const { newTitle, newContent } = req.body || {};
  if (!newTitle || !newContent) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { newTitle: newTitle.trim(), newContent: newContent.trim() },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Blog not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin only: Delete a blog post
app.delete("/api/blogs/:id", verifyUser, requireAdmin, async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: "Invalid blog id" });
  }
});

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[error]", err.message);
  res.status(500).json({ message: "Something went wrong on the server: " + err.message });
});

app.listen(PORT, () => {
  console.log(`[server] Blog Portfolio Backend running on port ${PORT}`);
  console.log(`[server] Admin emails: ${ADMIN_EMAILS.join(", ")}`);
});
