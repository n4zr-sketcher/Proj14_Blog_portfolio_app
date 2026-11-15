require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogDB";

const blogSchema = new mongoose.Schema(
  {
    newTitle: { type: String, required: true, trim: true },
    newContent: { type: String, required: true },
    date: String,
    likes: { type: Number, default: 0 },
    authorEmail: String,
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

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("[seed] Connected to MongoDB:", MONGO_URI);

    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(sampleBlogs);
      console.log(`[seed] Inserted ${sampleBlogs.length} sample blog posts.`);
    } else {
      console.log(`[seed] Database already contains ${count} blogs. Skipping seed.`);
    }

    await mongoose.disconnect();
    console.log("[seed] Done.");
    process.exit(0);
  } catch (err) {
    console.error("[seed] Error seeding database:", err);
    process.exit(1);
  }
}

seed();
