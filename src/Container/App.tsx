import React, { useEffect } from 'react';
import './App.css';

import { Header } from '../Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VehicleDetail from '../Pages/Vehicle/VehicleDetail';
import VehicleBase from '../Pages/Vehicle/VehicleBase';
import Register from '../Pages/Account/Register';
import Login from '../Pages/Account/Login';
import { useDispatch } from 'react-redux';
import UserModel from '../Interfaces/userModel';
import { setLoggerInUser } from '../Storage/Redux/authenticationSlice';
import { jwtDecode } from 'jwt-decode';

function App() {

    const Dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        const {email,fullName, nameid, role} : UserModel= jwtDecode(token);
                    Dispatch(setLoggerInUser({
                     email,fullName, nameid, role
                    }))
        }
    })


    return (
        <div className="App">
            
            <Header />
            <div className='pd-5'>
                <Routes>
                    <Route path='Vehicle/VehicleId/:vehicleId' element={<VehicleDetail></VehicleDetail>}></Route>
                    <Route path='/' element={<VehicleBase></VehicleBase>}></Route>
                    <Route path='Register' element={<Register></Register>}></Route>
                    <Route path='Login' element={<Login></Login>}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;