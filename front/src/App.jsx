import React from "react";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Error from "./Components/Error";
import {Route, Routes} from 'react-router-dom';
import OutputResults from "./Components/OutputResults";
import ClickPicture from "./Components/ClickPicture";
import InputData from "./Components/InputData";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AdminPanel from "./Components/AdminPanel";
import AdminView from "./Components/AdminView";
import Login from "./Components/Login";
import SearchAdminPanel from "./Components/SearchAdminPanel";

// import Test from "./Test";

const App = () => {
    
    return(
        <>
        {/* <Navbar/> */}
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/inputData" element={<InputData/>} />
            <Route path="/clickPicture/:id" element={<ClickPicture/>} />
            <Route path="/outputResults/:id" element={<OutputResults/>}/>
            <Route path="/login" element={<Login/>}/>
            //user registration route
            //user login router
            <Route path="/adminPanel" element={<AdminPanel/>}/>
            <Route path="/adminView/:id" element={<AdminView/>}/>
            <Route path="/searchAdminPanel/:query/:searchString" element={<SearchAdminPanel/>}/>
            <Route path ="*" element={<Error/>} />
        </Routes>
        </>
    );
}

export default App;