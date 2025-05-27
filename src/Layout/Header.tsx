// import React from 'react'
// import './Style/Header.css';



// function Header() {
//   return (
//     <div>
//          <div>
//         <nav className="navbar navbar-expand-lg navbar-light bg-gray">
//   <div className='container' >

// <a className="navbar-brand" href="/">Galaxy Auction</a>
// <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//  <span className="navbar-toggler-icon"></span>
// </button>

// <div className="collapse navbar-collapse" id="navbarSupportedContent">
//  <ul className="navbar-nav mr-auto">
//    <li className="nav-item active">
//      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//    </li>

//    <li className="nav-item">
//      <a className="nav-link" href="#">fullanme</a>
//    </li>
//    <div className="collapse navbar-collapse mr-2" id="navbarNavDarkDropdown">
//    <ul className="navbar-nav">
//      <li className="nav-item dropdown">
//        <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//          Menu's
//        </button>
//        <ul className="dropdown-menu dropdown-menu-dark">
//         <a className="dropdown-item" href="#">Vehicle List</a>
//        </ul>
//      </li>
//    </ul>
//  </div>

//  {
//    " "? ( <li className="nav-item" style={{marginRight:"5px"}}>
//    <a type='button' className="btn btn-success "  >Logout</a>

//  </li>) : ( 
   
//    <>
//    <li className="nav-item" style={{marginRight:"5px"}}>
   
//    <a className="btn btn-success " >Register</a>

  
//  </li>
   
//    <li className="nav-item" style={{marginRight:"5px"}}>

//      <a className="btn btn-success " >Login</a>

//    </li>
   
//    </>
//    ) 
//  }

  
//  </ul>

// </div>
// </div>

// </nav>
//     </div>
//     </div>
//   )
// }

// export default Header

import React, { useEffect } from 'react';
import './Style/Header.css';
import { useSelector } from 'react-redux';
import userModel from '../Interfaces/userModel';
import { RootState } from '../Storage/store';


function Header() {

  const userStore : userModel = useSelector((state: RootState) => state.authentication);
  const token = localStorage.getItem('token');
  useEffect(() => {
    console.log("User Store:", userStore);
    console.log("triggered");
  }
  , [userStore]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gray">
      <div className="container">
        <a className="navbar-brand" href="/">Galaxy Auction</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>

            { 
            userStore ? (           
              
              <li className="nav-item">
              <a className="nav-link" href="#">
                {userStore.fullName ? userStore.fullName : "User"}
              </a>
            </li>) :" "
          }

            <li className="nav-item dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu's
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><a className="dropdown-item" href="#">Vehicle List</a></li>
              </ul>
            </li>
          </ul>
 <ul className="navbar-nav">
          {userStore ?  (
             <li className="nav-item" style={{ marginRight: "5px" }}>
              <a className="btn btn-danger" href="#">Logout</a>
            </li>
          ) : (
            <>
              <li className="nav-item" style={{ marginRight: "5px" }}>
                <a className="btn btn-success" href="#">Register</a>
              </li>
              <li className="nav-item" style={{ marginRight: "5px" }}>
                <a className="btn btn-success" href="#">Login</a>
              </li>
            </>
          )
              
          }
         
           
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;