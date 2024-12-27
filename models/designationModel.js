const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  designationTitle: { type: String, unique: true },
  employees: { type: Number, default: 0 },
});

module.exports = mongoose.model("Designation", designationSchema);
