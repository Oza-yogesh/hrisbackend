const Employee = require("../models/userModel");

const calculateTax = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    const annualSalary = employee.ctc;

    let taxableIncome = calculateTaxableIncome(annualSalary, employee);
    let incomeTax = caluclateIncomeTax(taxableIncome);

    res.status(200).json({ taxableIncome, incomeTax });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function calculateTaxableIncome(annualSalary, employee) {
  // deduct satndard deductions
  const standardDeduction = 50000; // Example: standard deduction
  return annualSalary - standardDeduction;
}

function caluclateIncomeTax(taxableIncome) {
  // calculate tax based on tax slabs
  let tax = 0;

  if (taxableIncome <= 250000) {
    tax = 0;
  } else if (taxableIncome <= 500000) {
    tax = (taxableIncome - 250000) * 0.05;
  } else if (taxableIncome <= 1000000) {
    tax = 12500 + (taxableIncome - 500000) * 0.2;
  } else {
    tax = 112500 + (taxableIncome - 1000000) * 0.3;
  }
  return tax;
}

module.exports = { calculateTax };
