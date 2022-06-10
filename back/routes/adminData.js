const express = require('express');
const router = express.Router();
const mongoose =require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config({path:"../config.env"});

require("../database/mongoConnect");
const User = require("../mongoModels/userSchema");

router.get("/",(req, res) => {
    User.find((error,data)=>{
        if(error) {
            console.log(error);
        }
        else
        {
            return res.status(201).json(data);
        }
    })
});

module.exports = router;
