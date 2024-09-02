const mongoose = require("mongoose");

const anomalySettingsSchema = new mongoose.Schema({
  inTime: { type: Boolean },
  inTimeGracePeriod: { type: String },
  outTime: { type: Boolean },
  outTimeGracePeriod: { type: String },
  workDuration: { type: Boolean },
  fullDay: { type: String },
  halfDay: { type: String },
  maxTotalBreakDuration: { type: String },
  maxNoOfBreaks: { type: Number },
});

const attendanceRulesSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  ruleName: { type: String },
  description: { type: String },
  shiftTimings: {
    inTime: { type: String },
    outTime: { type: String },
  },
  enableAutoDeduction: { type: Boolean },
  autoDeductionDate: { type: Date },
  enableAnomalyTracking: { type: Boolean },
  anomalySettings: anomalySettingsSchema,
  autoClockOut: { type: Boolean },
  approvalOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});

module.exports = mongoose.model("AttendanceRule", attendanceRulesSchema);
