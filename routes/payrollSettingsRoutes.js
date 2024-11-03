const express = require("express");
const {
  createPayrollSettings,
  getpayrollSettings,
  updatePayrollSettings,
} = require("../controllers/payrollController");

const router = express.Router();

router.post("/create-payroll-settings", createPayrollSettings);

router.get("/get-payroll-settings/:companyId", getpayrollSettings);

router.put("/update-payroll-settings/:companyId", updatePayrollSettings);

module.exports = router;
