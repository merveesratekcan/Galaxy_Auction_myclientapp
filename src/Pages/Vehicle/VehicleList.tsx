
import React from 'react';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import './Styles/VehicleList.css';
import Circle from './Circle';
import { Link } from 'react-router-dom';
import Banner from './Banner';

interface VehicleListProps {
    vehicles: vehicleModel[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
    return (
        <>
        <Banner></Banner> 
            {vehicles.map((vehicle, index) => (
                
                <div className='container' key={index}>
                     
                <div key={index} className="auction-card text-center">
                    <div className="card-image text-center">
                        <img
                            src={vehicle.image || 'https://via.placeholder.com/150'}
                            alt={vehicle.brandAndModel}
                        />
                    </div>
                    <div className="card-details text-center">
                        <h2>{vehicle.brandAndModel}</h2>
                        <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
                        <p><strong>Color:</strong> {vehicle.color}</p>
                        <p><strong>Current Bid:</strong> ${vehicle.price}</p>
                        <p><strong>End Time:</strong> {vehicle.endTime}</p>
                    </div>
                    <div className="card-actions text-center">
                        <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
                        <button className="btn btn-danger">Detail</button>
                        </Link>
                        
                    </div>
                    <Circle vehicle={vehicle} />
                </div>
                </div>
            ))}
        </>
    );
};

export default VehicleList;