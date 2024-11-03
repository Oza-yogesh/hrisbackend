const Employee = require("../models/userModel");
const EmployeeSalaryStructure = require("../models/employeeSalaryStructureModel");
const SalaryStructure = require("../models/salaryStructuresModel");
const PayrollSettings = require("../models/payrollSettingsModel");

const processPayroll = async (req, res) => {
  try {
    const employees = await Employee.find({ companyId: req.params.companyId });

    // Process payroll for each employee
    const payrollResults = await Promise.all(
      employees.map(async (employee) => {
        const salaryDetails = await calculateSalary(employee);

        return {
          employeeId: employee._id,
          grossSalary: salaryDetails.grossSalary,
          earnings: salaryDetails.earnings,  // Detailed earnings breakdown
          deductions: salaryDetails.deductions,  // Detailed deductions breakdown
          netSalary: salaryDetails.netSalary,
        };
      })
    );

    res
      .status(200)
      .json({ message: "Payroll processed successfully", payrollResults });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function calculateSalary(employee) {
  try {
    // Fetch employee salary structure
    const employeeSalaryStructure = await EmployeeSalaryStructure.findOne({
      employeeId: employee._id,
    });

    if (!employeeSalaryStructure) {
      throw new Error(
        `Salary structure not found for employee ID: ${employee._id}`
      );
    }

    const salaryStructure = await SalaryStructure.findById(
      employeeSalaryStructure.structureId
    );

    if (!salaryStructure) {
      throw new Error(
        `Salary structure details not found for employee ID: ${employee._id}`
      );
    }

    const payrollSettings = await PayrollSettings.findOne({
      companyId: employee.companyId,
    });

    if (!payrollSettings) {
      throw new Error(
        `Payroll settings not found for company ID: ${employee.companyId}`
      );
    }

    let grossSalary = 0;
    let deductions = 0;
    let earningsBreakdown = [];
    let deductionsBreakdown = [];
    let basicSalary = 0;

    // Calculate monthly CTC
    const monthlyCTC = employee.ctc / 12 || 0; // Ensure monthlyCTC is never null or NaN

    // Calculate Earnings (Gross Salary Components)
    salaryStructure.earnings.forEach((earning) => {
      const calculatedValue = calculateComponent(earning, employee, monthlyCTC);
      grossSalary += calculatedValue || 0; // Ensure calculatedValue is never null or NaN

      // Track breakdown of earnings
      earningsBreakdown.push({
        type: earning.type,
        calculationType: earning.calculationType,
        value: calculatedValue || 0,
      });

      // Capture the Basic Salary separately for PF calculation
      if (earning.type === "Basic") {
        basicSalary = calculatedValue;
      }
    });

    // Calculate Deductions
    salaryStructure.deductions.forEach((deduction) => {
      const calculatedValue = calculateComponent(deduction, employee, monthlyCTC);
      deductions += calculatedValue || 0; // Ensure calculatedValue is never null or NaN

      // Track breakdown of deductions
      deductionsBreakdown.push({
        type: deduction.type,
        calculationType: deduction.calculationType,
        value: calculatedValue || 0,
      });
    });

    // Apply PF if applicable
    if (payrollSettings.hasPF && basicSalary > 0) {
      const pfDeduction = Math.min(
        (basicSalary * payrollSettings.employeeContributionPF) / 100,
        payrollSettings.pfCeiling
      );
      deductions += pfDeduction || 0; // Ensure pfDeduction is never null or NaN

      // Add PF to deductions breakdown
      deductionsBreakdown.push({
        type: "PF",
        calculationType: "Percentage",
        value: pfDeduction || 0,
      });
    }

    // Apply ESI if applicable
    if (grossSalary < 21000 && payrollSettings.hasESI) {
      const esiDeduction = (grossSalary * 0.75) / 100; // ESI employee contribution
      deductions += esiDeduction || 0; // Ensure esiDeduction is never null or NaN

      // Add ESI to deductions breakdown
      deductionsBreakdown.push({
        type: "ESI",
        calculationType: "Percentage",
        value: esiDeduction || 0,
      });
    }

    // Calculate remaining amount to be allocated to Special Allowance
    const remainingAmount = monthlyCTC - grossSalary;

    // Add remaining amount to Special Allowance in earnings
    if (remainingAmount > 0) {
      earningsBreakdown.push({
        type: "Special Allowance",
        calculationType: "Remaining",
        value: remainingAmount,
      });
      grossSalary += remainingAmount;
    }

    // Calculate net salary
    const netSalary = grossSalary - deductions || 0; // Ensure netSalary is never null or NaN

    return {
      grossSalary: grossSalary || 0,
      earnings: earningsBreakdown,  // Return detailed earnings breakdown
      deductions: deductionsBreakdown,  // Return detailed deductions breakdown
      netSalary: netSalary || 0,
    };
  } catch (error) {
    throw new Error("Error calculating salary: " + error.message);
  }
}

function calculateComponent(component, employee, monthlyCTC) {
  let value = 0;
  if (component.calculationType === "Fixed") {
    value = component.calculationValue || 0; // Ensure value is never null or NaN
  } else if (component.calculationType === "Percentage") {
    value = (monthlyCTC * component.calculationValue) / 100 || 0; // Ensure value is never null or NaN
    if (component.type === "HRA") {
      value = (value * 40) / 100 || 0; // Ensure value is never null or NaN
    }
  }
  return value || 0; // Return 0 if value is null or NaN
}

module.exports = { processPayroll };
