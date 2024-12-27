// companyModel.js
const mongoose = require("mongoose");
const Address = require("./addressModel");

const companySchema = new mongoose.Schema({
  registeredCompanyName: { type: String, required: true },
  companyOfficialEmail: { type: String, required: true },
  brandName: { type: String },
  companyOfficialContact: { type: String },
  website: { type: String },
  domainName: { type: String },
  industryType: { type: String },

  //Company Address
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },

  entityType: { type: String },
  logoUrl: { type: String },
  dateOfIncorporation: { type: Date },
  companyPAN: { type: String },
  CIN: { type: String },
  companyTAN: { type: String },
  GST: { type: String },
});

module.exports = mongoose.model("Company", companySchema);
