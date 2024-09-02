const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  roleName: { type: String },
  permissions: [String],
});

module.exports = mongoose.model("Role", rolesSchema);
