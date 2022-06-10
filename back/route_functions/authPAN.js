
const IDAnalyzer = require("idanalyzer");   
const mongoose =require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config({path:"../config.env"});
require("../database/mongoConnect");
const User = require("../mongoModels/userSchema");

const authPAN = async (id,url) => { 

    const doc = await User.find({_id: id});
    const panPath = doc[0].Pan_Image[0].path;

    let CoreAPI = new IDAnalyzer.CoreAPI("8Xe0WKSH79pbozMHx9IMr7ET6ijSQbvt","US");  
    console.log(panPath,"path of pan here");
    console.log(url,"url here");
CoreAPI.enableAuthentication(true, 2);  
console.log("Scanning PAN");
return await CoreAPI.scan({ document_primary:panPath, biometric_photo:url}).then(function (res) {  
    console.log("outside if");
    if(!res.error){  
        console.log("inside if");
        // console.log(res);  
        // All the information about this ID will be returned in an associative array  
        // let data_result = res['result'];  
        let authentication_result = res['authentication'];  
        let face_result = res['face'];  

        var bio_result = "";
        var auth_result = "";


        if(authentication_result){  
            if(authentication_result['score'] > 0.5) {  
                console.log("The document uploaded is authentic");
                auth_result = "Authentic";  
            }else if(authentication_result['score'] > 0.3){  
                console.log("The document uploaded looks little bit suspicious");  
                auth_result = "Suspicious";
            }else{  
                console.log("The document uploaded is fake");
                auth_result = "Fake";  
            }  
        }  
        // Parse biometric verification results  
        if(face_result){  
            if(face_result['isIdentical']) {  
                console.log("Biometric verification PASSED!"); 
                bio_result = "PASS"; 
            }else{  
                console.log("Biometric verification FAILED!"); 
                bio_result = "FAIL"; 
            }  
            console.log("Confidence Score: "+face_result['confidence']);
        }           
    }
    else
    {  
        console.log("hwfdwf");
        console.log(res.error);
       return res.error;
       
    }  
  
    
    var result;
            if(auth_result=="Authentic" && bio_result=="PASS")
            {
                result = "Authentic Verified"; 
                return result;
            }
            else if(auth_result=="Authentic" && bio_result=="FAIL")
            {
                result = "Authentic Not_Verified"; 
                return result; 
            }
            else if(auth_result=="Fake" && bio_result=="PASS")
            {
                result = "Fake_ID Verified"; 
                console.log(result,"coming in 3nd else if");
                return result;
            }
            else if(auth_result=="Fake" && bio_result=="FAIL")
            {
                result = "Fake_ID Not_Verified";
                return result;
            }
            else if(auth_result=="Suspicious" && bio_result=="PASS")
            {
                result = "Suspicious Verified"; 
                return result;
            }
            else
            {
                result = "Suspicious Not_Verified"; 
                return result;
            }
      
}).catch(function (err) {
   
    console.log(err);
});
}
module.exports = authPAN;