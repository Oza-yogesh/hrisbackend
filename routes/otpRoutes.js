const sendOtp = require("../middlewares/sendOTPMail");
const verifyOtp = require("../middlewares/verifyOtp");

const router = require("express").Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp, (req, res) => {
  res.status(200).send("OTP verified successfully");
});

module.exports = router;
