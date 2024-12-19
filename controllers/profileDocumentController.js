const profileCertificate = require("../models/profileDocumentModel");


const postCertificationDetails = async (req, res) => {
    try {
      
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError); 
      }
  
      if (!req.file) {
        return res.status(400).send("No file uploaded"); 
      }
  
      const { courceType, certificationTitle } = req.body;
      const file = req.file;
  
      const newCertification = new profileCertificate({
        courceType,
        certificationTitle,
        file: file.path, 
      });
  
      await newCertification.save();
  
      res.status(200).send("Certification details uploaded successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error uploading certification details", error );
    }
  };
  
module.exports = postCertificationDetails;