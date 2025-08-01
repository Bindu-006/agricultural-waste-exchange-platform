const express = require("express")
const path = require("path")
const fs = require("fs")
const { spawn } = require("child_process")

console.log("🔧 URL Access Troubleshooter")
console.log("=".repeat(50))

// Check if you're in the right directory
const currentDir = process.cwd()
console.log("📁 Current directory:", currentDir)

// Check if server.js exists
if (!fs.existsSync("server.js")) {
  console.log("❌ server.js not found!")
  console.log("💡 Make sure you're in the project root directory")
  process.exit(1)
}

// Check if package.json exists
if (!fs.existsSync("package.json")) {
  console.log("❌ package.json not found!")
  console.log("💡 Make sure you're in the project root directory")
  process.exit(1)
}

console.log("✅ Project files found")

// Create a simple test server to verify everything works
const app = express()
const PORT = 3000

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")))

// Test routes
app.get("/test", (req, res) => {
  res.json({
    message: "✅ Server is working correctly!",
    timestamp: new Date().toISOString(),
    url: `http://localhost:${PORT}`,
  })
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "main.html"))
})

app.get("/listings", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "listings.html"))
})

// Start test server
const server = app.listen(PORT, () => {
  console.log("\n🚀 Test server started successfully!")
  console.log("=".repeat(50))
  console.log("✅ CORRECT URLs to use:")
  console.log(`🏠 Home: http://localhost:${PORT}/`)
  console.log(`📋 Listings: http://localhost:${PORT}/listings`)
  console.log(`🔐 Login: http://localhost:${PORT}/login`)
  console.log(`📝 Register: http://localhost:${PORT}/register`)
  console.log(`🏡 Main (after login): http://localhost:${PORT}/main`)
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`)
  console.log("=".repeat(50))
  console.log("❌ WRONG URLs (DO NOT USE):")
  console.log("❌ page.in")
  console.log("❌ listings.it")
  console.log("❌ Any domain ending in .in or .it")
  console.log("=".repeat(50))
  console.log("💡 IMPORTANT:")
  console.log("1. ALWAYS use 'localhost:3000' in your browser")
  console.log("2. NEVER use external domains like 'page.in'")
  console.log("3. Make sure this server is running")
  console.log("4. Check your browser's address bar carefully")
  console.log("=".repeat(50))

  // Keep server running for 30 seconds for testing
  setTimeout(() => {
    console.log("\n🛑 Test server shutting down...")
    console.log("💡 If everything worked, run: npm start")
    server.close()
    process.exit(0)
  }, 30000)
})

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`❌ Port ${PORT} is already in use!`)
    console.log("💡 This might mean your main server is already running")
    console.log("💡 Check: http://localhost:3000")
  } else {
    console.log("❌ Server error:", err.message)
  }
  process.exit(1)
})
