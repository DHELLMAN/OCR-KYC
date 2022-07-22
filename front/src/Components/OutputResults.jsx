import React, { useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import {useEffect} from "react"
import Navbar from "./Navbar";

const OutputResults = () => {
    const [doc,setDoc] = useState("");
    const id = useParams();
    const[isvisible, setisvisible]=useState(false)

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
  
return (
    <>  
    <Navbar/>
        <div className="container emp-profile">  
            
                <div className="row ml-3">
                    <div className="col-md-4">
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
                    <div className="col-md-4">
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
                            <div className="col-md-12 pt-5 pb-4">
                               <label>{doc.Geo_Location}</label>    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 pt-5 pb-5">
                               <label>{doc.Address}</label>    
                            </div>
                        </div>
                    </div>
                     
                    <div className="col-md-4 pt-5">
                        <img src={doc.User_Image} className="rounded-circle" alt="User" />
                    </div>
                    
                </div>
 
                 {/* 2nd row */}

                 <div className="row">
                 <div className="col-md-4 pt-5">
                        
                    </div>
                    <div className="col-md-4 pt-5">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link" id="home-tab" data-toggle="tab" role="tab" href="#home">Aadhaar</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" role="tab" href="#profile">Pan</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 pt-5">
                       
                    </div>
                </div>

                {/* 3rd row */}

                <div className="row ml-3">
                    <div className="col-md-12 about-info">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row mt-5">
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label> Aadhaar: UID:</label>
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
                                    
                                   { isvisible ?<div className="col-md-4">
                                        <img src={require(`/home/lokeshmalik/Desktop/JS/UserOCR/front/src/upload/${doc.Aadhaar_Image[0].originalname}`)} className="rounded" alt="User Aadhaar" />
                                    </div>: null}
                                </div>
                            </div>

                            {/* 2nd tab panel  */}

                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row mt-5">
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label> PAN: UID:</label>
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
                                            <div className="col-md-6 mt-4 mb-3 pb-4">
                                                <label>{doc.Face_Verification_Status}</label>
                                            </div>
                                        </div>        
                                    </div>
                                    
                                    { isvisible ?<div className="col-md-4">
                                        <img src={require(`/home/lokeshmalik/Desktop/JS/UserOCR/front/src/upload/${doc.Pan_Image[0].originalname}`)} className="rounded" alt="User Pan" />
                                    </div> : null}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>    
        </div>    
    </>
);
}
export default OutputResults;