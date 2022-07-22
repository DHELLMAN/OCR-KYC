import { useEffect, useState } from "react";
import React from "react";
import ocrlogo from "../images/ocrLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

const InputData = () => {

    const navigate = useNavigate();
    const [address, setAddress] = useState();
    const id = useParams();
    const [user,setUser] = useState({
      userAadhaar: "",
      userPan: "",
      geoLocation: "",
    });  
  
    
    let name, value;

    const takeInput = (event) => {
      console.log(event);
      name = event.target.name;
      value = event.target.value;

      setUser({...user,[name]:value});

    }
    
    const sendData = async  (event)=>{
        event.preventDefault();
      
        const aad = document.querySelector('#aadhaar').files[0];
        const pan = document.querySelector('#pan').files[0];

        const formData = new FormData();
        formData.append("userId",id.id);
        formData.append("userAadhaarCard",aad);
        formData.append("userPanCard",pan);
        formData.append("userGeoLocation",user.geoLocation);
        formData.append("fullAddress",address);
        
        await axios.post("/post",formData)
        .then((res)=>{
         
        if(res.status === 401 || !res)
        {
          window.alert("Data could not be sent. Try again after some time.");
          console.log("Error hai");
        }
        else
        {
          window.alert(res.data);
          window.alert("In the next step, your image will be captured. Please be in proper lighted area.\nThank You");
          navigate(`/clickPicture/${id.id}`);
        }
        }).catch ((err)=> {
          console.log(err);
        })
       
    }

    const getLocation= (event) => {
     
        event.preventDefault();
        // setPopup(true);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }
      
    const showPosition = async (position) => {
        var location = "Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude;
        
        var x = document.getElementById("fetch");
        name = x.name;
        setUser({...user,[name]:location});

        const add = await axios.request(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`);
        console.log(add.data.address);
        const { suburb, city_district, city, state, country, postcode } = add.data.address;
       const a = `${suburb}, ${city_district}, ${city}, ${state}, ${country}. Zipcode: ${postcode}`;

       setAddress(a);
      }

      return (
        <>
        <Navbar/>
          <section className="signup">
            <div className="container mt-5">
              <div className="signup-content">
                <div className="signup-form">
                  <h2 className="form-title pl-5"> Welcome to OCR technology</h2>
                  <form className="register-form" id="register-form" method="post" /*action="../../post"*/  encType="multipart/form-data">
                  
                    <center>
                      <h6>Please upload your Aadhaar and Pan Card</h6>
                    </center>
                    <div className="form-group">
                        <label htmlFor="aadhaar">
                          <i class="zmdi zmdi-file material-icons-name"></i>
                          {/* Upload Aadhaar: */}
                        </label>
                        <input type="file" accept=".jpg" id="aadhaar"  name="userAadhaar" onChange={takeInput} value={user.userAadhaar}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pan">
                          <i class="zmdi zmdi-file material-icons-name"></i>
                          {/* Upload PAN: */}
                        </label>
                        <input type="file" accept=".jpg" id="pan"  name="userPan" onChange={takeInput} value={user.userPan}/>
                    </div>
                    <div className="form-group form-button">
                        <label htmlFor="fetch">
                        <i class="zmdi zmdi-gps-dot material-icons-name"></i>
                        </label>                        
                        <input type='text' id="fetch" placeholder="Press 'Fetch Location' Button to get your location" name="geoLocation" /*onChange={takeInput}*/ value={user.geoLocation}/>
                        
                    </div>
                    <div className="form-group form-button">
                       <button onClick={getLocation}>Fetch My Location</button>
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" onClick={sendData} name="signup" id="signup" className="form-submit" value="Submit"/>
                    </div>    
                  </form>
                </div>
                <div className="signup-image">
                  <figure>
                    <img src={ocrlogo} alt="ocr logo" />
                  </figure>
                  <p className="signup-immage-link"> OPTICAL CHARACTER RECOGNITION</p>
                </div>
              </div>
            </div>
          </section>
        </>
      );

    // return (
    // <>
    // <div className="main_div">
      //  <form action="../../post" method="post" encType="multipart/form-data">
      //       <div>
      //           <h1> Welcome to OCR technology</h1>
      //           <input type='text' placeholder="Enter Your name" name="Name" onChange={inputEvent} value={name}/>
      //           <br/>
      //           <input type='text' placeholder="Enter Your Father's name" name="fName"/>
      //           <br/>
      //           <label htmlFor="aadhaar">Upload Aadhaar:</label>
      //           <input type="file" accept=".jpg" id="aadhaar" onChange={inputFile} name="userAadhaar"/>
      //           <br/>
      //           <label htmlFor="pan">Upload PAN:</label>
      //           <input type="file" accept=".jpg" id="pan" name="userPAN"/>
      //           <br/>
      //           <input type='text' placeholder="Press 'Fetch Location' Button to get your location" name="userLocation" value={userLocation}/>
      //           <button onClick={getLocation}>Fetch My Location</button>
      //           <br/>
      //           <button type="submit"> Submit </button>
      //     </div>
      //   </form>
    // </div>        
    // </>
    // );
}

export default InputData;