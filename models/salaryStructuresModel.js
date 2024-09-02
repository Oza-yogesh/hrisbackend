const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({
  type: { type: String },
  calculationType: { type: String },
  calculationValue: { type: Number },
});

const deductionsSchema = new mongoose.Schema({
  type: { type: String },
  calculationType: { type: String },
  calculationValue: { type: Number },
});

const salaryStructureSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  name: { type: String },
  description: { type: String },
  earnings: [earningsSchema],
  deductions: [deductionsSchema],
});

module.exports = mongoose.model("SalaryStructure", salaryStructureSchema);
