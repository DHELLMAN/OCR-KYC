const express = require("express");
const route = express.Router();
const User = require("../mongoModels/userSchema");
const mongoose = require("mongoose")
require("../database/mongoConnect");
const bcrypt = require("bcrypt");

route.post("/", async(req,res,next)=>{

    try{ 
        console.log("in userregister backend");
        const {Name, Father_Name, Contact, Password} = req.body;
     
     const contactCheck = await User.findOne({Contact});
     if(contactCheck)
     {
         return res.json({
             msg: "Contact already exists",
             status: false
         })
     }
     var myId = mongoose.Types.ObjectId();
     const hashedPassword = await bcrypt.hash(Password,10)
     const user = await User.create({
         _id: myId,
         Name,
         Father_Name,
         Contact,
         Password: hashedPassword
     });
     delete user.password;
 
     return res.json({status:true,user})
 } 
 catch(err)  {
     next(err);
 }


})

module.exports = route;