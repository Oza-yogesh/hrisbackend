const mongoose = require("mongoose");

// Address Schema
const addressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true, match: /^\d{6}$/ }, // Validates 6-digit pincode
});

module.exports = mongoose.model("Address", addressSchema);
