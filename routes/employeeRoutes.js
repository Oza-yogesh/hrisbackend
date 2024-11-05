const {
  OnBoardUser,
  setPassword,
  getEmployeeDetails,
  getEmployeeDetailsById,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/emplyee");
const upload = require("../middlewares/fileUpload");
const { validateToken } = require("../middlewares/validateToken");

const User = require("../models/userModel");

const router = require("express").Router();

router.post("/createEmployee", OnBoardUser);
router.post("/setpassword", setPassword);
router.get("/getEmployeeDetails", getEmployeeDetails);
router.get("/getEmployeeDetailsById/:id", getEmployeeDetailsById);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/updateEmployee/:id", deleteEmployee);

router.post(
  "/upload-profile",
  validateToken,
  upload.single("profilePhoto"),
  async (req, res) => {
    console.log(req.user);
    const { _id } = req.user;

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Get the file name of the uploaded file
      const filename = req.file.filename; // Correctly get the uploaded file's name

      // Construct the full URL to access the uploaded profile photo
      const profilePhotoLink = `${process.env.BACK_END_BASE_URL}/public/profilePhoto/${filename}`; // Add a slash before filename

      console.log(profilePhotoLink);

      // Update the user document with the new avatar URL
      const updatedEmployee = await User.findByIdAndUpdate(
        _id,
        { $set: { avatar: profilePhotoLink } }, // Save the profile photo link in the avatar field
        { new: true, runValidators: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Return success response with the profile photo URL
      res.status(200).json({
        message: "Profile photo uploaded successfully",
        profilePhotoLink, // Send the profile photo URL as a response
        updatedEmployee, // Optionally send the updated employee data
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error uploading profile photo",
        error: error.message,
      }); // Send only error message
    }
  }
);

router.get("/profile-photo", validateToken, async (req, res) => {
  const { _id } = req.user;

  try {
    // Fetch the user from the database by userId
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming the profile photo URL is stored in the 'avatar' field
    const profilePhotoUrl = user.avatar;

    if (!profilePhotoUrl) {
      return res.status(404).json({ message: "Profile photo not found" });
    }

    // Return the photo URL
    res.status(200).json({ photoUrl: profilePhotoUrl });
  } catch (error) {
    console.error("Error fetching profile photo:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});


module.exports = router;
