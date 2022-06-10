const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: {
      type: String,
      required: true  
    },
    Name: {
        type: String,
        required:true
    },
    Father_Name: {
        type: String,
        required:true
    },
    Contact: {
        type: Number,
        required:true
    },
    Geo_Location: {
        type: String,
        required:true
    },
    Address: {
        type: String,
        required:true
    },
    Aadhaar_Image: {
        type: Object,
        required:true
    },
    Pan_Image: {
        type: Object,
        required:true
    },
    Aadhaar_UID: {
        type: String,
        required:true
    },
    Pan_UID: {
        type: String,
        required:true
    },
    Aadhaar_Name_Match: {
        type: String,
        required: true
    },
    Pan_Name_Match: {
        type: String,
        required: true
    },
    Father_Name_Match: {
        type: String,
        required: true
    },
    User_Image: {
        type: Object,
    },
    Aadhaar_Status: {
        type: String,
    },
    Pan_Status: {
        type: String,
    },
    Face_Verification_Status: {
        type: String,
    }   
});

const User = mongoose.model('USER_DATA',userSchema);

module.exports = User;