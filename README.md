# 🌐 Blog Portfolio Web Application (MERN Stack)

A modern, responsive **Full Stack Blog Portfolio Application** built with the **MERN Stack** (MongoDB, Express.js, React 18, Node.js) and styled with **Tailwind CSS**. The project features comprehensive **MongoDB database integration**, **Firebase user authentication** (Login/Signup/Logout), and **Role-Based Admin Access** for blog content management (CRUD).

---

## 🎯 Features

- **Portfolio Showcase**: Interactive personal portfolio highlighting skills, experience, services, and live projects.
- **Dynamic Blog System**: Reads, writes, updates, and deletes blog posts directly from **MongoDB**.
- **User Authentication**: Secure Login, Registration, and Session management powered by **Firebase Authentication** with user-friendly error alerts.
- **Admin Control Panel**: Restricted route (`/admin`) reserved exclusively for authorized admin emails.
- **Full Blog CRUD for Admins**:
  - ➕ Create and publish new articles
  - ✏️ Edit title and content of existing articles
  - 👁️ Preview full blog post content inline
  - 🗑️ Delete blog posts with confirmation prompts
- **Engagement Features**: Logged-in readers can like blog posts with real-time like counts stored in MongoDB.
- **Unified Repository**: Both `frontend` and `backend` reside in the same project root with automated launch scripts.
- **Zero-Setup Evaluation Mode**: Built-in development fallback so examiners can test login, registration, and admin controls immediately even before configuring Firebase keys.

---

## 📁 Project Directory Structure

```
PROJ FINAL EMC BLOG PORTFOLIO/
├── backend/
│   ├── .env                      # Backend environment variables
│   ├── .env.example              # Example environment template
│   ├── index.js                  # Express API server & MongoDB connection
│   ├── seed.js                   # Database seed script for initial blogs
│   └── package.json              # Backend dependencies (Express, Mongoose, etc.)
├── frontend/
│   ├── public/                   # Static HTML and icons
│   ├── src/
│   │   ├── assets/               # Portfolio images and tech icons
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── AdminPanel.jsx # Protected Admin management dashboard
│   │   │   ├── common/
│   │   │   │   ├── AdminRoute.jsx # Route guard for admin access
│   │   │   │   ├── Footer.jsx     # Global footer
│   │   │   │   ├── Navbar.css     # Button styles and transitions
│   │   │   │   └── Navbar.jsx     # Responsive navbar with auth state
│   │   │   ├── About.jsx          # Professional developer bio & skills matrix
│   │   │   ├── Blogs.jsx          # Public blog grid with like feature
│   │   │   ├── Home.jsx           # Portfolio landing page
│   │   │   ├── Login.jsx          # Firebase login with quick-fill demo
│   │   │   └── Signup.jsx         # Firebase registration
│   │   ├── config/
│   │   │   ├── api.js             # Axios instance with auth token interceptor
│   │   │   ├── authErrors.js      # Friendly error mapping for Firebase
│   │   │   └── firebase.js        # Firebase SDK initialization
│   │   ├── context/
│   │   │   └── AuthContext.js     # Global React Auth Context
│   │   ├── App.js                 # React Router and application layout
│   │   ├── index.css              # Tailwind CSS directives
│   │   └── index.js               # React root render
│   ├── .env                      # Frontend environment variables
│   ├── .env.example              # Frontend environment template
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   └── package.json              # Frontend dependencies
├── .gitignore                    # Git ignore file
└── README.md                     # Documentation & setup guide
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port `27017` (or a MongoDB Atlas URI)

### 2. Install Dependencies
Install dependencies separately in both directories:
```bash
# In backend
cd backend
npm install

# In frontend
cd ../frontend
npm install --legacy-peer-deps
```

### 3. Seed MongoDB Database (Optional)
To populate the database with initial tech blogs:
```bash
cd backend
node seed.js
```

### 4. Running the Project (2 Terminals Method)

#### 🖥️ Terminal 1 - Backend Server:
```bash
cd backend
npm run dev
```
*(Or `npm start`) - runs on: [http://localhost:5000](http://localhost:5000)*

#### 💻 Terminal 2 - Frontend Client:
```bash
cd frontend
npm run dev
```
*Frontend runs on: [http://localhost:3000](http://localhost:3000)*

---

## 🔑 Authentication & Admin Setup

### Admin Credentials
By default, the backend authorizes the following email address for Admin access:
- `admin@blog.com`

You can add any other admin emails by editing `ADMIN_EMAILS` in `backend/.env`:
```env
ADMIN_EMAILS=admin@blog.com,your-email@example.com
```

### Option A: Immediate Evaluation (Demo Mode)
If you run the app without Firebase keys, the application automatically runs in **Seamless Evaluation Mode**:
1. Click **Sign In** in the navigation bar.
2. Click the quick button **👑 Admin (Full Access)** to auto-fill `admin@blog.com` / `password123`.
3. Click **Sign In** — you will be redirected to the home page, and the **👑 Admin Panel** link will appear in the navigation bar!
4. Click **Admin Panel** to create, edit, view, and delete blog posts directly in MongoDB.

### Option B: Connecting Your Live Firebase Project
To connect your own Firebase project:
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. In **Authentication** -> **Sign-in method**, enable **Email/Password**.
3. In **Project settings** -> **General** -> **Your apps**, register a Web app (`</>`) and copy the config.
4. Update `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_FIREBASE_API_KEY=AIzaSy...
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_APP_ID=1:123456789:web:...
   ```
5. Update `backend/.env`:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   ```
6. Restart the servers with `npm start`.

---

## 📡 Backend REST API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | API health check & MongoDB connection status |
| `GET` | `/api/blogs` | Public | List all blogs sorted by newest first |
| `GET` | `/api/blogs/:id` | Public | Retrieve a single blog by MongoDB ID |
| `PATCH` | `/api/blogs/like/:id` | Authenticated | Increment like count for a blog post |
| `GET` | `/api/auth/me` | Authenticated | Returns logged-in user profile & `isAdmin` status |
| `POST` | `/api/blogs` | **Admin Only** | Create a new blog post in MongoDB |
| `PUT` | `/api/blogs/:id` | **Admin Only** | Update an existing blog post |
| `DELETE` | `/api/blogs/:id` | **Admin Only** | Delete a blog post from MongoDB |

---

## 🧪 Testing Checklist

- [x] **Project Setup**: Unified repo with `frontend/` and `backend/` in the same directory.
- [x] **Dependencies**: Node packages installed and build tested with 0 errors.
- [x] **MongoDB Integration**: Connected via Mongoose, auto-seeds sample posts, supports full CRUD.
- [x] **Firebase Auth**: Login, Signup, and Logout with appropriate success and error messaging.
- [x] **Role-Based Admin Access**: Protected route `/admin` accessible only to admin emails; unauthorized users blocked with 403 Forbidden.
- [x] **Responsive UI**: Fully styled with Tailwind CSS across mobile, tablet, and desktop viewports.
