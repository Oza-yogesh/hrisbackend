const attendanceModel = require("../models/attendanceModel");

// Clock-in function
const clockIn = async (req, res) => {
  const { _id } = req.user;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  try {
    // Check if there's already a record for today
    let attendance = await attendanceModel.findOne({
      employeeId: _id,
      date: today,
    });

    if (attendance) {
      return res.status(400).json({ message: "Already clocked in for today" });
    }

    // Create a new attendance record with clock-in time
    attendance = new attendanceModel({
      employeeId: _id,
      date: today,
      clockInTime: new Date(),
    });

    await attendance.save();

    res.status(200).json({
      message: "Clocked in successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error clocking in", error });
  }
};

// Clock-out function
const clockOut = async (req, res) => {
  const { _id } = req.user; // Assuming req.user contains the authenticated user ID
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  try {
    // Find the attendance record for today
    let attendance = await attendanceModel.findOne({
      employeeId: _id,
      date: today,
    });

    if (!attendance) {
      return res
        .status(400)
        .json({ message: "No clock-in record found for today" });
    }

    // Update the attendance record with clock-out time
    attendance.clockOutTime = new Date();
    const clockInTime = new Date(attendance.clockInTime);
    const totalHours =
      (attendance.clockOutTime - clockInTime) / (1000 * 60 * 60); // Calculate total hours
    attendance.totalHours = totalHours;

    // Mark as Full Day or Half Day based on total hours
    if (totalHours >= 9) {
      attendance.status = "Full Day";
    } else if (totalHours > 0) {
      attendance.status = "Half Day";
    } else {
      attendance.status = "Absent";
    }

    await attendance.save();

    res.status(200).json({
      message: "Clocked out successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error clocking out", error });
  }
};

// Record Attendance function (this function could be called periodically or after clock-out)
const recordAttendance = async (req, res) => {
  const { _id } = req.user; // Assuming req.user contains the authenticated user ID
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  try {
    // Find the attendance record for today
    const attendance = await attendanceModel.findOne({
      employeeId: _id,
      date: today,
    });

    if (!attendance) {
      return res
        .status(400)
        .json({ message: "No attendance record found for today" });
    }

    // Update the record to mark attendance as present
    attendance.status = attendance.totalHours >= 9 ? "Full Day" : "Half Day";
    await attendance.save();

    res.status(200).json({
      message: "Attendance recorded successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error recording attendance", error });
  }
};

const getClockInStatus = async (req, res) => {
  try {
    const { _id } = req.user; // Assuming `req.user` contains the authenticated user's info

    // Find the most recent clock-in entry without a clock-out time
    const lastAttendance = await attendanceModel
      .findOne({
        employeeId: _id,
        clockOutTime: null, // No clock-out time means user is still clocked in
      })
      .sort({ clockInTime: -1 }); // Sort by clockInTime in descending order to get the latest entry

    if (lastAttendance) {
      return res.status(200).json({
        message: "User is currently clocked in.",
        data: {
          clockInTime: lastAttendance.clockInTime, // Send clock-in time
        },
      });
    } else {
      return res.status(200).json({
        message: "User is not currently clocked in.",
      });
    }
  } catch (error) {
    console.error("Error fetching clock-in status:", error);
    return res.status(500).json({
      message: "An error occurred while fetching clock-in status.",
    });
  }
};

module.exports = {
  clockIn,
  clockOut,
  recordAttendance,
  getClockInStatus,
};
