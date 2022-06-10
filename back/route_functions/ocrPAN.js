const tesseract = require("node-tesseract-ocr");

const mysql = require('mysql');
const con = require('../database/sqlConnect');

const config = {
    lang: "eng",
    oem : 1,
    psm : 3,
};

const ocrPAN = async (path) => {

    const user = {
        UID: null,
        name: "",
        DOB: "",
        authorized_by: "",
        father_name: "",
        action_type: "",
        doc_url: "",
        doc_url_type: "",
        img_ocr: "",
        txn_id: ""
    }
    console.log(path);
   
   return tesseract.recognize(path,config)
    .then((text)=>{
        var content = text;
        content = content.split('\n');
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        var regex1 = (/^([0-2][0-9]|(3)[0-1])(\.|\/)(((0)[1-9])|((1)[0-2]))(\/|\.)\d{4}/gm);
        var auth_by = ['GOVT.','GOVERNMENT'];
        var flag=0,pn = 0;
            
        //removing null and space elements from the array
        for(var i=0;i<content.length;i++)
        {
            if(content[i]=='' || content[i]==' ' || content[i]=='  ' || content[i]=='   ')
            {   
                content.splice(i,1);
                i--;
            }
        }
      
        for (var i=0;i<content.length;i++)
        {
            
           if(regex.test(content[i]))
            {
                user.UID = content[i];
            }

            else if(regex1.test(content[i]))
            {
                user.DOB = content[i].split(' ')[0];
            }
            
            else if(content[i].includes('ther\'s Name'))
            {
                user.parent_name = content[i+1];
                user.name = content[i-1];
                pn=1;
            }
            else if(flag==0)
            {
                var auth = content[i].split(' ');
                
                for(var j=0; j<auth.length;j++)
                {  
                   
                    if((auth[j]==auth_by[0] || auth[j]==auth_by[1])&& content[i].includes('INDIA'))
                    {
                        user.authorized_by = 'Govt. Of India';
                        if(pn==0)
                        {         
                            user.name = content[i+1];
                            user.parent_name = content[i+2];
                        }
                        flag=1;
                    }
                
                }
            }
                       
        }
     
        // res.status(201).json({
        //     Name: user.name,
        //     Parent_Name: user.parent_name,
        //     UID: user.UID,
        //     DOB: user.DOB,
        //     Authorized_By: user.authorized_by
        // })
        console.log(user.name,user.parent_name,user.UID,user.DOB,user.authorized_by);
       
        con.query("Select * from UserPAN",function(err,result) 
        {
            if(err)
        {
            var sql = "Create table UserPAN(Name varchar(255),Parent_Name varchar(255),UID_PAN varchar(255),DOB varchar(255),Authorized_By varchar(255));"    
            
            con.query(sql, function (err, result) {
                if (err)
                {
                    res.status(404).json({
                        msg: "Creation Error",
                        message: err
                    })
                }
                
                console.log("Table created");
              });
            sql = "INSERT INTO UserPAN(Name, Parent_Name,UID_PAN, DOB, Authorized_By) VALUES ('"+`${user.name}`+"','"+`${user.parent_name}`+"','"+`${user.UID}`+"','"+`${user.DOB}`+"','"+`${user.authorized_by}`+"')";  
          
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Data added11");
                // res.status(201).json({
                //     message: 'Data added'
                // })
              });

        }
        else
            {  
               const  sql = "INSERT INTO UserPAN(Name, Parent_Name,UID_PAN, DOB, Authorized_By) VALUES ('"+`${user.name}`+"','"+`${user.parent_name}`+"','"+`${user.UID}`+"','"+`${user.DOB}`+"','"+`${user.authorized_by}`+"')";  
                            
               con.query(sql, function (err, result) {
                    if (err)
                    {
                       console.log(err);
                       return err.message;
                    }
                    else 
                    {
                        console.log("Data added");
                        // res.status(201).json({
                        //     message: 'Data added'
                        // });
                    }
                  });
            } 

        });
        return user;
       
   })
   .catch(err=>{
       console.log(err);
        return err.message;
    });
  
}

module.exports = ocrPAN;