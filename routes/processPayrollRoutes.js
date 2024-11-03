const express = require("express");
const { processPayroll } = require("../controllers/processPayrollController");
const router = express.Router();

router.post("/process-payroll/:companyId", processPayroll);

module.exports = router;
