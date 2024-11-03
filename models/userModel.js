const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const employeeSchema = new mongoose.Schema({
  companyId: { type: ObjectId, ref: "Company" },

  // Personal Information
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  avatar: { type: String },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  bloodGroup: { type: String },
  maritalStatus: { type: String },

  // Work Information
  employeeId: { type: String },
  departmentId: { type: ObjectId, ref: "Department" },
  subDepartmentId: { type: ObjectId },
  designationId: { type: ObjectId, ref: "Designation" },
  jobTitle: { type: String },
  reportingManagerId: { type: ObjectId },
  workLocation: { type: String },
  employeeType: {
    type: String,
    enum: ["Full Time", "Part Time", "Contract"],
  },
  probationPeriod: { type: Number },
  probationStatus: {
    type: String,
    enum: ["Confirmed", "Probation"],
  },
  dateOfJoining: { type: Date },
  ctc: { type: Number },

  // Bank Details
  bankDetails: {
    accountHolderName: { type: String },
    bankName: { type: String },
    city: { type: String },
    branchName: { type: String },
    ifscCode: { type: String },
    accountNumber: { type: String },
  },

  // Addresses
  addresses: {
    currentAddress: { type: String },
    permanentAddress: { type: String },
    houseType: { type: String },
    currentResidenceSince: { type: Date },
    currentCitySince: { type: Date },
  },

  // Social Profile
  socialProfile: {
    linkedin: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },

  // Status and Role
  status: { type: String },
  roleId: { type: ObjectId, ref: "Role" },

  // Work History
  workHistory: [
    {
      department: { type: String },
      designation: { type: String },
      from: { type: Date },
      to: { type: Date },
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
