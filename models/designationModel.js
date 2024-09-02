const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  designationTitle: { type: String },
});

module.exports = mongoose.model("Designation", designationSchema);
