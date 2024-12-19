const mongoose = require("mongoose");

const profileEducationSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Employee" 
    },
    qualificationType:{
        type:String,
        required:true,
    },
    courseName:{
        type:String,
        required:true,
    },
    courseType:{
        type:String,
        required:true,
    },
    stream:{
        type:String,
        required:true,
    },
    courseStartDate:{
        type:String,
        required:true,
    },
    courseEndDate:{
        type:String,
        required:true,
    },
    collegeName:{
        type:String,
        required:true,
    },
    universityName:{
        type:String,
        required:true,
    },
});

const profileEducationDetails = mongoose.model("profileEducationDetails", profileEducationSchema);
module.exports = profileEducationDetails;