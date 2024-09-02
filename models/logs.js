const mongoose = require("mongoose");
mongoose.pluralize(null);

const logsSchema = new mongoose.Schema({
  type: {
    type: String,
   },
  startDate: {
    type: String,
   },
  endDate: {
    type: String,
   },
  days: {
    type: Number,
    },
  appliedOn: {
    type: String,
   },
  status: {
    type: String,
  },
  actions: {
    type: String,
  },

});

module.exports = mongoose.model("User", logsSchema);
