import React, { useState } from 'react'
import { useSignInMutation } from '../../Api/accountApi';
import { apiResponse } from '../../Interfaces/apiResponse';
import { useDispatch } from 'react-redux';
import UserModel from '../../Interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { setLoggerInUser } from '../../Storage/Redux/authenticationSlice';
import { useNavigate } from 'react-router-dom';


function Login() {
  
    const [useData, setUserDataState] = useState({
     userName: '',
     password: '',
   
    });

    const navigate = useNavigate();
    const [userSignInMutation] = useSignInMutation();

    const Dispatch = useDispatch();


    const handleLoginSubmit = async () => {
        const response : apiResponse = await userSignInMutation({
            userName: useData.userName.trim(),
            password: useData.password.trim(),
        })  
        if(response.data?.isSuccess){
            const token = response.data.result.token;
            localStorage.setItem('token', token);
            const {email,fullName, nameid, role} : UserModel= jwtDecode(token);
            Dispatch(setLoggerInUser({
             email,fullName, nameid, role
            }))
            navigate('/'); // Redirect to home page after successful login
        }  
    }

  return (
     <section>
    <div className="container">
      
      <div className="alert alert-warning text-center my-4">
        For Example
      </div>
      
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8 col-xl-6">
          <div className="row">
            <div className="col text-center">
              <h1>Login</h1>
              <p className="text-h3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. </p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col mt-4">
              <input type="text" className="form-control" placeholder="UserName" 
              onChange={(e) => setUserDataState((prevState)=>{return{...prevState,userName:e.target.value}})}/>
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
              <input type="password" className="form-control" placeholder="Password"
               onChange={(e) => setUserDataState((prevState)=>{return{...prevState,password:e.target.value}})}/>
            </div>
          </div>
          <div className="row justify-content-start mt-4">
            <div className="col">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input"/>
                  I Read and Accept <a href="https://www.froala.com">Terms and Conditions</a>
                </label>
              </div>

              <button className="btn btn-primary mt-4" onClick={handleLoginSubmit}>
                Submit
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login