const express = require("express")
const WasteListing = require("../models/WasteListing")
const Request = require("../models/Request")
const Review = require("../models/Review")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user dashboard stats
router.get("/stats", auth, async (req, res) => {
  try {
    const userId = req.user._id
    const userRole = req.user.role

    let stats = {}

    if (userRole === "farmer") {
      // Farmer stats
      const totalListings = await WasteListing.countDocuments({ farmer: userId })
      const activeListings = await WasteListing.countDocuments({ farmer: userId, status: "available" })
      const totalRevenue = req.user.totalRevenue || 0
      const totalWasteProcessed = req.user.totalWasteProcessed || 0
      const co2Saved = Math.round(totalWasteProcessed * 2.3) // Estimate: 2.3kg CO2 saved per kg waste processed

      stats = {
        totalListings,
        activeListings,
        totalRevenue,
        totalWasteProcessed,
        co2Saved,
        rating: req.user.rating || 0,
        totalRatings: req.user.totalRatings || 0,
        totalTransactions: req.user.totalTransactions || 0,
      }
    } else if (userRole === "buyer") {
      // Buyer stats
      const totalRequests = await Request.countDocuments({ buyer: userId })
      const completedTransactions = await Request.countDocuments({ buyer: userId, status: "completed" })
      const totalMaterialsAcquired = completedTransactions // Simplified
      const co2Saved = Math.round(totalMaterialsAcquired * 2.3)

      stats = {
        totalRequests,
        completedTransactions,
        totalMaterialsAcquired,
        co2Saved,
        rating: req.user.rating || 0,
        totalRatings: req.user.totalRatings || 0,
        totalTransactions: req.user.totalTransactions || 0,
      }
    }

    res.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get user activity
router.get("/activity", auth, async (req, res) => {
  try {
    const userId = req.user._id
    const userRole = req.user.role

    let activity = []

    if (userRole === "farmer") {
      // Get recent requests for farmer's listings
      const requests = await Request.find({ farmer: userId })
        .populate("buyer", "name")
        .populate("wasteListing", "title")
        .sort({ createdAt: -1 })
        .limit(10)

      activity = requests.map((request) => ({
        type: "request",
        status: request.status,
        message: `${request.buyer.name} requested "${request.wasteListing.title}"`,
        date: request.createdAt,
      }))
    } else if (userRole === "buyer") {
      // Get buyer's requests
      const requests = await Request.find({ buyer: userId })
        .populate("farmer", "name")
        .populate("wasteListing", "title")
        .sort({ createdAt: -1 })
        .limit(10)

      activity = requests.map((request) => ({
        type: "request",
        status: request.status,
        message: `You requested "${request.wasteListing.title}" from ${request.farmer.name}`,
        date: request.createdAt,
      }))
    }

    res.json(activity)
  } catch (error) {
    console.error("Error fetching activity:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get farmer's listings
router.get("/my-listings", auth, async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({ message: "Only farmers can access this endpoint" })
    }

    const listings = await WasteListing.find({ farmer: req.user._id }).sort({ createdAt: -1 })

    res.json(listings)
  } catch (error) {
    console.error("Error fetching farmer listings:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
