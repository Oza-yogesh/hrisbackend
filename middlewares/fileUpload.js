const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create the upload folder if it doesn't exist
const uploadDir = "public/profilePhoto";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    const fileExt = path.extname(file.originalname); // Get the file extension
    const filename = `${timestamp}-${randomNum}${fileExt}`; // Create the new filename
    cb(null, filename); // Save the file with the new filename
  },
});

// Set file filter for image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});

module.exports = upload;
