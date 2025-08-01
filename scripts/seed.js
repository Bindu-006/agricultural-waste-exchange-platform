const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const WasteListing = require("../models/WasteListing")
const Request = require("../models/Request")
const Review = require("../models/Review")

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/wasteexchange", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Clear existing data
    await User.deleteMany({})
    await WasteListing.deleteMany({})
    await Request.deleteMany({})
    await Review.deleteMany({})

    console.log("🗑️  Cleared existing data")

    // Create sample users with realistic data
    const hashedPassword = await bcrypt.hash("password123", 10)

    const users = await User.insertMany([
      {
        name: "John Farmer",
        email: "john.farmer@example.com",
        password: hashedPassword,
        role: "farmer",
        location: "Punjab, India",
        phone: "+91-9876543210",
        rating: 4.8,
        totalRatings: 24,
        totalTransactions: 18,
        totalWasteProcessed: 2500,
        totalRevenue: 15750,
        profileImage: "/placeholder.svg?height=100&width=100",
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
      },
      {
        name: "Green Energy Corp",
        email: "contact@greenenergy.com",
        password: hashedPassword,
        role: "buyer",
        location: "Mumbai, India",
        phone: "+91-9876543211",
        rating: 4.6,
        totalRatings: 31,
        totalTransactions: 22,
        totalWasteProcessed: 3200,
        totalRevenue: 0, // Buyers don't have revenue
        profileImage: "/placeholder.svg?height=100&width=100",
        createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000), // 5 months ago
      },
      {
        name: "Maria Santos",
        email: "maria.santos@example.com",
        password: hashedPassword,
        role: "farmer",
        location: "Haryana, India",
        phone: "+91-9876543212",
        rating: 4.9,
        totalRatings: 19,
        totalTransactions: 15,
        totalWasteProcessed: 1800,
        totalRevenue: 12400,
        profileImage: "/placeholder.svg?height=100&width=100",
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 4 months ago
      },
      {
        name: "EcoFuel Industries",
        email: "info@ecofuel.com",
        password: hashedPassword,
        role: "buyer",
        location: "Delhi, India",
        phone: "+91-9876543213",
        rating: 4.7,
        totalRatings: 28,
        totalTransactions: 25,
        totalWasteProcessed: 4100,
        totalRevenue: 0,
        profileImage: "/placeholder.svg?height=100&width=100",
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
      },
      {
        name: "Raj Patel",
        email: "raj.patel@example.com",
        password: hashedPassword,
        role: "farmer",
        location: "Gujarat, India",
        phone: "+91-9876543214",
        rating: 4.5,
        totalRatings: 16,
        totalTransactions: 12,
        totalWasteProcessed: 1200,
        totalRevenue: 8900,
        profileImage: "/placeholder.svg?height=100&width=100",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
      },
      {
        name: "BioCompost Solutions",
        email: "info@biocompost.com",
        password: hashedPassword,
        role: "buyer",
        location: "Bangalore, India",
        phone: "+91-9876543215",
        rating: 4.4,
        totalRatings: 22,
        totalTransactions: 19,
        totalWasteProcessed: 2800,
        totalRevenue: 0,
        profileImage: "/placeholder.svg?height=100&width=100",
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 1.5 months ago
      },
      {
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        password: hashedPassword,
        role: "farmer",
        location: "Rajasthan, India",
        phone: "+91-9876543216",
        rating: 4.7,
        totalRatings: 13,
        totalTransactions: 9,
        totalWasteProcessed: 950,
        totalRevenue: 6800,
        profileImage: "/placeholder.svg?height=100&width=100",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
      },
      {
        name: "Organic Fertilizers Ltd",
        email: "sales@organicfert.com",
        password: hashedPassword,
        role: "buyer",
        location: "Chennai, India",
        phone: "+91-9876543217",
        rating: 4.8,
        totalRatings: 35,
        totalTransactions: 28,
        totalWasteProcessed: 3800,
        totalRevenue: 0,
        profileImage: "/placeholder.svg?height=100&width=100",
        createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000), // 2.5 months ago
      },
    ])

    console.log("👥 Created sample users with realistic data")

    // Create sample waste listings with more variety
    const farmers = users.filter((user) => user.role === "farmer")
    const listings = []

    const wasteTypes = [
      {
        type: "rice_husk",
        title: "Premium Rice Husk - Organic",
        description:
          "High-quality rice husk from organic farming. Perfect for biofuel production, building materials, and soil amendment. Freshly processed and ready for immediate use.",
        quantity: "500 kg",
        price: 25,
        priceUnit: "per_kg",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "animal_manure",
        title: "Fresh Cow Manure - Grade A",
        description:
          "Premium cow manure from grass-fed cattle. Excellent for organic farming, biogas production, and soil conditioning. Rich in nutrients and properly composted.",
        quantity: "2 tons",
        price: 150,
        priceUnit: "per_ton",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "fruit_peels",
        title: "Mixed Citrus Peels",
        description:
          "Fresh citrus fruit peels from local processing. Great for natural dye production, pectin extraction, and composting. High in essential oils.",
        quantity: "300 kg",
        price: 18,
        priceUnit: "per_kg",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "vegetable_waste",
        title: "Vegetable Processing Waste",
        description:
          "Daily vegetable waste from farm processing operations. Ideal for composting, animal feed, and biogas production. Fresh and uncontaminated.",
        quantity: "800 kg",
        price: 12,
        priceUnit: "per_kg",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "crop_residue",
        title: "Wheat Straw Bales - Premium",
        description:
          "Clean wheat straw bales from recent harvest. Perfect for mushroom cultivation, biomass fuel, and animal bedding. Properly dried and baled.",
        quantity: "50 bales",
        price: 45,
        priceUnit: "per_unit",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "other",
        title: "Coconut Coir Fiber",
        description:
          "Natural coconut fiber waste from processing. Excellent for soil amendment, growing medium, and erosion control. Sustainable and eco-friendly.",
        quantity: "1.2 tons",
        price: 80,
        priceUnit: "per_ton",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "rice_husk",
        title: "Rice Husk - Bulk Supply",
        description:
          "Large quantity rice husk available for industrial use. Suitable for power generation, construction materials, and large-scale composting.",
        quantity: "10 tons",
        price: 20,
        priceUnit: "per_ton",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "animal_manure",
        title: "Poultry Manure - Dried",
        description:
          "High-quality dried poultry manure. Rich in nitrogen and phosphorus. Perfect for organic farming and soil enrichment programs.",
        quantity: "1.5 tons",
        price: 200,
        priceUnit: "per_ton",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "fruit_peels",
        title: "Banana Peels - Fresh",
        description:
          "Fresh banana peels from fruit processing unit. High in potassium and organic matter. Great for composting and natural fertilizer production.",
        quantity: "400 kg",
        price: 15,
        priceUnit: "per_kg",
        photo: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "crop_residue",
        title: "Sugarcane Bagasse",
        description:
          "Fresh sugarcane bagasse from sugar mill. Excellent for paper production, biofuel, and building materials. High fiber content.",
        quantity: "5 tons",
        price: 35,
        priceUnit: "per_ton",
        photo: "/placeholder.svg?height=300&width=400",
      },
    ]

    // Create listings for each farmer
    for (let i = 0; i < wasteTypes.length; i++) {
      const waste = wasteTypes[i]
      const farmer = farmers[i % farmers.length]

      listings.push({
        title: waste.title,
        description: waste.description,
        type: waste.type,
        quantity: waste.quantity,
        location: farmer.location,
        price: waste.price,
        priceUnit: waste.priceUnit,
        photo: waste.photo,
        expiry: new Date(Date.now() + (Math.floor(Math.random() * 30) + 15) * 24 * 60 * 60 * 1000), // 15-45 days from now
        farmer: farmer._id,
        status: "available",
        featured: i < 6, // First 6 listings are featured
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000), // Within last 2 weeks
      })
    }

    const createdListings = await WasteListing.insertMany(listings)
    console.log("📋 Created sample waste listings with photos and details")

    // Create sample requests with realistic data
    const buyers = users.filter((user) => user.role === "buyer")
    const requests = []

    const requestStatuses = ["pending", "accepted", "rejected", "completed"]
    const requestMessages = [
      "I'm interested in purchasing your agricultural waste. Can we discuss pricing and delivery terms?",
      "This looks perfect for our biogas production facility. When can we arrange pickup?",
      "We need this material for our composting operation. Is the quantity negotiable?",
      "Excellent quality waste! We'd like to establish a long-term supply agreement.",
      "Can you provide more details about the processing and storage conditions?",
      "We're looking for regular supply of this material. What are your bulk pricing options?",
    ]

    for (let i = 0; i < 15; i++) {
      const listing = createdListings[i % createdListings.length]
      const buyer = buyers[i % buyers.length]

      requests.push({
        wasteListing: listing._id,
        buyer: buyer._id,
        farmer: listing.farmer,
        desiredQuantity: `${Math.floor(Math.random() * 200) + 50} kg`,
        message: requestMessages[Math.floor(Math.random() * requestMessages.length)],
        status: requestStatuses[Math.floor(Math.random() * requestStatuses.length)],
        price: listing.price * (Math.floor(Math.random() * 100) + 50), // Random quantity * price
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
      })
    }

    const createdRequests = await Request.insertMany(requests)
    console.log("📨 Created sample requests with realistic data")

    // Create sample reviews
    const completedRequests = createdRequests.filter((req) => req.status === "completed")
    const reviews = []

    const positiveComments = [
      "Excellent quality waste material. Very professional farmer with great communication!",
      "Outstanding service and timely delivery. The material was exactly as described. Highly recommended!",
      "Perfect condition and fair pricing. This farmer really knows their business. Will work with again!",
      "Great experience from start to finish. Professional, reliable, and high-quality products.",
      "Fantastic supplier! Quick response, fair prices, and excellent material quality.",
      "Very satisfied with the transaction. Professional handling and great communication throughout.",
    ]

    const buyerComments = [
      "Prompt payment and easy to work with. Great buyer who respects agreements!",
      "Professional and respectful throughout the process. Made the transaction very smooth.",
      "Quick to respond and fair in negotiations. Highly recommended buyer!",
      "Reliable buyer with clear communication. Payment was processed quickly. Excellent experience!",
      "Great to work with! Professional approach and timely payments. Would recommend to other farmers.",
      "Smooth transaction with clear expectations. This buyer is trustworthy and professional.",
    ]

    for (const request of completedRequests) {
      // Review from buyer to farmer
      reviews.push({
        request: request._id,
        reviewer: request.buyer,
        reviewee: request.farmer,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        comment: positiveComments[Math.floor(Math.random() * positiveComments.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000),
      })

      // Review from farmer to buyer
      reviews.push({
        request: request._id,
        reviewer: request.farmer,
        reviewee: request.buyer,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        comment: buyerComments[Math.floor(Math.random() * buyerComments.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000),
      })
    }

    await Review.insertMany(reviews)
    console.log("⭐ Created sample reviews with realistic feedback")

    console.log("\n🎉 Database seeding completed successfully!")
    console.log("\n📊 SAMPLE DATA SUMMARY:")
    console.log("================================")
    console.log(`👥 Users created: ${users.length}`)
    console.log(`📋 Listings created: ${createdListings.length}`)
    console.log(`📨 Requests created: ${createdRequests.length}`)
    console.log(`⭐ Reviews created: ${reviews.length}`)
    console.log("\n📋 Sample Login Credentials:")
    console.log("================================")
    console.log("👨‍🌾 FARMER ACCOUNTS:")
    console.log("Email: john.farmer@example.com | Password: password123")
    console.log("Stats: 18 transactions, $15,750 revenue, 2,500kg waste processed")
    console.log("")
    console.log("Email: maria.santos@example.com | Password: password123")
    console.log("Stats: 15 transactions, $12,400 revenue, 1,800kg waste processed")
    console.log("")
    console.log("Email: raj.patel@example.com | Password: password123")
    console.log("Stats: 12 transactions, $8,900 revenue, 1,200kg waste processed")
    console.log("")
    console.log("Email: priya.sharma@example.com | Password: password123")
    console.log("Stats: 9 transactions, $6,800 revenue, 950kg waste processed")
    console.log("")
    console.log("🏢 BUYER ACCOUNTS:")
    console.log("Email: contact@greenenergy.com | Password: password123")
    console.log("Stats: 22 transactions, 3,200kg materials acquired")
    console.log("")
    console.log("Email: info@ecofuel.com | Password: password123")
    console.log("Stats: 25 transactions, 4,100kg materials acquired")
    console.log("")
    console.log("Email: info@biocompost.com | Password: password123")
    console.log("Stats: 19 transactions, 2,800kg materials acquired")
    console.log("")
    console.log("Email: sales@organicfert.com | Password: password123")
    console.log("Stats: 28 transactions, 3,800kg materials acquired")
    console.log("================================")
    console.log("\n✅ All users now have realistic data and statistics!")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    mongoose.connection.close()
  }
}

// Run the seeding
seedDatabase()
