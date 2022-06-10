const express = require('express');
const router = express.Router();
const mongoose =require("mongoose");
const authPAN = require("../route_functions/authPAN");
const authAadhaar = require("../route_functions/authAadhaar");
const multer = require("multer");

require("../database/mongoConnect");
const User = require("../mongoModels/userSchema");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/home/lokeshmalik/Desktop/JS/UserOCR/back/captured/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage:storage} )
const file = upload.fields([{ name: 'user_id', maxCount: 1 }, { name: 'user_image', maxCount: 1 }])

router.post("/",file, async (req, res) => {

    console.log("Connected to Picture React\n\n");
    console.log(req.body,"req.body here");
    var user_id = req.body.user_id;
    var captured = { uImage: req.body.user_image};
    var panV = await authPAN(user_id,captured.uImage);

    console.log(panV,"returned result");
    const content = panV.split(" ");
    console.log(content);
    const panVerification = {
        authPanID: content[0],
        authPanFace: content[1] 
    }
    
    var aadV = await authAadhaar(user_id,captured.uImage);
    aadV = aadV.split(" ");
    const aadVerification = {
        authAadID: aadV[0],
        authAadFace: aadV[1] 
    }

    const userID = {
        aadhaar:"",
        pan:""
    }
    var userFace; 

    if(aadVerification.authAadID=="Authentic")
        {
            userID.aadhaar = "Authentic";
        }
    else if(aadVerification.authAadID=="Suspicious")
        {
            userID.aadhaar = "Suspicious";
        }
    else
        {
            userID.aadhaar = "Fake";        
        }
     
    if(panVerification.authPanID=="Authentic")
        {
            userID.pan = "Authentic";
        }
    else if(panVerification.authPanID=="Suspicious")
        {
            userID.pan = "Suspicious";
        }
    else
        {
            userID.pan = "Fake";        
        }    

    if(panVerification.authPanFace == "Verified" || aadVerification.authAadFace == "Verified")
    {
        console.log(panVerification.authPanFace,"if part");
        userFace = "Verified";
    }
    else
    {
        console.log(panVerification.authPanFace,"else part");
        userFace = "Picture doesn't match with IDs";
    }    
    
    console.log("results of authentication\n",userID,"\n",userFace);

    await User.findOneAndUpdate(
        {
        _id: user_id
        },
        {
        User_Image: captured.uImage,
        Aadhaar_Status: userID.aadhaar,
        Pan_Status: userID.pan,
        Face_Verification_Status: userFace
        }
    ).then((res)=>{
        console.log("Updated");
    }).catch((err)=>console.log(err));
    
    return res.status(200).json("reaching here");
});

module.exports = router;