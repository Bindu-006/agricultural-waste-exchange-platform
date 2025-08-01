const mongoose = require("mongoose")
const WasteListing = require("../models/WasteListing")
const User = require("../models/User")

async function testListings() {
  try {
    console.log("🔍 Testing listings functionality...")

    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/wasteexchange", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("✅ Connected to database")

    // Check if we have users
    const userCount = await User.countDocuments()
    console.log(`👥 Total users in database: ${userCount}`)

    // Check if we have listings
    const listingCount = await WasteListing.countDocuments()
    console.log(`📋 Total listings in database: ${listingCount}`)

    // Get all listings with farmer info
    const listings = await WasteListing.find().populate("farmer", "name location rating")
    console.log(`📋 Listings with farmer info: ${listings.length}`)

    if (listings.length > 0) {
      console.log("\n📋 Sample listings:")
      listings.slice(0, 3).forEach((listing, index) => {
        console.log(`${index + 1}. ${listing.title}`)
        console.log(`   Type: ${listing.type}`)
        console.log(`   Farmer: ${listing.farmer?.name || "Unknown"}`)
        console.log(`   Location: ${listing.location}`)
        console.log(`   Price: $${listing.price} ${listing.priceUnit}`)
        console.log(`   Status: ${listing.status}`)
        console.log(`   Expiry: ${listing.expiry}`)
        console.log("")
      })
    } else {
      console.log("❌ No listings found! Run the seed script first.")
    }

    // Test API query simulation
    console.log("🔍 Testing API query simulation...")
    const query = { status: "available", expiry: { $gt: new Date() } }
    const apiListings = await WasteListing.find(query).populate("farmer", "name location rating")
    console.log(`📋 Available listings (API simulation): ${apiListings.length}`)

    if (apiListings.length === 0) {
      console.log("❌ No available listings found!")
      console.log("💡 This might be why the listings page is empty.")

      // Check expired listings
      const expiredListings = await WasteListing.find({ expiry: { $lte: new Date() } })
      console.log(`⏰ Expired listings: ${expiredListings.length}`)

      if (expiredListings.length > 0) {
        console.log("💡 All listings might be expired. Updating expiry dates...")

        // Update expiry dates to future dates
        const futureDate = new Date()
        futureDate.setDate(futureDate.getDate() + 30) // 30 days from now

        await WasteListing.updateMany({}, { $set: { expiry: futureDate, status: "available" } })

        console.log("✅ Updated all listings with future expiry dates")

        // Test again
        const updatedListings = await WasteListing.find(query).populate("farmer", "name location rating")
        console.log(`📋 Available listings after update: ${updatedListings.length}`)
      }
    }
  } catch (error) {
    console.error("❌ Error testing listings:", error)
  } finally {
    mongoose.connection.close()
    console.log("🔌 Database connection closed")
  }
}

// Run the test
testListings()
