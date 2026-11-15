const { spawn } = require("child_process");
const path = require("path");

console.log("=================================================");
console.log("   🚀 Launching Blog Portfolio Application       ");
console.log("   MERN Stack + Tailwind CSS + Firebase Auth     ");
console.log("=================================================\n");

// Start backend
console.log("[Launcher] Starting Backend Server (Port 5000)...");
const backend = spawn("node", ["backend/index.js"], {
  stdio: "inherit",
  shell: true,
  cwd: __dirname,
});

backend.on("error", (err) => {
  console.error("[Launcher] Failed to start backend:", err);
});

// Start frontend
console.log("[Launcher] Starting Frontend React Server (Port 3000)...");
const frontend = spawn("npm", ["start"], {
  stdio: "inherit",
  shell: true,
  cwd: path.join(__dirname, "frontend"),
});

frontend.on("error", (err) => {
  console.error("[Launcher] Failed to start frontend:", err);
});

process.on("SIGINT", () => {
  console.log("\n[Launcher] Shutting down servers...");
  backend.kill();
  frontend.kill();
  process.exit(0);
});
