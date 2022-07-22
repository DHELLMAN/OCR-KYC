import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import * as tf from '@tensorflow/tfjs';
import * as blazeface from "@tensorflow-models/blazeface";
import Navbar from "./Navbar";


const ClickPicture = () => {
    const navigate = useNavigate();
    const id = useParams();
    console.log(id.id);
    const [isVisible,setIsVisible] = useState(false);
    
    const[line,setLine] = useState("Smile Press for the Camera =>");
    var dataUrl;

    const removeButton =() => {
        var elem = document.getElementById('start-camera');
        elem.parentNode.removeChild(elem);
        return false;
    }

    const faceDetect = async() =>{

        console.log("detectingface");
        const model = await blazeface.load();
        const returnTensors = false;
        const predictions = await model.estimateFaces(document.querySelector('#canvas'),returnTensors);

        console.log(predictions);

        if(predictions.length==0)
        {
            window.alert("No face detected");
            tryAgain();
        }
        else if(predictions.length==1)
        {
            setTimeout(satisfied,1000);
        }
        else
        {
            window.alert("Only 1 face is allowed");
            tryAgain();
        }
    }

    const tryAgain = ()=>{
        let text = "Do you want to try again";
        if (window.confirm(text) == true) 
          {
             window.alert("Picture will be again captured in 2 seconds");
             setTimeout(clickImage,2000);           
          } 
        else 
          {
                 window.alert("Redirecting to Home page");
                 navigate("/");      
          }
        }
    // const sideWorkStart = ()=>{
    //     var x = document.querySelector("#notfound1");
    //     // var y = document.querySelector("#saving picture");
    //     x.setAttribute("style","opacity:0.5");
    //     // y.setAttribute("style","opacity:1");
    //     setIsVisible(true);

    // }
    // const sideWorkEnd = ()=>{
    //     var x = document.querySelector("#notfound1");
    //     x.setAttribute("style","opacity:1");
    //     setIsVisible(false);

    // }

    const startCamera = async () => {

                removeButton();
                setLine("Picture will be clicked in 5 seconds automatically");
                let video = document.querySelector("#video");

                // camera_button.addEventListener('click', async function() {
                    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                    video.srcObject = stream;
                    setTimeout(clickImage,5000);
                    
                   
                // });

    }

    const clickImage = () => {
               
               
                let canvas = document.querySelector("#canvas");
                let video = document.querySelector("#video");
        
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                dataUrl = canvas.toDataURL('image/jpeg');
                
                faceDetect();
                // setTimeout(satisfied,1000);
            }
               
            const satisfied = () =>{
                   let text = "Do you want to continue with this image";
                    if (window.confirm(text) == true) 
                    {
                        setIsVisible(true);
                        // sideWorkStart();
                        sendImage();
                    } 
                    else 
                    {
                        alert("Capturing again");
                        setLine("In 5 seconds picture will be clicked again automatically");
                        setTimeout(clickImage,5000);
                    }

                }
           const sendImage = async () => {
            //    console.log(dataUrl,"sending here");
                       
                const pic = new FormData();
                pic.append("user_image",dataUrl);
                pic.append("user_id",id.id)
                console.log(pic,"pic here");

               await axios.post("/capture",pic)
               .then((res)=>{
                // sideWorkEnd();
                setIsVisible(false);
                console.log(res.data);
                console.log(res.status);
                setTimeout(()=>{

               if(res.status == 401 || !res)
                {
                window.alert("Picture could not be saved. Trying again.");
                console.log("Error hai");
                alert("Capturing again");
                setLine("In 5 seconds picture will be clicked again automatically");
                setTimeout(clickImage,1000);
                }
               else
                {
                window.alert(`Picture Captured Successfully`);
                navigate("/outputResults/"+id.id);
                }
            },1000);
               }).catch((error)=>{
                   console.log(error);
               })
              
               
           };     
             

           return (
               <>
               <Navbar/>
            {/* <div className="container mt-5">
                <div className="signup-content">
                   <h2 id="line">{line}</h2>
                   <div className="form-group form-button">
                        <input type="submit" name="signup" id="start-camera" onClick={startCamera} className="form-submit" value="SMILE"/>
                    </div>
                   
                </div>   
                <div className="signup-content">
                    <video id="video" width="320" height="240" autoPlay></video>
                </div>
                <br/>
                <div className="signup-content">
                <canvas id="canvas" width="320" height="240"></canvas>
                </div>
                <img src={dataUrl} alt="" />
            </div> */}

            <div className="container mt-5">                
              <div id="notfound1">
                <div className="signup-content">
                   <h4 id="line">{line}</h4>
                   <div className="form-group form-button">
                        <input type="submit" name="signup" id="start-camera" onClick={startCamera} className="form-submit" value="SMILE"/>
                    </div>
                   
                </div>   
                <div className="signup-content">
                    <video id="video" width="320" height="240" autoPlay></video>
                </div>


                
                    <div className="notfound1">
                        <div className="notfound-4041">
                            <h1>{ isVisible ? <div class="loading" delay-hide="50000"></div> : null}
                            </h1>
                        </div>
                    </div>
                


                <br/>
                <div className="signup-content">
                <canvas id="canvas" width="320" height="240"></canvas>
                </div>
                <img src={dataUrl} alt="" />
              </div> 
              
            </div>
        </>
    );

};

export default ClickPicture;