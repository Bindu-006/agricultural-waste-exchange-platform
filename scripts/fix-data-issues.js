const mongoose = require("mongoose")
const WasteListing = require("../models/WasteListing")

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/wasteexchange", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function fixDataIssues() {
  try {
    console.log("🔧 Fixing data issues...")

    // Fix expired listings
    const expiredListings = await WasteListing.find({
      expiry: { $lt: new Date() },
    })

    if (expiredListings.length > 0) {
      console.log(`📅 Found ${expiredListings.length} expired listings, updating expiry dates...`)

      for (const listing of expiredListings) {
        listing.expiry = new Date(Date.now() + (Math.floor(Math.random() * 30) + 15) * 24 * 60 * 60 * 1000)
        await listing.save()
      }

      console.log("✅ Updated expiry dates for expired listings")
    }

    // Ensure featured listings exist
    const featuredCount = await WasteListing.countDocuments({ featured: true })
    if (featuredCount === 0) {
      console.log("⭐ No featured listings found, marking first 6 as featured...")

      const listings = await WasteListing.find({ status: "available" }).limit(6)
      for (const listing of listings) {
        listing.featured = true
        await listing.save()
      }

      console.log("✅ Marked 6 listings as featured")
    }

    console.log("🎉 Data issues fixed successfully!")
  } catch (error) {
    console.error("❌ Error fixing data issues:", error)
  } finally {
    mongoose.connection.close()
  }
}

// Run the fix
fixDataIssues()
