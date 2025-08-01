const { spawn } = require("child_process")
const path = require("path")
const fs = require("fs")

console.log("🌱 Starting Agricultural Waste Exchange Platform...")
console.log("📁 Project directory:", path.join(__dirname, ".."))

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "..", "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log("📂 Created uploads directory")
}

// Check if MongoDB is running
console.log("🔍 Checking MongoDB connection...")

// Start the server
const server = spawn("node", ["server.js"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
})

server.on("error", (err) => {
  console.error("❌ Failed to start server:", err)
  console.error("💡 Make sure you have Node.js installed")
  console.error("💡 Run 'npm install' first")
})

server.on("close", (code) => {
  console.log(`🛑 Server process exited with code ${code}`)
})

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...")
  server.kill("SIGINT")
})
