const express = require("express");
const postCertificationDetails = require("../controllers/profileDocumentController");
const router = express();
const multer = require("multer");
const path = require("path");

// Setup multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // specify the folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // save with unique filename
  },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedFileTypes = /jpeg|jpg|png|pdf|docx/;
      const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = allowedFileTypes.test(file.mimetype);
      if (extname && mimeType) {
        return cb(null, true);
      }
      cb(new Error("Invalid file type"));
    },
});
//ID's

//Certifications
router.post("/postCertificationDetails", upload.single("file"), postCertificationDetails);


//work routes

//Policy routes
module.exports = router;