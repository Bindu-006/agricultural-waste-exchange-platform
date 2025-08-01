const fs = require("fs")
const path = require("path")

console.log("🔧 Setting up Agricultural Waste Exchange Platform...")

// Create necessary directories
const directories = ["config", "middleware", "models", "routes", "public", "scripts", "uploads"]

directories.forEach((dir) => {
  const dirPath = path.join(__dirname, "..", dir)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
})

console.log("🎉 Setup complete!")
console.log("📋 Next steps:")
console.log("1. Make sure MongoDB is installed and running")
console.log("2. Run: npm run seed")
console.log("3. Run: npm start")
console.log("4. Visit: http://localhost:3000")
