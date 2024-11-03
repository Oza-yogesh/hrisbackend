const express = require("express");
const router = express.Router();
const employeeRouter = require("../routes/employeeRoutes");
const companyRouter = require("../routes/companyRoutes");
const companySalaryRouter = require("../routes/companySalaryStructureRoutes");
const processPayrollRoutes = require("../routes/processPayrollRoutes");
const payrollSettingsRoutes = require("../routes/payrollSettingsRoutes");
const attendanceRoutes = require("../routes/attendanceRoutes");

//yogesh
router.use("/employee", employeeRouter);
router.use("/company", companyRouter);
// suraj
router.use("/companySalary", companySalaryRouter);
router.use("/processPayroll", processPayrollRoutes);
router.use("/setupPayroll", payrollSettingsRoutes);
router.use("/attendance", attendanceRoutes);

module.exports = router;
