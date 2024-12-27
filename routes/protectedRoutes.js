const express = require("express");
const router = express.Router();
const employeeRouter = require("../routes/employeeRoutes");
const companyRouter = require("../routes/companyRoutes");
const companySalaryRouter = require("../routes/companySalaryStructureRoutes");
const processPayrollRoutes = require("../routes/processPayrollRoutes");
const payrollSettingsRoutes = require("../routes/payrollSettingsRoutes");
const attendanceRoutes = require("../routes/attendanceRoutes");
const designationRoutes = require("../routes/designationRoutes");
const companyAddressRoutes = require("../routes/companyAddressRoutes");

//yogesh
router.use("/employee", employeeRouter);
router.use("/company", companyRouter);
// suraj
router.use("/companySalary", companySalaryRouter);
router.use("/processPayroll", processPayrollRoutes);
router.use("/setupPayroll", payrollSettingsRoutes);
router.use("/attendance", attendanceRoutes);

// vaishnavi
router.use("/designation", designationRoutes);
router.use("/address", companyAddressRoutes);

module.exports = router;
