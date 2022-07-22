import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";

const Unavbar = () => {
//   const navigate = useNavigate();
//   const [admin,setAdmin]=useState(false);
//   const [search,setSearch] = useState(false);
//   const [query,setQuery] = useState();
//   const [searchString,setSearchString] = useState();
//   var loc = window.location.href;

//   useEffect(()=>{
//     if(loc.includes("Admin")||loc.includes("admin"))
//     {
//       setAdmin(true);
//     }
//     else
//     {
//       setAdmin(false);
//       setSearch(false);
//     }
//   },[window.location.href])

//   const takeInput = (event) => {
//     console.log(event);
//     // name = event.target.name;
//     var value = event.target.value;

//     setQuery(value);

//   }

//   const findAndView = ()=>{
//     //check entered string
//     console.log("called find and view");
//     navigate("/searchAdminPanel/"+`${query}`+"/"+`${searchString}`)

//   }


//   const contact = () =>{
    
//     setQuery("");
//     setSearchString("Enter Mobile No.")
//     setSearch(true);
//   }

//   const name = () =>{
//     setQuery("");
//     setSearchString("Enter Name")
//     setSearch(true);
//     //send name with url and call function
//   }
//   const city = () =>{
//     setQuery("");
//     setSearchString("Enter City")
//     setSearch(true);
//   }
//   const pincode = () =>{
//     setQuery("");
//     setSearchString("Enter Pincode")
//     setSearch(true);
//   }

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="#">
               <img src={logo} alt='logo' to="/" width="250" height="100"/>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
           </button>
          <ul className="navbar-nav ml-auto">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <li className="nav-item">
                <NavLink className="nav-link" to="/signUp">Sign up/Register</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/userLogin">Login</NavLink>
                </li>
            </div>
         </ul>
      </nav>
    </>
  )
}

export default Unavbar
