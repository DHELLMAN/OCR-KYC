const express = require('express');
const router = express.Router();
const mongoose =require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config({path:"../config.env"});

require("../database/mongoConnect");
const User = require("../mongoModels/userSchema");

router.get("/:id",(req, res) => {
    console.log("In fetching single data");
    User.findById(req.params.id,(error,data)=>{
        if(error) {
            console.log(error);
        }
        else
        {   
            console.log("No error");
        return res.status(201).json(data);
        }
    })
});

module.exports = router;
