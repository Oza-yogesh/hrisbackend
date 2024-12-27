const express = require("express");
const router = express.Router();
const {
  addDesignation,
  getAllDesignation,
  updatedesignation,
  deleteDesignation,
} = require("../controllers/designationController");

// POST /api/designations
router.post("/", addDesignation);

//get all designations
router.get("/", getAllDesignation);

//update designation
router.put("/:id", updatedesignation);

// delete Designation
router.delete("/:id", deleteDesignation);

module.exports = router;
