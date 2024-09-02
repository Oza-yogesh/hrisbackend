const mongoose = require("mongoose");

const subDepartmentSchema = new mongoose.Schema({
  subDepartmentName: { type: String },
  subDepartmentHeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const departmentSchema = new mongoose.Schema({
  // depat id 
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // field 
  departmentName: { type: String },
  departmentHeadId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  subDepartments: [subDepartmentSchema],
});

module.exports = mongoose.model("Department", departmentSchema);
