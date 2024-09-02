const {
  OnBoardUser,
  setPassword,
  getEmployeeDetails,
  getEmployeeDetailsById,
} = require("../controllers/emplyee");

const router = require("express").Router();

router.post("/createEmployee", OnBoardUser);
router.post("/setpassword", setPassword);
router.get("/getEmployeeDetails", getEmployeeDetails);
router.get("/getEmployeeDetailsById/:id", getEmployeeDetailsById);

module.exports = router;
