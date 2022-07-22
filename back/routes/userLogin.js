const express = require("express");
const route = express.Router();
const User = require("../mongoModels/userSchema");
const bcrypt = require("bcrypt");

require("../database/mongoConnect");

route.post("/",async(req,res,next)=>{

    try{ 
        const {Name, Contact, Password} = req.body;
        const user = await User.findOne({Contact});
        
        var redirectTo;
        
        if(!user)
     {
         return res.json({
             msg: "Incorrect Name or Password",
             status: false
         })
     }

     const isPasswordValid = await bcrypt.compare(Password, user.Password)
     
     if(!isPasswordValid)
     {
        return res.json({
            msg: "Incorrect Name or Password",
            status: false
        })
     }
     
     delete user.password;

     if(user.User_Image)
                {
                    redirectTo="dashboard";
                }
            else
                {
                    if(user.Pan_UID)
                    {
                        redirectTo="clickPicture"
                    }
                    else
                    {
                        redirectTo="inputData"
                    }
                }
     
     return res.json({status:true,user,redirectTo});
     
 } 
 catch(err)  {
     next(err);
 }
})

module.exports = route;