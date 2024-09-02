// companyModel.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  registeredCompanyName: { type: String, required: true },
  companyOfficialEmail: { type: String, required: true },
  brandName: { type: String },
  companyOfficialContact: { type: String },
  website: { type: String },
  domainName: { type: String },
  industryType: { type: String },
  registeredOffice: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
  },
  entityType: { type: String },
  logoUrl: { type: String },
  dateOfIncorporation: { type: Date },
  companyPAN: { type: String },
  CIN: { type: String },
  companyTAN: { type: String },
  GST: { type: String },
});

module.exports = mongoose.model("Company", companySchema);
