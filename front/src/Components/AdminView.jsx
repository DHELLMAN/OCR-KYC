import React, { useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";
// import html2PDF from "jspdf-html2canvas/dist/jspdf-html2canvas.min.js";
import html2pdf from "html2pdf.js";
import logo from "../images/logo.png";
import jsPDF from "jspdf";
import fileUrl from "file-url";
import { saveAs } from 'file-saver';


const AdminView = () => {
    const [doc,setDoc] = useState("");
    const id = useParams();
    const[isvisible, setisvisible]=useState(false)
    // const[isLook,setIsLook]=useState(false)
    // const[loc,setLoc]=useState();

    useEffect(()=>{
        // e.preventDefault();
        console.log(id.id);
        
        const fetchData = async ()=>{
           await axios.get("/fetchSingleData/"+id.id)
            .then((res)=>{
                const d = res.data;
                setDoc(d);
                setisvisible(true)
            }).catch((err)=>{
                console.log(err);
            })
          }
        fetchData();
        console.log(doc);
    },[]);

console.log(doc && doc);

const printDocument = async () => {
    console.log("printing");
    const config = {
        responseType: "blob"
    }

    await axios.post("/lockFile/"+id.id,{responseType:'blob'}).then((res)=>{

        // console.log(res,"response here");

        // var pdf = res.data;
        console.log("File locked");
        
        // console.log(pdf,"kkkk");

        window.alert("Your file has been downloaded in Files folder in Downloads Section. Kindly check.")

// var binaryData = [];
// binaryData.push(pdf);
// var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}))
// window.open(url)
// console.log(url,"creATED url");
        // var url = URL.createObjectURL(pdf);
        // window.open(url);
        // var blob = new Blob([pdf], {type: "application/pdf"});
        // saveAs(blob, "first.pdf");


        

    }).catch((err)=>{
        window.alert("File could not be downloaded.")
        console.log("Lock Error");
        console.log(err);
    })
  }
return (
    <>  
        <div className="container emp-profile" id="divToPrint">  
            
                <div className="row ml-3 border-bottom">
                    <div className="col-md-2 border-right">
                        <label>Personal Details</label>
                    </div>
                    <div className="col-md-2 pl-3 ml-3">
                        <div className="row">
                            <div className="col-md-12 pt-5">
                               <label>Name</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt-5">
                               <label>Father Name</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt-5">
                               <label>Contact</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt-5">
                               <label>Geo Location</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt-5 pb-5">
                               <label>Address</label>    
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12 pt-5">
                               <label>{doc.Name}</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt-5">
                               <label>{doc.Father_Name}</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt-5">
                               <label>{doc.Contact}</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt-1 pb-4">
                               <label>{doc.Geo_Location}</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mt-1 pt-5 pb-5">
                               <label>{doc.Address}</label>    
                            </div>
                        </div>
                    </div>
                     
                    <div className="col-md-4 pt-4 pb-4">
                        <img src={doc.User_Image} className="rounded-circle" alt="User" />
                    </div>
                    
                </div>
 
                <div className="row mt-5 ml-3 border-bottom">
                                    <div className="col-md-2 border-right">
                                     <label>Aadhaar Details</label>
                                    </div>
                                    <div className="col-md-5 ml-3 pl-3 pt-2">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label> Aadhaar UID:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <label>{doc.Aadhaar_UID}</label>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-md-6">
                                                <label> Name Match:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <label>{doc.Aadhaar_Name_Match}</label>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-md-6">
                                                <label> Aadhaar Status:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <label>{doc.Aadhaar_Status}</label>
                                            </div>
                                        </div> 
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <label> Face Verification: </label>
                                            </div>
                                            <div className="col-md-6 mt-4 mb-3 pb-4">
                                                <label>{doc.Face_Verification_Status}</label>
                                            </div>
                                        </div>       
                                    </div>
                                    
                                   { isvisible ?<div className="col-md-4 pt-4 pb-4">
                                        <img src={require(`/home/lokeshmalik/Desktop/JS/UserOCR/front/src/upload/${doc.Aadhaar_Image[0].originalname}`)} className="rounded" alt="User Aadhaar" />
                                    </div>: null}
                                </div>
                                <div className="row ml-3 mt-5 border-bottom">
                                    <div className="col-md-2 border-right">
                                     <label>PAN Details</label>
                                    </div>
                                    <div className="col-md-5 ml-3 pl-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label> PAN UID:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <label>{doc.Pan_UID}</label>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-md-6">
                                                <label> Name Match:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <label>{doc.Pan_Name_Match}</label>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-md-6">
                                                <label> Father Name Match:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <label>{doc.Father_Name_Match}</label>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-md-6">
                                                <label> PAN Status:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <label>{doc.Pan_Status}</label>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <label> Face Verification: </label>
                                            </div>
                                            <div className="col-md-6 pb-4">
                                                <label>{doc.Face_Verification_Status}</label>
                                            </div>
                                        </div>        
                                    </div>
                                    
                                    { isvisible ?<div className="col-md-4 pt-4 pb-4">
                                        <img src={require(`/home/lokeshmalik/Desktop/JS/UserOCR/front/src/upload/${doc.Pan_Image[0].originalname}`)} className="rounded" alt="User Pan" />
                                    </div> : null}
                                </div>
                                
                            <div className="row mt-2">
                                    <div className="col-md-12 d-flex justify-content-center mt-3 mb-2">
                                        <button className="btn btn-primary" onClick={printDocument}>Print</button>
                                    </div>
                            </div>
        </div>  
        {/* {isLook ? <Link to={loc} target="_blank" download>Download</Link> : null} */}
    </>
);
}
export default AdminView;