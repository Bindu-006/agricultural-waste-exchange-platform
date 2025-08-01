const { spawn } = require("child_process")
const path = require("path")

console.log("🚀 Starting Agricultural Waste Exchange Platform...")
console.log("📁 Project directory:", __dirname)

// Create uploads directory if it doesn't exist
const fs = require("fs")
const uploadsDir = path.join(__dirname, "..", "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log("📂 Created uploads directory")
}

// Start the server
const server = spawn("node", ["server.js"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
})

server.on("error", (err) => {
  console.error("❌ Failed to start server:", err)
})

server.on("close", (code) => {
  console.log(`🛑 Server process exited with code ${code}`)
})

console.log("🌐 Server should be running on http://localhost:3000")
console.log("📋 Available routes:")
console.log("   • http://localhost:3000/ (Home)")
console.log("   • http://localhost:3000/login (Login)")
console.log("   • http://localhost:3000/register (Register)")
console.log("   • http://localhost:3000/dashboard (Dashboard)")
console.log("   • http://localhost:3000/listings (Browse Listings)")
console.log("   • http://localhost:3000/contact (Contact Us)")
