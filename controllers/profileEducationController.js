const mongoose = require("mongoose")
const profileEducationDetails = require("../models/profileEducationModel"); 

const getEducationDetails = async (req, res)=>{
    try {
        const { qualificationType, courseName, courseType, stream, courseStartDate, courseEndDate, collegeName, universityName } = req.body;
        
        const newEducationDetails = new profileEducationDetails({
            qualificationType,
            courseName,
            courseType,
            stream,
            courseStartDate,
            courseEndDate,
            collegeName,
            universityName
        });

        await newEducationDetails.save();

        res.status(200).send({message:"Education details successfully stored in database", newEducationDetails});

    } catch (error) {
        console.log("Internal server error in getEducationDetails controller", error);
        res.status(500).send({message:error.message});
    }
}

const deleteEducationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Request Params ID: ", id);

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        message: "ID parameter is missing in the request.",
      });
    }

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format. Please provide a valid ObjectId.",
      });
    }

    // Find and delete the document
    const deletedEntry = await profileEducationDetails.findByIdAndDelete(id);

    // Check if the document was found and deleted
    if (!deletedEntry) {
      return res.status(404).json({
        message: `No education detail found with the ID: ${id}`,
      });
    }

    // Send success response
    return res.status(200).json({
      message: "Education detail deleted successfully.",
      data: deletedEntry,
    });
  } catch (error) {
    console.error("Error deleting education detail:", error);
    return res.status(500).json({
      message: "An error occurred while deleting the education detail.",
      error: error.message,
    });
  }
};

const updateEducationDetails = async (req, res) => {
  try {
    const urlvalue = req.params._id; 
    console.log("urlValue ***********************: ", urlvalue);

    const updatedDetails = await profileEducationDetails.findOneAndUpdate(
      { _id: urlvalue }, 
      req.body, 
      { new: true }
    );

    if (!updatedDetails) {
      return res.status(404).json({ message: 'Education details not found' });
    }

    res.status(200).json({
      message: "Education details updated successfully",
      updatedDetails
    });

  } catch (error) {
    console.error('Error updating education details:', error);
    res.status(500).json({ message: error.message });
  }
};
const getEducationDetailsToFrontEnd = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log("get id : ************ :", id );

    if (!id) {
      return res.status(400).json({message: "Invalid or missing ID",});
    }

    const educationDetail = await profileEducationDetails.findById(id); 

    if (!educationDetail) {return res.status(404).json({message: "Education detail not found",});
    }

    res.status(200).json({message: "Education detail retrieved successfully",data: educationDetail,});
  } catch (error) {
    res.status(500).json({message: "Failed to retrieve education detail",error: error.message,});
  }
};

module.exports = {getEducationDetails, deleteEducationDetails, updateEducationDetails, getEducationDetailsToFrontEnd};