const Employee = require("../models/userModel");
const SalaryStructure = require("../models/salaryStructuresModel");
const PayrollSettings = require("../models/payrollSettingsModel");

// calculation of salary
const calculateSalary = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId).populate(
      "designationId"
    );
    const salaryStructure = await SalaryStructure.findById(
      employee.structureId
    );
    const payrollSettings = await PayrollSettings.findOne({
      companyId: employee.companyId,
    });

    let grossSalary = 0;
    let deductions = 0;

    // calculate earnings
    salaryStructure.earnings.forEach((earning) => {
      grossSalary += calculateComponent(earning, employee);
    });

    // calculate deductions
    salaryStructure.deductions.forEach((deduction) => {
      deductions += calculateComponent(deduction, employee);
    });

    // Apply PF & ESI if applicable
    if (payrollSettings.hasPF) {
      const pfDeduction = Math.min(
        (grossSalary * payrollSettings.employeeContributionPF) / 100,
        payrollSettings.pfCeiling
      );
      deductions += pfDeduction;
    }

    if (payrollSettings.hasESI) {
      const esiDeduction = (grossSalary * 0.75) / 100; // ESi employee contribution
      deductions += esiDeduction;
    }

    // calculate net salary
    const netSalary = grossSalary - deductions;

    res.status(200).json({ grossSalary, deductions, netSalary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// calculate individual salary component
function calculateComponent(component, employee) {
  if (component.calculationtype === "fixed") {
    return component.calculationValue;
  } else if (component.calculationtype === "percentage") {
    return (employee.ctc * component.calculationValue) / 100;
  }

  return 0;
}

module.exports = { calculateSalary };
