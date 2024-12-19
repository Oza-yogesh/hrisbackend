const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// const profileDocumentSchema = new mongoose.Schema({
//     employeeId :{
//         type:ObjectID,
//         ref:"Employee",
//     },
//     idType:{
//         type:string,
//         required:true,
//     },
//     idValue:{
//         type:string,
//         required:true,
//     },
//     uploadedBy:{
//         type:firstName,
//         ref:"Employee"
//     },
//     verification:{
        
//     },
//     proofs:{
//         type:object,
//         required:true
//     },
//     file:{
//         type:File,
//         required:null
//     }
// });

const profileCertificateSchema = new mongoose.Schema({
    employeeId :{
        type:ObjectId,
        ref:"Employee",
    },
    courceType:{
        type: String,
        required:true,  
    },
    certificationTitle:{
        type:String,
        required:true,
    },
    uploadedBy:{
        type:String,
        ref:"Employee"
    },
    verification:{
        type:String,
        enum:["Pending", "Verified", "Rejected"],
        default:"Pending",
    },
    file:{
        type: String, 
        required: true 
    },

});
const profileCertificate = mongoose.model("profileCertificate", profileCertificateSchema)

//const ProfileDocument = mongoose.model("ProfileDocument", profileDocumentSchema);

module.exports =  profileCertificate;