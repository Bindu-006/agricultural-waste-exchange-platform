const mongoose = require("mongoose")
const User = require("../models/User")
const WasteListing = require("../models/WasteListing")
const Request = require("../models/Request")
const Review = require("../models/Review")

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/wasteexchange", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function testCompleteSystem() {
  try {
    console.log("🔍 Testing Complete System...")
    console.log("=".repeat(50))

    // Test 1: Check Users
    const users = await User.find({})
    console.log(`👥 Users in database: ${users.length}`)

    if (users.length > 0) {
      console.log("\n📊 User Statistics:")
      users.forEach((user) => {
        console.log(`  ${user.name} (${user.role}):`)
        console.log(`    - Transactions: ${user.totalTransactions}`)
        console.log(`    - Revenue: $${user.totalRevenue}`)
        console.log(`    - Waste Processed: ${user.totalWasteProcessed}kg`)
        console.log(`    - Rating: ${user.rating} (${user.totalRatings} reviews)`)
      })
    }

    // Test 2: Check Waste Listings
    const listings = await WasteListing.find({}).populate("farmer", "name")
    console.log(`\n📋 Waste Listings: ${listings.length}`)

    if (listings.length > 0) {
      console.log("\n📋 Sample Listings:")
      listings.slice(0, 3).forEach((listing) => {
        console.log(`  ${listing.title} by ${listing.farmer.name}`)
        console.log(`    - Type: ${listing.type}`)
        console.log(`    - Price: $${listing.price} ${listing.priceUnit}`)
        console.log(`    - Status: ${listing.status}`)
        console.log(`    - Featured: ${listing.featured}`)
      })
    }

    // Test 3: Check Requests
    const requests = await Request.find({}).populate("buyer", "name").populate("farmer", "name")
    console.log(`\n📨 Requests: ${requests.length}`)

    if (requests.length > 0) {
      const statusCounts = {}
      requests.forEach((req) => {
        statusCounts[req.status] = (statusCounts[req.status] || 0) + 1
      })
      console.log("  Status breakdown:", statusCounts)
    }

    // Test 4: Check Reviews
    const reviews = await Review.find({}).populate("reviewer", "name").populate("reviewee", "name")
    console.log(`\n⭐ Reviews: ${reviews.length}`)

    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      console.log(`  Average rating: ${avgRating.toFixed(1)} stars`)
    }

    // Test 5: Check Featured Listings
    const featuredListings = await WasteListing.find({ featured: true, status: "available" })
    console.log(`\n⭐ Featured Listings: ${featuredListings.length}`)

    // Test 6: Check Active Listings
    const activeListings = await WasteListing.find({
      status: "available",
      expiry: { $gt: new Date() },
    })
    console.log(`\n✅ Active Listings: ${activeListings.length}`)

    console.log("\n" + "=".repeat(50))
    console.log("🎯 SAMPLE LOGIN CREDENTIALS:")
    console.log("=".repeat(50))

    const farmers = users.filter((u) => u.role === "farmer")
    const buyers = users.filter((u) => u.role === "buyer")

    console.log("👨‍🌾 FARMERS:")
    farmers.forEach((farmer) => {
      console.log(`  Email: ${farmer.email}`)
      console.log(`  Password: password123`)
      console.log(`  Stats: ${farmer.totalTransactions} transactions, $${farmer.totalRevenue} revenue`)
      console.log("")
    })

    console.log("🏢 BUYERS:")
    buyers.forEach((buyer) => {
      console.log(`  Email: ${buyer.email}`)
      console.log(`  Password: password123`)
      console.log(`  Stats: ${buyer.totalTransactions} transactions, ${buyer.totalWasteProcessed}kg acquired`)
      console.log("")
    })

    console.log("=".repeat(50))
    console.log("✅ System test completed successfully!")

    if (users.length === 0) {
      console.log("⚠️  No users found. Please run 'node scripts/seed.js' first.")
    }

    if (activeListings.length === 0) {
      console.log("⚠️  No active listings found. Data may have expired.")
    }
  } catch (error) {
    console.error("❌ Error testing system:", error)
  } finally {
    mongoose.connection.close()
  }
}

// Run the test
testCompleteSystem()
