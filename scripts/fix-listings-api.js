const fs = require("fs")
const path = require("path")

console.log("🔧 Fixing Listings API Issues...")
console.log("=".repeat(50))

// Check if the API route exists and is working
const wasteRoutePath = path.join(__dirname, "..", "routes", "waste.js")

if (!fs.existsSync(wasteRoutePath)) {
  console.log("❌ waste.js route file not found!")
  process.exit(1)
}

console.log("✅ waste.js route file found")

// Check server.js for proper route mounting
const serverPath = path.join(__dirname, "..", "server.js")
const serverContent = fs.readFileSync(serverPath, "utf8")

if (serverContent.includes('app.use("/api/waste", wasteRoutes)')) {
  console.log("✅ Waste routes properly mounted in server.js")
} else {
  console.log("❌ Waste routes not properly mounted!")
}

// Test the database connection
const mongoose = require("mongoose")
const WasteListing = require("../models/WasteListing")

async function testAPI() {
  try {
    console.log("\n🔍 Testing database connection...")

    const DATABASE_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/agricultural-waste-platform"
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("✅ Database connected")

    // Check if we have any listings
    const count = await WasteListing.countDocuments()
    console.log(`📊 Found ${count} waste listings in database`)

    if (count === 0) {
      console.log("⚠️  No listings found! Run: npm run seed")
    } else {
      // Get a sample listing
      const sample = await WasteListing.findOne().populate("farmer", "name location")
      console.log("📋 Sample listing:")
      console.log(`   Title: ${sample.title}`)
      console.log(`   Type: ${sample.type}`)
      console.log(`   Farmer: ${sample.farmer.name}`)
      console.log(`   Location: ${sample.location}`)
    }
  } catch (error) {
    console.log("❌ Database connection failed:", error.message)
    console.log("💡 Make sure MongoDB is running and seeded")
  } finally {
    await mongoose.connection.close()
    process.exit(0)
  }
}

testAPI()
