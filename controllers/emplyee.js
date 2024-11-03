const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const crypto = require("crypto");
const {
  sendOtpEmail,
  storeOTP,
  getStoredDataByOTP,
  sendOtpSms,
} = require("../middlewares/OtpMethods");

const OnBoardUser = async (req, res) => {
  try {
    const { email, firstName, phoneNumber } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const newUser = new User(req.body);
      await newUser.save();
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    storeOTP(email, otp);

    // await sendOtpSms(phoneNumber, otp);
    await sendOtpEmail(email, firstName, otp);
    res.send({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error processing request" });
  }
};

const setPassword = async (req, res) => {
  try {
    const { password, otp } = req.body;
    console.log(password, otp);

    if (!password || !otp) {
      return res
        .status(400)
        .send({ message: "Email, password, and OTP are required" });
    }

    const storedData = getStoredDataByOTP(otp);
    console.log(storedData);
    const email = storedData.email;

    if (storedData.otp == otp) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      await user.save();

      res.send({ message: "Password set successfully" });
    } else {
      res.status(401).send({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error setting password" });
  }
};

const getEmployeeDetails = async (req, res) => {
  try {
    // Use aggregation to project only the required fields
    const users = await User.aggregate([
      {
        $project: {
          _id: 1,
          employeeId: 1,
          name: { $concat: ["$firstName", " ", "$lastName"] },
        },
      },
    ]);

    // Check if users are found
    if (users.length > 0) {
      res.status(200).send(users); // Send the result directly
    } else {
      res.status(404).send({ message: "No Users Found" }); // Return 404 if no users are found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//get employee details by id
const getEmployeeDetailsById = async (req, res) => {
  const { id } = req.params || req.query;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).json("User not found!");
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching api" });
  }
};

const updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const updateData = req.body;

  try {
    // Check if a profile photo was uploaded
    if (req.file) {
      // Add the path of the uploaded profile photo to the update data
      updateData.profilePhoto = req.file.path;
    }

    // Find employee by ID and update with the provided data
    const updatedEmployee = await User.findByIdAndUpdate(
      employeeId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee details updated successfully",
      data: updatedEmployee,
      profilePhotoPath: req.file ? req.file.path : null, // Send the profile photo path in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee details", error });
  }
};

// Controller to delete employee by ID
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    // Find employee by ID and delete
    const deletedEmployee = await User.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

module.exports = {
  OnBoardUser,
  setPassword,
  getEmployeeDetails,
  getEmployeeDetailsById,
  updateEmployee,
  deleteEmployee,
};
