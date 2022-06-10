
const IDAnalyzer = require("idanalyzer");   
const mongoose =require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config({path:"../config.env"});
require("../database/mongoConnect");
const User = require("../mongoModels/userSchema");

const authAadhaar = async (id,url) => { 

    const doc = await User.find({_id: id});
    const aadPath = doc[0].Aadhaar_Image[0].path;

let CoreAPI = new IDAnalyzer.CoreAPI("8Xe0WKSH79pbozMHx9IMr7ET6ijSQbvt","US");  

CoreAPI.enableAuthentication(true, 2);  

console.log("Scanning Aadhaar");
return CoreAPI.scan({ document_primary: aadPath, biometric_photo:url}).then(function (response) {  
    if(!response.error){  
        
        // All the information about this ID will be returned in an associative array  
        let data_result = response['result'];  
        let authentication_result = response['authentication'];  
        let face_result = response['face'];  

        var bio_result = "";
        var auth_result = "";

console.log("Aadhaar has been scanned");
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
        response.status(404).json({
           message: response.error
       });
       console.log("hwfdwf");
    }
    
    if(auth_result=="Authentic" && bio_result=="PASS")
    {
        return "Authentic Verified";
    }
    else if(auth_result=="Authentic" && bio_result=="FAIL")
    {
        return "Authentic Not_Verified";
    }
    else if(auth_result=="Fake" && bio_result=="PASS")
    {
        return "Fake_ID Verified";
    }
    else if(auth_result=="Fake" && bio_result=="FAIL")
    {
        return "Fake_ID Not_Verified";
    }
    else if(auth_result=="Suspicious" && bio_result=="PASS")
    {
        return "Suspicious Verified";
    }
    else
    {
        return "Suspicious Not_Verified";
    }
    
}).catch(function (err) {
   console.log("Error",err);
    return err;
});
}
module.exports = authAadhaar;