
import React from 'react';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import './Styles/VehicleList.css';
import Circle from './Circle';

interface VehicleListProps {
    vehicles: vehicleModel[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
    return (
        <>
            {vehicles.map((vehicle, index) => (
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
                        <button className="btn btn-danger">Detail</button>
                    </div>
                    <Circle vehicle={vehicle} />
                </div>
            ))}
        </>
    );
};

export default VehicleList;