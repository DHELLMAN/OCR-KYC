import { useState } from "react";
import React from "react";
import ocrlogo from "../images/ocrLogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Unavbar from "./Unavbar";

const SignUp = () => {

    const navigate = useNavigate();
    const [user,setUser] = useState({
      Name: "",
      Father_Name: "",
      Contact: null,
      Password: "",
      Confirm_Password: ""
    });  
  
    let name, value, id;
    
    const takeInput = (event) => {
      console.log(event);
      name = event.target.name;
      value = event.target.value;

      setUser({...user,[name]:value});

    }
    
    const sendData = async  (event)=>{
        event.preventDefault();

        const { Name, Father_Name, Contact, Password} = user;

        await axios.post("/register",{
          Name,
          Father_Name,
          Contact,
          Password
        })
        .then((res)=>{
          
        if(!res.data.status)
        {
          window.alert("Data could not be sent. Try again after some time.");
          console.log("Error hai");
        }
        else
        {
          window.alert(`Welcome ${Name}. You have succesfully registered yourself. Kindly Login.`);
          navigate("/userLogin");
        }
        }).catch ((err)=> {
          console.log(err);
        })
       
    }
    
      return (
        <>
        <Unavbar/>
          <section className="signup">
            <div className="container mt-5">
              <div className="signup-content">
                <div className="signup-form">
                  <h2 className="form-title pl-5"> Welcome to OCR technology</h2>
                  <form className="register-form" id="register-form" method="post" /*action="../../post"*/  encType="multipart/form-data">
                  
                    <div className="form-group"> 
                        <label htmlFor="username">
                          <i class="zmdi zmdi-male-alt material-icons-name"></i>
                        </label>
                        <input type='text' id="username" placeholder="Enter Your name" name="Name" onChange={takeInput} value={user.Name}/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="father">
                          <i class="zmdi zmdi-male-alt material-icons-name"></i>
                        </label>
                        <input type='text' id="father" placeholder="Enter Your Father's name" name="Father_Name" onChange={takeInput} value={user.Father_Name} />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="mobile">
                          <i class="zmdi zmdi-phone material-icons-name"></i>
                        </label>
                        <input type='number' id="mobile" placeholder="Enter Contact Number" name="Contact" onChange={takeInput} value={user.Contact} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pass">
                          <i class="zmdi zmdi-lock"></i>
                        </label>
                        <input type="password" id="pass" placeholder='Password' name='Password' onChange={takeInput} />  
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmpass">
                          <i class="zmdi zmdi-shield-check"></i>
                        </label>
                        <input type="password" id="confirmpass" placeholder='Confirm Password' name='Confirm_Password' onChange={takeInput} />
                    </div>
                    
                    <div className="form-group form-button mb-3">
                        <input type="submit" onClick={sendData} name="signup" id="signup" className="form-submit" value="Create User"/>
                    </div>    
                  </form>
                </div>
                <div className="signup-image">
                  <figure>
                    <img src={ocrlogo} alt="ocr logo" />
                  </figure>
                  <p className="signup-immage-link"> OPTICAL CHARACTER RECOGNITION</p>
                  <span>Already Have an Account ? <Link to="/userLogin">Login</Link></span>
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

export default SignUp;