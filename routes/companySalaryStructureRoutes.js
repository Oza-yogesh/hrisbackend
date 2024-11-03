const express = require("express");
const {
  createSalaryStructure,
  getSalaryStructures,
  updateSalaryStructure,
  deleteSalaryStructure,
} = require("../controllers/companySalaryStructure");
const router = express.Router();

router.post("/create-salary-structure", createSalaryStructure);

router.get("/get-salary-structure/:companyId", getSalaryStructures);

router.put("/update-salary-structure/:structureId", updateSalaryStructure);

router.delete("/delete-salary-structure/:structureId", deleteSalaryStructure);

module.exports = router;
