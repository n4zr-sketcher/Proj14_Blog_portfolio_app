import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Values come from frontend/.env (see .env.example)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey.trim() !== "" &&
  !firebaseConfig.apiKey.includes("your-")
);

let app = null;
let authInstance = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    console.log("[Firebase] Initialized with project ID:", firebaseConfig.projectId);
  } catch (err) {
    console.error("[Firebase] Initialization error:", err);
  }
} else {
  console.log("[Firebase] Keys not provided in .env. Running in development/demo mode.");
  
  // Minimal fallback auth object that mirrors firebase auth currentUser
  const storedUserJson = localStorage.getItem("dev_auth_user");
  let currentUser = storedUserJson ? JSON.parse(storedUserJson) : null;
  if (currentUser) {
    currentUser.getIdToken = async () => "dev-token:" + currentUser.email;
  }

  authInstance = {
    get currentUser() {
      return currentUser;
    },
    set currentUser(val) {
      currentUser = val;
    },
  };
}

export const auth = authInstance;
export default app;
