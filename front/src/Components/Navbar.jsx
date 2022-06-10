import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [admin,setAdmin]=useState(false);
  const [search,setSearch] = useState(false);
  const [query,setQuery] = useState();
  const [searchString,setSearchString] = useState();
  var loc = window.location.href;

  useEffect(()=>{
    if(loc.includes("Admin")||loc.includes("admin"))
    {
      setAdmin(true);
    }
    else
    {
      setAdmin(false);
      setSearch(false);
    }
  },[window.location.href])

  const takeInput = (event) => {
    console.log(event);
    // name = event.target.name;
    var value = event.target.value;

    setQuery(value);

  }

  const findAndView = ()=>{
    //check entered string
    console.log("called find and view");
    navigate("/searchAdminPanel/"+`${query}`+"/"+`${searchString}`)

  }


  const contact = () =>{
    
    setQuery("");
    setSearchString("Enter Mobile No.")
    setSearch(true);
  }

  const name = () =>{
    setQuery("");
    setSearchString("Enter Name")
    setSearch(true);
    //send name with url and call function
  }
  const city = () =>{
    setQuery("");
    setSearchString("Enter City")
    setSearch(true);
  }
  const pincode = () =>{
    setQuery("");
    setSearchString("Enter Pincode")
    setSearch(true);
  }

  return (
    <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="#">
               <img src={logo} alt='logo' width="250" height="100"/>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
           </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          { search ?
          <input class="form-control form-inline w-25 ml-auto" type="search" placeholder={searchString} onChange={takeInput} value={query} aria-label="Search"/>
          : null 
          }
          { search ? 
          <button class="btn btn-default border btn-md ml-1" onClick={findAndView}><i class="zmdi zmdi-search"></i></button>   
          : null
          }
          <ul className="navbar-nav ml-auto">
            { admin ?
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Search
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" onClick={contact}>Via Contact</a>
                <a class="dropdown-item" onClick={name}>Via Name</a>
                <a class="dropdown-item" onClick={city}>Via City</a>
                <a class="dropdown-item" onClick={pincode}>Via Pincode</a>
              </div>
            </li> : null
            }
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inputData">Input Data</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/clickPicture">Click Picture</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/outputResults">Dashboard</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
