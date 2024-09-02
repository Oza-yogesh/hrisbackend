const express = require("express");
const router = express.Router();
const employeeRouter = require("../routes/employeeRoutes");
const companyRouter = require("../routes/companyRoutes");

router.use((req, res, next) => {
  console.log("your user/token validation middleware here...");
  next();
});

router.use("/employee", employeeRouter);
router.use("/company", companyRouter);

module.exports = router;
