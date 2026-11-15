import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../config/firebase";
import api from "../config/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = useCallback(async (activeUser) => {
    if (!activeUser) {
      setIsAdmin(false);
      return;
    }
    try {
      // The backend decides who is an admin via ADMIN_EMAILS environment variable
      const { data } = await api.get("/api/auth/me");
      setIsAdmin(Boolean(data.isAdmin));
    } catch (err) {
      console.warn("[Auth] Admin check response:", err?.response?.status);
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    if (isFirebaseConfigured && auth && typeof onAuthStateChanged === "function") {
      // Live Firebase Authentication
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        await checkAdminStatus(firebaseUser);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Dev / Fallback Authentication mode
      const stored = localStorage.getItem("dev_auth_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const devUser = {
            uid: parsed.uid || "dev-" + parsed.email,
            email: parsed.email,
            getIdToken: async () => "dev-token:" + parsed.email,
          };
          auth.currentUser = devUser;
          setUser(devUser);
          checkAdminStatus(devUser);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [checkAdminStatus]);

  const signup = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (isFirebaseConfigured) {
      return createUserWithEmailAndPassword(auth, cleanEmail, password);
    }
    // Dev fallback
    const devUser = {
      uid: "dev-" + Date.now(),
      email: cleanEmail,
      getIdToken: async () => "dev-token:" + cleanEmail,
    };
    localStorage.setItem("dev_auth_user", JSON.stringify(devUser));
    auth.currentUser = devUser;
    setUser(devUser);
    await checkAdminStatus(devUser);
    return devUser;
  };

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (isFirebaseConfigured) {
      return signInWithEmailAndPassword(auth, cleanEmail, password);
    }
    // Dev fallback
    const devUser = {
      uid: "dev-" + Date.now(),
      email: cleanEmail,
      getIdToken: async () => "dev-token:" + cleanEmail,
    };
    localStorage.setItem("dev_auth_user", JSON.stringify(devUser));
    auth.currentUser = devUser;
    setUser(devUser);
    await checkAdminStatus(devUser);
    return devUser;
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    localStorage.removeItem("dev_auth_user");
    if (!isFirebaseConfigured) {
      auth.currentUser = null;
    }
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        isFirebaseConfigured,
        signup,
        login,
        logout,
        refreshAdmin: () => checkAdminStatus(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
