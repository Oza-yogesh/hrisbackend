const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, required: true },
    clockInTime: { type: Date },
    clockOutTime: { type: Date },
    totalHours: { type: Number },
    status: {
      type: String,
      enum: ["Full Day", "Half Day", "Absent"],
      default: "Absent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
