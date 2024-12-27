const designationModel = require("../models/designationModel");

// add a new designation
const addDesignation = async (req, res) => {
  try {
    const designation = new designationModel(req.body);
    await designation.save();
    res.status(201).json(designation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get all designations

const getAllDesignation = async (req, res) => {
  try {
    const designation = await designationModel.find();

    // const EmpData = await db.Employee.aggregate([
    //   //grouping on the bases on designation
    //   {
    //     $group: {
    //       _id: "$designation", // Group by designation
    //       employeeCount: { $sum: 1 }, // Count the employees in each group
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0, // Exclude the default _id field
    //       designation: "$_id", // Rename _id to designation
    //       employeeCount: 1,
    //     },
    //   },
    // ]);

    res.status(201).json(designation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update designation
const updatedesignation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: " DesignationTitle are required" });
    }
    const designation = await designationModel.findByIdAndUpdate(id, {
      new: true,
    });
    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res.status(200).json({ message: "Designation Updated", designation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete Designation
const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const designation = await designationModel.findByIdAndDelete(id); 

    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.status(200).json({ message: "Designation Deleted", designation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addDesignation,
  getAllDesignation,
  updatedesignation,
  deleteDesignation,
};
