import React, { useEffect,useState } from 'react';
import axios from "axios";
import { NavLink, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

const SearchAdminPanel = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [user,setuser]=useState("");
  const [user1,setuser1]=useState("");
  const [isVisible,setIsVisible] = useState(false);
  const query = useParams();

  const usersPerPage = 5;
  const pageVisited = pageNumber * usersPerPage;
  useEffect(()=>{

    console.log(query,"query here");
      axios.get("/searchAdminPanelData/"+query.query+"/"+query.searchString).then((res)=>{
       
      setuser(res.data)
      setuser1 (res.data.slice(pageVisited,pageVisited+usersPerPage))
      setIsVisible(true)
       
      }).catch((err)=>console.log(err))
    },[window.location.href]);
  
    
    const pageCount = Math.ceil(user.length / usersPerPage);
    
    const changePage = ({selected}) => {
      const yu=user.slice(pageVisited,pageVisited+usersPerPage)
      setuser1(yu)
       setPageNumber(selected)
    }

  return (
    <>
     { isVisible ? user1.map((user => {
      return(
      <div className="container mt-3">  
        <div className='row pb-3 pl-3'>
          
          <div className='col-md-2 mb-4'>
            <label>{user.Name}</label>
          </div>
          <div className='col-md-3'>
            <label>{user.Father_Name}</label>
          </div>
          <div className='col-md-4'>
            <label>{user._id}</label>
          </div>
          <div className='col-md-3 mt-3'>
          <NavLink className="btn btn-primary" to={`/adminView/${user._id}`}>View Details</NavLink>
          </div>

        </div>
      </div>  
   )
  })) : null }
    <div>
     <ReactPaginate 
     previousLabel={"Previous"}
     nextLabel={"Next"}
     pageCount={pageCount}
     onPageChange={changePage}
     containerClassName={"paginationBttns"}
     previousLinkClassName={"previousBttn"}
     nextLinkClassName={"nextBttn"}
     disabledClassName={"paginationDisabled"}
     activeClassName={"paginationActive"}
     />
     </div>    
    </>
  )
}

export default SearchAdminPanel;
