
import React, { useEffect } from 'react';
import './Style/Header.css';
import { useDispatch, useSelector} from 'react-redux';
import userModel from '../Interfaces/userModel';
import { RootState } from '../Storage/store';
import { initialState, setLoggerInUser } from '../Storage/Redux/authenticationSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';


function Header() {

  const userStore : userModel = useSelector((state: RootState) => state.authentication);
  const token = localStorage.getItem('token');
  const Dispatch =useDispatch();
  const Navigate = useNavigate(); 

  useEffect(() => {
    console.log("User Store:", userStore);
    console.log("triggered");
  }
  , [userStore]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    Dispatch(setLoggerInUser({...initialState}));
    Navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gray">
      <div className="container">
  <Link className="navbar-brand" to="/">Galaxy Auction</Link>
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
              <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
            </li>

            { 
            userStore ? (           
              
              <li className="nav-item">
              <span className="nav-link">
                {userStore.fullName ? userStore.fullName : "User"}
              </span>
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
                <li><NavLink className="dropdown-item" to="/">Vehicle List</NavLink></li>
              </ul>
            </li>
          </ul>
 <ul className="navbar-nav">
          {userStore.nameid !="" ?  (
             <li className="nav-item" style={{ marginRight: "5px" }}>
              <button type='button' className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item" style={{ marginRight: "5px" }}>
                <NavLink className="btn btn-success" to="/register">Register</NavLink>
              </li>
              <li className="nav-item" style={{ marginRight: "5px" }}>
                <NavLink className="btn btn-success" to="/login">Login</NavLink>
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