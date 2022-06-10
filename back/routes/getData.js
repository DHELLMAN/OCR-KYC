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
    console.log(req.files["userAadhaarCard"]);
    
    const userEntered = {
        name: req.body.userName,
        father_name: req.body.fatherName,
        contact: req.body.userContact,
        geoLocation: req.body.userGeoLocation,
        fullAddress: req.body.fullAddress,
        aadhaar: req.files["userAadhaarCard"],
        pan: req.files["userPanCard"]
    }
   
   var aadPath = userEntered.aadhaar[0].path;
   var panPath = userEntered.pan[0].path;

   console.log("before");
  var aadID = await ocrAadhaar(aadPath);
  console.log(aadID);
  console.log("middle");
  var panID = await ocrPAN(panPath);
  console.log(panID);
  console.log("after");
  const fetchedFatherName = panID.parent_name;
  var matchPercent;
  if(userEntered.name)
  {
      //call function of %matched of user entered name with id fetched name and father's name too.
     matchPercent = matchName(userEntered.name,aadID.name,panID.name,userEntered.father_name,fetchedFatherName);
  }
  else
  {
    console.log("Name on ID does not match");  
    return res.status(401).json("Name on ID does not match");
  }

   await User.findOne({Name:userEntered.name},{Father_Name:userEntered.father_name})
    .then(async (userExist)=>{
        if(userExist)
        {
            return res.status(422).json(()=>{
                console.log("User Already Exists");
            });
        }
        var myId = mongoose.Types.ObjectId();
        const user = new User({
            _id: myId, 
            Name:userEntered.name,
            Father_Name:userEntered.father_name,
            Contact:userEntered.contact,
            Geo_Location: userEntered.geoLocation,
            Address: userEntered.fullAddress,
            Aadhaar_Image: userEntered.aadhaar,
            Pan_Image: userEntered.pan,
            Aadhaar_UID: aadID.UID,
            Pan_UID: panID.UID,
            Aadhaar_Name_Match: matchPercent.aadNameMatch,
            Pan_Name_Match: matchPercent.panNameMatch,
            Father_Name_Match: matchPercent.fatherNameMatch
   
        });

       await user.save().then(()=>{
           console.log("Data saved successfully");
           return res.status(201).json({
            ObjectId: myId ,   
            message:"Data saved successfully"});
        }).catch((err)=> {
            console.log(err);
           return res.status(500).json(err);
        });  
});
});
module.exports = router;