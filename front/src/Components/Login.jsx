import React, { useState } from 'react';
import ocrlogo from "../images/ocrLogo.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        userName: "",
        password: ""
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
            const formData = new FormData();
            formData.append("userName",user.userName);
            formData.append("password",user.password);

            await axios.post("/login",formData).then((res)=>{
            
                if(res.status == 201)
                {
                    window.alert(`Welcome ${user.userName}.`);
                    navigate("/adminPanel");
                }
                else
                {
                    window.alert("Bad Credentials");
                    navigate("/login");
                }
                
        
            }).catch ((err)=> {
                window.alert("Bad Credentials");
                navigate("/");
                console.log(err);
              })

        }; 
    return (
    <>
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
                  <h2 className="form-title pl-5"> Please fill Admin Credentials</h2>
                  <form className="register-form" id="register-form" method="post"  encType="multipart/form-data">
                  
                    <div className="form-group"> 
                        <label htmlFor="username">
                          <i class="zmdi zmdi-male-alt material-icons-name"></i>
                        </label>
                        <input type='text' id="username" placeholder="Enter Username" name="userName" autoComplete='off' onChange={takeInput} value={user.userName}/>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="password">
                          <i class="zmdi zmdi-lock material-icons-name"></i>
                        </label>
                        <input type='password' id="password" placeholder="Enter Password" name="password" onChange={takeInput} value={user.password}/>
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

export default Login;
