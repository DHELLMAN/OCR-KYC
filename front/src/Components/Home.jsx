import React from 'react';
import { NavLink } from 'react-router-dom';
import Unavbar from "./Unavbar";


const Home = () => {
  return (
    <>
    <Unavbar/>
      <div className='home-page'>
        <div className='home-div'>
          <h1> WELCOME</h1>
          <h2>We provide OCR services here.</h2>
          <h2>Kindly click on below link to begin</h2>
          <center>
          <NavLink className="btn btn-success" to="/signUp">Please Register Yourself</NavLink>
        </center>
        </div>
      </div>
    </>
  );
}

export default Home
