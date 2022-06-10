const express = require('express');
const router = express.Router();
const multer =require("multer")

const upload = multer({dest:"#"} )
const file = upload.fields([{ name: 'userName', maxCount: 1 }])


router.post("/", file, async (req, res) => {

    console.log("Connected to login backend");
    const userName = req.body.userName;
    const pwd = req.body.password;

    if(userName == "Admin" && pwd == "Admin@1234")
    {
        console.log("Admin verified");
        return res.status(201).json("verified");
    }
    else
    {
        console.log(userName,pwd);
        return res.status(400).json("Bad Credentials");
    }
});
module.exports = router;