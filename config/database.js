const mongoose = require("mongoose")

// Database configuration
const DATABASE_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/agricultural-waste-platform"

async function connectDatabase() {
  try {
    console.log("🔄 Connecting to MongoDB...")
    console.log("📍 Database URL:", DATABASE_URL.replace(/\/\/.*@/, "//***:***@")) // Hide credentials in logs

    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("✅ MongoDB connected successfully!")
    console.log("📊 Database:", mongoose.connection.name)

    // Test the connection
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(
      "📁 Available collections:",
      collections.map((c) => c.name),
    )
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message)
    console.error("💡 Troubleshooting tips:")
    console.error("   1. Make sure MongoDB is running")
    console.error("   2. Install MongoDB from: https://www.mongodb.com/try/download/community")
    console.error("   3. Start MongoDB service:")
    console.error("      Windows: net start MongoDB")
    console.error("      macOS: brew services start mongodb-community")
    console.error("      Linux: sudo systemctl start mongod")
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
  console.error("🔴 Mongoose connection error:", err)
})

mongoose.connection.on("disconnected", () => {
  console.log("🟡 Mongoose disconnected from MongoDB")
})

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close()
  console.log("🛑 MongoDB connection closed through app termination")
  process.exit(0)
})

module.exports = { connectDatabase, DATABASE_URL }
