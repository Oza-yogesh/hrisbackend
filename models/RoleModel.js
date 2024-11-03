const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["admin", "user", "superadmin"], // Define the roles here
  },
  permissions: {
    type: [String],
    enum: [
      "create",
      "read",
      "update",
      "delete",
      "manageUsers",
      "viewReports",
      "settingsAccess",
    ],
    default: ["read"], // Example default permission
  },
});
const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
