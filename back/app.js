const dotenv = require("dotenv");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");


dotenv.config({path:"/home/lokeshmalik/Desktop/JS/UserOCR/back/config.env"});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const userRegister = require("./routes/userRegister");
const userLogin = require("./routes/userLogin");
const getData = require("./routes/getData");
const getPic = require("./routes/getPic");
const adminData = require("./routes/adminData");
const fetchSingleData = require("./routes/fetchSingleData");
const login = require("./routes/login");
const searchAdminPanelData = require("./routes/searchAdminPanelData");
const lockFile = require("./routes/lockFile");

app.use("/register",userRegister);
app.use("/userlogin",userLogin);
app.use("/post",getData);
app.use("/capture",getPic);
app.use("/adminData",adminData);
app.use("/fetchSingleData",fetchSingleData);
app.use("/login",login);
app.use("/searchAdminPanelData",searchAdminPanelData);
app.use("/lockFile",lockFile);

module.exports = app;