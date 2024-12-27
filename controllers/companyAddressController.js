const mongoose = require("mongoose");
const Address = require("../models/addressModel");
const Company = require("../models/companyModel");

// Create and link company address
exports.createCompanyAddress = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find the company
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Create a new address
    const address = new Address(req.body);
    const savedAddress = await address.save();

    // Link the address to the company
    company.address = savedAddress._id;
    await company.save();

    res.status(201).json({
      message: "Company address created successfully",
      address: savedAddress,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to create company address",
      details: error.message,
    });
  }
};

// Get company address
exports.getCompanyAddress = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find the company and populate the address
    const company = await Company.findById(companyId).populate('address');
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({
      company: company.registeredCompanyName,
      address: company.address,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch company address",
      details: error.message,
    });
  }
};

// Update company address
exports.updateCompanyAddress = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find the company and its associated address
    const company = await Company.findById(companyId).populate('address');
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Update the address document
    const updatedAddress = await Address.findByIdAndUpdate(
      company.address._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Company address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to update company address",
      details: error.message,
    });
  }
};

// Delete company address
exports.deleteCompanyAddress = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find the company and its associated address
    const company = await Company.findById(companyId).populate('address');
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Delete the address document
    await Address.findByIdAndDelete(company.address._id);

    // Clear the address reference in the company
    company.address = undefined;
    await company.save();

    res.status(200).json({ message: "Company address deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete company address",
      details: error.message,
    });
  }
};
