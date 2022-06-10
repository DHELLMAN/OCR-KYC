const tesseract = require('node-tesseract-ocr');
const con = require('../database/sqlConnect');
const mysql = require('mysql');

const config = {
    lang: "eng",
    oem : 1,
    psm : 3,
};

const ocrAadhaar = async (path) =>{
    const user ={
        UID: null,
        name: "",
        DOB: "",
        gender: "",
        address: "",
        authorized_by: "Govt. of India",
        father_name: "",
        action_type: "",
        doc_url: "",
        doc_url_type: "",
        img_ocr: "",
        txn_id: ""
    }

  return tesseract.recognize(path,config)
    .then((text)=>{
        
        console.log("in aad tesseract");
        var content = text;
        content = content.split('\n');
        
        var regexp=/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;  // for Aadhaar number
        var regex1 = (/^([0-2][0-9]|(3)[0-1])(\.|\/)(((0)[1-9])|((1)[0-2]))(\/|\.)\d{4}/gm); // for DOB
        var gen=0;

        for (var i=0; i<content.length;i++)
        {
            if(content[i]=='' || content[i]==' ')
            {
                content.splice(i,1);
                i--;
            }
            else if(regexp.test(content[i]))
            {
                user.UID = content[i];
            }
            else if(content[i].includes("DOB") || content[i].includes("Birth"))
            {
                var d = content[i].split(": ");
                user.DOB = d[1];
                var n = content[i-1].toString();
                while(n[0]==' ' || n[0]=='/' || n[0]=='\\' || n[0]=='=')
                {
                   n= n.slice(1);
                }
                user.name = n;
            }
            else if(gen==0)
            {
                if(content[i].includes("FEMALE") || content[i].includes("Female") || content[i].includes("female"))
                {
                    user.gender = "FEMALE";
                    gen=1;
                }
                else if(content[i].includes("MALE") || content[i].includes("Male") || content[i].includes("male"))
                {
                    user.gender = "MALE";
                    gen=1;
                }
            }
            else if(/\d/.test(content[i]))
            {   
                if(content[i].includes('_'))
                {
                    content[i] = content[i].replace(/_/g, '');
                }
                if(content[i][0].includes(' '))
                {
                    content[i] = content[i].replace(' ', '');
                }

                user.UID = content[i];
            }
        }      
      
        con.query("Select * from Aadhaar_User",function(err,res) 
          {
              if(err)
          {
              var sql = "Create table Aadhaar_User(Name varchar(255),UID_Aadhaar varchar(255),DOB varchar(255), Gender varchar(255), Authorized_By varchar(255));"    
              
              con.query(sql, function (err, res) {
                  if (err)
                  {
                      res.status(404).json({
                          msg: "Creation Error",
                          message: err
                      })
                  }
                  
                  console.log("Table created");
                });
              sql = "INSERT INTO Aadhaar_User(Name, UID_Aadhaar, DOB, Gender, Authorized_By) VALUES ('"+`${user.name}`+"','"+`${user.UID}`+"','"+`${user.DOB}`+"','"+`${user.gender}`+"','"+`${user.authorized_by}`+"')";  
            
              con.query(sql, function (err, result) {
                  if (err) throw err;
                  else
                  {
                      console.log("Data added11");
                  
                  }
                  
                });
      
          }
          else
              {  
                 const  sql = "INSERT INTO Aadhaar_User(Name, UID_Aadhaar, DOB, Gender, Authorized_By) VALUES ('"+`${user.name}`+"','"+`${user.UID}`+"','"+`${user.DOB}`+"','"+`${user.gender}`+"','"+`${user.authorized_by}`+"')";  
                              
                 con.query(sql, function (err, result) {
                      if (err)
                      {
                          console.log(err);
                         return err.message;
                      }
                      else 
                      {
                          
                          console.log("Data Added");
                      }
                    });
              } 
      
      });
            return user;
    }).catch((err)=>{
        console.log(err.message);
    });
}

module.exports = ocrAadhaar;
