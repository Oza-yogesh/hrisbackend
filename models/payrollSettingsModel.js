const mongoose = require("mongoose");

const payrollSettingsSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  payCycle: { type: String },
  hasPF: { type: Boolean },
  employeeContributionPF: { type: Number },
  basicSalaryPercentage: { type: Number },
  pfCeiling: { type: Number },
  hasESI: { type: Boolean },
  deductProfessionalTax: { type: Boolean },
  payPeriodStart: { type: Number },
  payPeriodEnd: { type: Number },
});

module.exports = mongoose.model("PayrollSettings", payrollSettingsSchema);
