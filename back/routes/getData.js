const ocrPAN = require("../route_functions/ocrPAN");
const express = require('express');
const router = express.Router();
const multer = require("multer");
var bodyParser = require('body-parser');
const ocrAadhaar = require("../route_functions/ocrAadhaar");
const mongoose =require("mongoose");
const matchName = require("../route_functions/matchName");

require("../database/mongoConnect");
const User = require("../mongoModels/userSchema");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/home/lokeshmalik/Desktop/JS/UserOCR/front/src/upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage:storage} )
const file = upload.fields([{ name: 'userAadhaarCard', maxCount: 1 }, { name: 'userPanCard', maxCount: 1 }])

router.post("/",file, async (req, res) => {

    console.log("Connected to getdata react");
    console.log(req.body);

    const uId = req.body.userId;
    const userPreviousData = await User.findById({_id: uId})
    
    console.log(userPreviousData);

    const userEntered = {
        name: userPreviousData.Name,
        father_name: userPreviousData.Father_Name,
        geoLocation: req.body.userGeoLocation,
        fullAddress: req.body.fullAddress,
        aadhaar: req.files["userAadhaarCard"],
        pan: req.files["userPanCard"]
    }
   
   var aadPath = userEntered.aadhaar[0].path;
   var panPath = userEntered.pan[0].path;

  var aadID = await ocrAadhaar(aadPath);
  var panID = await ocrPAN(panPath);

  const fetchedFatherName = panID.parent_name;
  var matchPercent;
  if(userEntered.name)
  {
     matchPercent = matchName(userEntered.name,aadID.name,panID.name,userEntered.father_name,fetchedFatherName);
  }
  else
  {
    console.log("Name on ID does not match");  
    return res.status(401).json("Name on ID does not match");
  }
   
  await User.findOneAndUpdate(
            {
            _id: uId
            },
            {
                Geo_Location: userEntered.geoLocation,
                Address: userEntered.fullAddress,
                Aadhaar_Image: userEntered.aadhaar,
                Pan_Image: userEntered.pan,
                Aadhaar_UID: aadID.UID,
                Pan_UID: panID.UID,
                Aadhaar_Name_Match: matchPercent.aadNameMatch,
                Pan_Name_Match: matchPercent.panNameMatch,
                Father_Name_Match: matchPercent.fatherNameMatch
            }
        ).then(()=>{
            
            console.log("Data saved successfully");
            return res.status(201).json("Data saved successfully");

        }).catch((err)=>{
           return res.status(500).json(err);
        });
});
module.exports = router;