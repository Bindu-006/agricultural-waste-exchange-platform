const mongoose = require("mongoose")

async function checkMongoDB() {
  console.log("🔍 Checking MongoDB Connection...")
  console.log("=".repeat(50))

  try {
    // Try to connect to MongoDB
    const DATABASE_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/agricultural-waste-platform"
    console.log("📍 Attempting to connect to:", DATABASE_URL)

    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    })

    console.log("✅ MongoDB connection successful!")
    console.log("📊 Database name:", mongoose.connection.name)
    console.log("📡 Connection state:", mongoose.connection.readyState)
    console.log("🏠 Host:", mongoose.connection.host)
    console.log("🔌 Port:", mongoose.connection.port)

    // List existing databases
    const admin = mongoose.connection.db.admin()
    const dbs = await admin.listDatabases()
    console.log("\n📁 Available databases:")
    dbs.databases.forEach((db) => {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`)
    })

    // Check if our database exists
    const ourDb = dbs.databases.find((db) => db.name === "agricultural-waste-platform")
    if (ourDb) {
      console.log("\n✅ Our database exists!")

      // List collections in our database
      const collections = await mongoose.connection.db.listCollections().toArray()
      console.log("📋 Collections in our database:")
      if (collections.length === 0) {
        console.log("   ⚠️  No collections found - database is empty")
      } else {
        for (const collection of collections) {
          const count = await mongoose.connection.db.collection(collection.name).countDocuments()
          console.log(`   - ${collection.name}: ${count} documents`)
        }
      }
    } else {
      console.log("\n⚠️  Our database doesn't exist yet")
      console.log("💡 This is normal - MongoDB creates databases when first document is inserted")
    }
  } catch (error) {
    console.error("\n❌ MongoDB connection failed!")
    console.error("Error:", error.message)

    if (error.message.includes("ECONNREFUSED")) {
      console.error("\n💡 MongoDB is not running. Please start it:")
      console.error("   Windows: net start MongoDB")
      console.error("   macOS: brew services start mongodb-community")
      console.error("   Linux: sudo systemctl start mongod")
    } else if (error.message.includes("Authentication failed")) {
      console.error("\n💡 Authentication issue. Check your MongoDB credentials.")
    } else if (error.message.includes("Server selection timed out")) {
      console.error("\n💡 MongoDB server is not responding. Check if it's running and accessible.")
    }
  } finally {
    await mongoose.connection.close()
    console.log("\n🔌 Connection closed")
    process.exit(0)
  }
}

// Run the check
checkMongoDB()
