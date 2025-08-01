const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// Import models
const User = require("../models/User")
const WasteListing = require("../models/WasteListing")

const DATABASE_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/agricultural-waste-platform"

async function seedDatabaseWithDebug() {
  try {
    console.log("🌱 Starting database seeding with debug info...")
    console.log("=".repeat(60))

    // Connect to database with debug info
    console.log("🔄 Connecting to MongoDB...")
    console.log("📍 Database URL:", DATABASE_URL)

    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("✅ MongoDB connected successfully!")
    console.log("📊 Database name:", mongoose.connection.name)
    console.log("🏠 Host:", mongoose.connection.host)
    console.log("🔌 Port:", mongoose.connection.port)

    // Check existing data
    console.log("\n🔍 Checking existing data...")
    const existingUsers = await User.countDocuments()
    const existingListings = await WasteListing.countDocuments()
    console.log(`👥 Existing users: ${existingUsers}`)
    console.log(`📋 Existing listings: ${existingListings}`)

    if (existingUsers > 0 || existingListings > 0) {
      console.log("\n⚠️  Database already has data!")
      console.log("🗑️  Clearing existing data...")
      await User.deleteMany({})
      await WasteListing.deleteMany({})
      console.log("✅ Existing data cleared")
    }

    // Create sample farmers
    console.log("\n👨‍🌾 Creating farmer accounts...")
    const farmers = [
      {
        name: "John Smith",
        email: "john.farmer@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "farmer",
        phone: "+1-555-0101",
        location: "Iowa, USA",
        rating: 4.5,
        totalRatings: 12,
        totalTransactions: 15,
        totalWasteProcessed: 25,
        totalRevenue: 3500,
      },
      {
        name: "Maria Garcia",
        email: "maria.farmer@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "farmer",
        phone: "+1-555-0102",
        location: "California, USA",
        rating: 4.8,
        totalRatings: 20,
        totalTransactions: 28,
        totalWasteProcessed: 45,
        totalRevenue: 6200,
      },
      {
        name: "David Johnson",
        email: "david.farmer@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "farmer",
        phone: "+1-555-0103",
        location: "Texas, USA",
        rating: 4.2,
        totalRatings: 8,
        totalTransactions: 10,
        totalWasteProcessed: 18,
        totalRevenue: 2800,
      },
    ]

    // Create sample buyers
    console.log("🏢 Creating buyer accounts...")
    const buyers = [
      {
        name: "Green Energy Corp",
        email: "contact@greenenergy.com",
        password: await bcrypt.hash("password123", 10),
        role: "buyer",
        phone: "+1-555-0201",
        location: "Illinois, USA",
        rating: 4.3,
        totalRatings: 18,
        totalTransactions: 25,
      },
      {
        name: "EcoFuel Industries",
        email: "procurement@ecofuel.com",
        password: await bcrypt.hash("password123", 10),
        role: "buyer",
        phone: "+1-555-0202",
        location: "Ohio, USA",
        rating: 4.7,
        totalRatings: 22,
        totalTransactions: 30,
      },
    ]

    // Insert farmers and buyers
    console.log("💾 Inserting users into database...")
    const createdFarmers = await User.insertMany(farmers)
    const createdBuyers = await User.insertMany(buyers)

    console.log(`✅ Created ${createdFarmers.length} farmers`)
    console.log(`✅ Created ${createdBuyers.length} buyers`)

    // Verify users were created
    const totalUsers = await User.countDocuments()
    console.log(`📊 Total users in database: ${totalUsers}`)

    // Create sample waste listings
    console.log("\n📋 Creating waste listings...")
    const wasteListings = [
      {
        farmer: createdFarmers[0]._id,
        title: "Fresh Rice Husks - Premium Quality",
        type: "rice_husk",
        quantity: "500 kg",
        location: "Des Moines, Iowa",
        coordinates: { lat: 41.5868, lng: -93.625 },
        price: 25,
        priceUnit: "per_ton",
        description:
          "High-quality rice husks from organic farming. Perfect for biofuel production or building materials. Stored in dry conditions, harvested last week.",
        expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: "available",
      },
      {
        farmer: createdFarmers[0]._id,
        title: "Corn Stalks and Leaves",
        type: "crop_residue",
        quantity: "2 tons",
        location: "Des Moines, Iowa",
        coordinates: { lat: 41.5868, lng: -93.625 },
        price: 15,
        priceUnit: "per_ton",
        description:
          "Fresh corn crop residue from this season's harvest. Excellent for composting, animal bedding, or biomass fuel production.",
        expiry: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        status: "available",
      },
      {
        farmer: createdFarmers[1]._id,
        title: "Organic Fruit Peels Mix",
        type: "fruit_peels",
        quantity: "150 kg",
        location: "Fresno, California",
        coordinates: { lat: 36.7378, lng: -119.7871 },
        price: 0,
        priceUnit: "free",
        description:
          "Mixed fruit peels from orange, apple, and grape processing. Great for composting or animal feed supplement. Must be collected within 5 days.",
        expiry: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "available",
      },
      {
        farmer: createdFarmers[1]._id,
        title: "Premium Cow Manure - Aged",
        type: "animal_manure",
        quantity: "1 ton",
        location: "Fresno, California",
        coordinates: { lat: 36.7378, lng: -119.7871 },
        price: 40,
        priceUnit: "per_ton",
        description:
          "Well-aged cow manure, perfect for organic fertilizer production or biogas generation. Composted for 6 months, ready for use.",
        expiry: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        status: "available",
      },
      {
        farmer: createdFarmers[2]._id,
        title: "Wheat Straw Bales",
        type: "crop_residue",
        quantity: "50 bales",
        location: "Austin, Texas",
        coordinates: { lat: 30.2672, lng: -97.7431 },
        price: 8,
        priceUnit: "per_unit",
        description:
          "Clean wheat straw bales, ideal for mushroom cultivation, animal bedding, or construction material. Each bale weighs approximately 20kg.",
        expiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        status: "available",
      },
      {
        farmer: createdFarmers[2]._id,
        title: "Mixed Vegetable Waste",
        type: "vegetable_waste",
        quantity: "300 kg",
        location: "Austin, Texas",
        coordinates: { lat: 30.2672, lng: -97.7431 },
        price: 5,
        priceUnit: "per_ton",
        description:
          "Fresh vegetable waste from local market. Includes potato peels, carrot tops, lettuce leaves. Perfect for composting or biogas production.",
        expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "available",
      },
    ]

    console.log("💾 Inserting waste listings into database...")
    const createdListings = await WasteListing.insertMany(wasteListings)
    console.log(`✅ Created ${createdListings.length} waste listings`)

    // Verify listings were created
    const totalListings = await WasteListing.countDocuments()
    console.log(`📊 Total listings in database: ${totalListings}`)

    // Final verification
    console.log("\n🔍 Final database verification...")
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log("📋 Collections created:")
    for (const collection of collections) {
      const count = await mongoose.connection.db.collection(collection.name).countDocuments()
      console.log(`   - ${collection.name}: ${count} documents`)
    }

    console.log("\n🎉 Database seeding completed successfully!")
    console.log("=".repeat(60))
    console.log("📧 Sample Login Credentials:")
    console.log("\n👨‍🌾 FARMERS:")
    console.log("Email: john.farmer@example.com | Password: password123")
    console.log("Email: maria.farmer@example.com | Password: password123")
    console.log("Email: david.farmer@example.com | Password: password123")
    console.log("\n🏢 BUYERS:")
    console.log("Email: contact@greenenergy.com | Password: password123")
    console.log("Email: procurement@ecofuel.com | Password: password123")

    console.log("\n🚀 Next steps:")
    console.log("1. Run: npm start")
    console.log("2. Visit: http://localhost:3000")
    console.log("3. Login with any of the above credentials")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    console.error("Stack trace:", error.stack)
  } finally {
    await mongoose.connection.close()
    console.log("\n🔌 Database connection closed")
    process.exit(0)
  }
}

// Run the seed function
seedDatabaseWithDebug()
