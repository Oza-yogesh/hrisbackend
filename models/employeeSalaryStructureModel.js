const mongoose = require("mongoose");

const employeeSalaryStructureSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  structureId: { type: mongoose.Schema.Types.ObjectId, ref: "SalaryStructure" },
  effectiveDate: { type: Date },
});

module.exports = mongoose.model(
  "EmployeeSalaryStructure",
  employeeSalaryStructureSchema
);
