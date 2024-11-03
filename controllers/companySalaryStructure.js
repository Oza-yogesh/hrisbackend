const SalaryStructure = require("../models/salaryStructuresModel");

// create salary structure by the company
const createSalaryStructure = async (req, res) => {
  try {
    const { companyId, name, description, earnings, deductions } = req.body;

    // validate if the salary structure with the same name is already existes with the company
    const existingStructure = await SalaryStructure.findOne({
      name,
      companyId,
    });

    if (existingStructure) {
      return res.status(400).json({
        message: "Salary structure with the sae name is already exists.",
      });
    }

    // Create a new salary structure
    const salaryStructure = new SalaryStructure({
      companyId,
      name,
      description,
      earnings,
      deductions,
    });

    await salaryStructure.save();

    res.status(201).json({
      message: "Salary structure created successfully",
      salaryStructure,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get salary structures
const getSalaryStructures = async (req, res) => {
  try {
    const { companyId } = req.params;

    // fetch all the salary structures given by the company
    const salaryStructures = await SalaryStructure.find({ companyId });

    res.status(200).json({ salaryStructures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update salary structure
const updateSalaryStructure = async (req, res) => {
  try {
    const { structureId } = req.params;
    const { name, description, earnings, deductions } = req.body;

    // update the salary structure
    const salaryStructure = await SalaryStructure.findByIdAndUpdate(
      structureId,
      { name, description, earnings, deductions },
      { new: true }
    );

    if (!salaryStructure) {
      return res.status(404).json({ message: "Salary structure not found." });
    }

    res.status(200).json({
      message: "Salary structure updated successfully",
      salaryStructure,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete the salary structure
const deleteSalaryStructure = async (req, res) => {
  try {
    const { structureId } = req.params;

    // delete the salary structure
    const salaryStructure = await SalaryStructure.findByIdAndDelete(
      structureId
    );

    if (salaryStructure) {
      return res.status(404).json({ message: "Salary structure not found." });
    }

    res.status(200).json({ message: "Salary structure deleted successfully." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSalaryStructure,
  getSalaryStructures,
  updateSalaryStructure,
  deleteSalaryStructure
};
