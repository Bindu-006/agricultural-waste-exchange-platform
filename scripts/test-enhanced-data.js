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

async function testEnhancedData() {
  try {
    console.log("🔍 Testing Enhanced Sample Data...")
    console.log("================================")

    // Test users
    const users = await User.find({})
    console.log(`👥 Total Users: ${users.length}`)

    const farmers = users.filter((u) => u.role === "farmer")
    const buyers = users.filter((u) => u.role === "buyer")

    console.log(`👨‍🌾 Farmers: ${farmers.length}`)
    console.log(`🏢 Buyers: ${buyers.length}`)

    // Test farmer data
    console.log("\n📊 FARMER STATISTICS:")
    console.log("=====================")
    for (const farmer of farmers) {
      console.log(`${farmer.name}:`)
      console.log(`  - Rating: ${farmer.rating}/5 (${farmer.totalRatings} reviews)`)
      console.log(`  - Transactions: ${farmer.totalTransactions}`)
      console.log(`  - Revenue: $${farmer.totalRevenue}`)
      console.log(`  - Waste Processed: ${farmer.totalWasteProcessed}kg`)
      console.log(`  - Location: ${farmer.location}`)
    }

    // Test buyer data
    console.log("\n📊 BUYER STATISTICS:")
    console.log("====================")
    for (const buyer of buyers) {
      console.log(`${buyer.name}:`)
      console.log(`  - Rating: ${buyer.rating}/5 (${buyer.totalRatings} reviews)`)
      console.log(`  - Transactions: ${buyer.totalTransactions}`)
      console.log(`  - Materials Acquired: ${buyer.totalWasteProcessed}kg`)
      console.log(`  - Location: ${buyer.location}`)
    }

    // Test listings
    const listings = await WasteListing.find({}).populate("farmer", "name")
    console.log(`\n📋 Total Listings: ${listings.length}`)

    const featuredListings = listings.filter((l) => l.featured)
    console.log(`⭐ Featured Listings: ${featuredListings.length}`)

    const availableListings = listings.filter((l) => l.status === "available")
    console.log(`✅ Available Listings: ${availableListings.length}`)

    console.log("\n📋 SAMPLE LISTINGS:")
    console.log("==================")
    featuredListings.slice(0, 3).forEach((listing) => {
      console.log(`${listing.title}:`)
      console.log(`  - Type: ${listing.type.replace("_", " ")}`)
      console.log(`  - Quantity: ${listing.quantity}`)
      console.log(`  - Price: $${listing.price} ${listing.priceUnit.replace("_", " ")}`)
      console.log(`  - Farmer: ${listing.farmer.name}`)
      console.log(`  - Location: ${listing.location}`)
    })

    // Test requests
    const requests = await Request.find({}).populate("buyer farmer wasteListing", "name title")
    console.log(`\n📨 Total Requests: ${requests.length}`)

    const pendingRequests = requests.filter((r) => r.status === "pending")
    const completedRequests = requests.filter((r) => r.status === "completed")

    console.log(`⏳ Pending: ${pendingRequests.length}`)
    console.log(`✅ Completed: ${completedRequests.length}`)

    // Test reviews
    const reviews = await Review.find({}).populate("reviewer reviewee", "name")
    console.log(`\n⭐ Total Reviews: ${reviews.length}`)

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    console.log(`📊 Average Rating: ${avgRating.toFixed(1)}/5`)

    console.log("\n🎉 Enhanced data test completed successfully!")
    console.log("\n✅ VERIFICATION CHECKLIST:")
    console.log("=========================")
    console.log(`✅ Users have realistic statistics: ${users.every((u) => u.totalTransactions > 0) ? "YES" : "NO"}`)
    console.log(
      `✅ Listings have photos and details: ${listings.every((l) => l.photo && l.description) ? "YES" : "NO"}`,
    )
    console.log(`✅ Featured listings exist: ${featuredListings.length > 0 ? "YES" : "NO"}`)
    console.log(
      `✅ Requests have realistic data: ${requests.every((r) => r.message && r.desiredQuantity) ? "YES" : "NO"}`,
    )
    console.log(
      `✅ Reviews have meaningful content: ${reviews.every((r) => r.comment && r.rating >= 4) ? "YES" : "NO"}`,
    )

    console.log("\n🚀 Ready to test the website with enhanced data!")
  } catch (error) {
    console.error("❌ Error testing enhanced data:", error)
  } finally {
    mongoose.connection.close()
  }
}

// Run the test
testEnhancedData()
