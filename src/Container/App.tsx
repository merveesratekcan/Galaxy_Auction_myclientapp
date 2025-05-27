import React from 'react';
import './App.css';

import { Header } from '../Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VehicleDetail from '../Pages/Vehicle/VehicleDetail';
import { VehicleList } from '../Pages/Vehicle';
import VehicleBase from '../Pages/Vehicle/VehicleBase';
import Register from '../Pages/Account/Register';
import Login from '../Pages/Account/Login';

function App() {
    return (
        <div className="App">
            
            <Header />
            {/* <VehicleBase /> */}
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