const mongoose = require("mongoose")

const wasteListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["rice_husk", "animal_manure", "fruit_peels", "vegetable_waste", "crop_residue", "other"],
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceUnit: {
    type: String,
    enum: ["per_kg", "per_ton", "per_unit"],
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  expiry: {
    type: Date,
    required: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "sold", "expired"],
    default: "available",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("WasteListing", wasteListingSchema)
