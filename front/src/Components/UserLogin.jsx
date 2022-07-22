import React, { useState } from 'react';
import ocrlogo from "../images/ocrLogo.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';

const UserLogin = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        Name: "",
        Contact:null,
        Password: ""
      });  
    
      let name, value;      

    const takeInput = (event) => {
        console.log(event);
        name = event.target.name;
        value = event.target.value;
  
        setUser({...user,[name]:value});
  
      }

        const sendData = async(event) => {
            event.preventDefault();
            
            const { Name, Contact, Password } = user;

            await axios.post("/userlogin",{
              Name,
              Contact,
              Password
            }).then((res)=>{
            
                if(res.data.status)
                {
                    const id = res.data.user._id;
                    const pageToRender = res.data.redirectTo;
                    if(pageToRender==="inputData")
                    {
                      window.alert(`Welcome ${Name}.`);
                      navigate(`/inputData/${id}`);
                    }
                    else if(pageToRender==="clickPicture")
                    {
                      window.alert(`Welcome Back ${Name}.`);
                      window.alert("Image Capturing step is left for you. Please be in a lighted area.")
                      navigate(`/clickPicture/${id}`);
                    }
                    else
                    {
                      window.alert(`Welcome Back ${Name}.`);
                      navigate(`/outputResults/${id}`);
                    }
                }
                else
                {
                  window.alert(res.data.msg)
                    window.alert("Bad Credentials");
                    navigate("/userLogin");
                }
                
        
            }).catch ((err)=> {
                window.alert("Bad Credentials");
                // navigate("/");
                console.log(err);
              })

        }; 
    return (
    <>
    <Unavbar/>
      <section className="sign-in">
            <div className="container mt-5">
              <div className="signin-content">
              <div className="signin-image">
                  <figure>
                    <img src={ocrlogo} alt="ocr logo" />
                  </figure>
                  <p className="signin-immage-link"> OPTICAL CHARACTER RECOGNITION</p>
                </div>
                <div className="signin-form">
                  <form className="register-form " id="register-form" method="post"  encType="multipart/form-data">
                  
                    <div className="form-group"> 
                        <label htmlFor="username">
                          <i class="zmdi zmdi-male-alt material-icons-name"></i>
                        </label>
                        <input type='text' id="username" placeholder="Enter Name" name="Name" autoComplete='off' onChange={takeInput} value={user.Name}/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="mobile">
                          <i class="zmdi zmdi-phone material-icons-name"></i>
                        </label>
                        <input type='number' id="mobile" placeholder="Enter Contact" name="Contact" onChange={takeInput} value={user.Contact} />
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="password">
                          <i class="zmdi zmdi-lock material-icons-name"></i>
                        </label>
                        <input type='password' id="password" placeholder="Enter Password" name="Password" onChange={takeInput} value={user.Password}/>
                    </div>
                    
                    <div className="form-group form-button">
                        <input type="submit" onClick={sendData} name="signin" id="signin" className="form-submit" value="Submit"/>
                    </div>    
                  </form>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}

export default UserLogin;
