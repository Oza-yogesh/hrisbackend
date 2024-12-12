
const router = require("express").Router();

const {getEducationDetails, deleteEducationDetails, updateEducationDetails, getEducationDetailsToFrontEnd} = require("../controllers/profileEducationController");

router.post("/education-details", getEducationDetails);
router.delete("/delete-Education-details/:id", deleteEducationDetails);
router.put('/update-Education-details/:id', updateEducationDetails);
router.get('/get-Education-details/:id',getEducationDetailsToFrontEnd);

module.exports = router;