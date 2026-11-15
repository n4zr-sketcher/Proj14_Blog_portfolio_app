// Friendly messages for Firebase Authentication error codes
const messages = {
  "auth/email-already-in-use": "This email is already registered. Try logging in.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password is too weak. Use at least 6 characters.",
  "auth/missing-password": "Please enter your password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/too-many-requests": "Too many attempts. Please wait a bit and try again.",
  "auth/network-request-failed": "Network error. Check your internet connection.",
  "auth/user-disabled": "This account has been disabled.",
};

export const getAuthMessage = (err) => {
  console.error("Firebase auth error:", err?.code, err?.message);
  return messages[err?.code] || `Something went wrong (${err?.code || err?.message || "unknown"})`;
};