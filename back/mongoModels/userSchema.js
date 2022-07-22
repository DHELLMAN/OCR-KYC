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
    Password: {
        type: String,
        required:true
    },
    Geo_Location: {
        type: String,
    },
    Address: {
        type: String,
    },
    Aadhaar_Image: {
        type: Object,
    },
    Pan_Image: {
        type: Object,
    },
    Aadhaar_UID: {
        type: String,
    },
    Pan_UID: {
        type: String,
    },
    Aadhaar_Name_Match: {
        type: String,
    },
    Pan_Name_Match: {
        type: String,
    },
    Father_Name_Match: {
        type: String,
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