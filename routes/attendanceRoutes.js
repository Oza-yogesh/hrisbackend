const express = require("express");
const {
  clockIn,
  clockOut,
  recordAttendance,
  getClockInStatus,
} = require("../controllers/attendanceController");
const { validateToken } = require("../middlewares/validateToken");
const router = express.Router();

// Clock-in route
router.post("/clock-in", validateToken, clockIn);

// Clock-out route
router.post("/clock-out", validateToken, clockOut);

// Record attendance route (optional, depending on your logic)
router.post("/record-attendance", validateToken, recordAttendance);

router.get("/status", validateToken, getClockInStatus);

module.exports = router;
