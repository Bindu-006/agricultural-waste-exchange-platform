const express = require("express")
const path = require("path")
const fs = require("fs")

console.log("🔍 Debugging Server Issues...")
console.log("=".repeat(50))

// Check if server.js exists
const serverPath = path.join(__dirname, "..", "server.js")
if (fs.existsSync(serverPath)) {
  console.log("✅ server.js found")
} else {
  console.log("❌ server.js not found!")
  process.exit(1)
}

// Check if public directory exists
const publicPath = path.join(__dirname, "..", "public")
if (fs.existsSync(publicPath)) {
  console.log("✅ public directory found")

  // List files in public directory
  const files = fs.readdirSync(publicPath)
  console.log("📁 Files in public directory:")
  files.forEach((file) => {
    console.log(`   - ${file}`)
  })
} else {
  console.log("❌ public directory not found!")
}

// Check if listings.html exists
const listingsPath = path.join(__dirname, "..", "public", "listings.html")
if (fs.existsSync(listingsPath)) {
  console.log("✅ listings.html found")
} else {
  console.log("❌ listings.html not found!")
}

// Test if we can start the server
console.log("\n🚀 Testing server startup...")

const app = express()
const PORT = process.env.PORT || 3000

// Basic middleware
app.use(express.static(path.join(__dirname, "..", "public")))

// Test route
app.get("/test", (req, res) => {
  res.json({
    message: "Server is working!",
    timestamp: new Date().toISOString(),
  })
})

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Test server started successfully!`)
  console.log(`🌐 Server running on: http://localhost:${PORT}`)
  console.log(`📋 Test URL: http://localhost:${PORT}/test`)
  console.log(`📋 Listings URL: http://localhost:${PORT}/listings.html`)
  console.log("\n💡 IMPORTANT: Use 'localhost' not 'listings.it'!")

  // Close server after 5 seconds
  setTimeout(() => {
    server.close()
    console.log("\n🛑 Test server closed")
    process.exit(0)
  }, 5000)
})

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`❌ Port ${PORT} is already in use!`)
    console.log("💡 Either:")
    console.log("   1. Stop the existing server")
    console.log("   2. Use a different port")
    console.log("   3. Check if your main server is already running")
  } else {
    console.log("❌ Server error:", err.message)
  }
  process.exit(1)
})
