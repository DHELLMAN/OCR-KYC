const express = require('express');
const router = express.Router();
const mongoose =require("mongoose");

require("../database/mongoConnect");
const User = require("../mongoModels/userSchema");

router.get("/:query/:searchString",(req, res) => {
    console.log("In search admin panel data");
    const filter = req.params.query;
    var filterAttribute = req.params.searchString;
    filterAttribute = filterAttribute.split(" ")[1];
    if(filterAttribute=='Name')
    {
        User.find({Name:{$eq:filter}},(error,data)=>{
            if(error) {
                console.log("Couldn't filter the data");
                console.log(error);
            }
            else
            {   
                console.log("No error");
                console.log(data);
            return res.status(201).json(data);
            }
        })
    }
    else if(filterAttribute=='Contact')
    {
        User.find({Contact:{$eq:filter}},(error,data)=>{
            if(error) {
                console.log("Couldn't filter the data");
                console.log(error);
            }
            else
            {   
                console.log("No error");
                console.log(data);
            return res.status(201).json(data);
            }
        })
    }
    else
    {
        console.log("city here");
        User.find({Address:{$regex: filter}},(error,data)=>{
            if(error) {
                console.log("Couldn't filter the data");
                console.log(error);
            }
            else
            {   
                console.log("No error");
                console.log(data);
            return res.status(201).json(data);
            }
        })
    }
});

module.exports = router;
