const PayrollSettings = require("../models/payrollSettingsModel");

//create payroll settings
const createPayrollSettings = async (req, res) => {
  try {
    const {
      companyId,
      payCycle,
      hasPF,
      employeeContributionPF,
      pfCeiling,
      hasESI,
      deductProfessionalTax,
      payPeriodStart,
      payPeriodEnd,
    } = req.body;

    // check if payroll settings already exist in the company
    const payrollSettings = new PayrollSettings({
      companyId,
      payCycle,
      hasPF,
      employeeContributionPF,
      pfCeiling,
      hasESI,
      deductProfessionalTax,
      payPeriodStart,
      payPeriodEnd,
    });

    await payrollSettings.save();
    res.status(201).json({
      message: "Payroll settings created successfully",
      payrollSettings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payroll settings
const getpayrollSettings = async (req, res) => {
  try {
    const settings = await PayrollSettings.findOne({
      companyId: req.params.companyId,
    });
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update payroll settings
const updatePayrollSettings = async (req, res) => {
  try {
    const settings = await PayrollSettings.findOneAndUpdate(
      { companyId: req.params.companyId },
      req.body,
      { new: true }
    );
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayrollSettings,
  getpayrollSettings,
  updatePayrollSettings,
};
