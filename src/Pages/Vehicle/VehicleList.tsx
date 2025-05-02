import React, { useEffect, useState } from 'react';
import { useGetVehiclesQuery } from '../../Api/vehicleApi';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import './Styles/VehicleList.css';
import Circle from './Circle';

function VehicleList() {
    const { data, isLoading } = useGetVehiclesQuery(null);
    const [vehicles, setVehicleState] = useState<vehicleModel[]>([]);

    useEffect(() => {
        console.log(data); // Gelen veriyi kontrol edin
        if (data && data.result && data.result.$values) {
            setVehicleState(data.result.$values); // Doğru veriyi alın
        } else {
            setVehicleState([]); // Eğer veri yoksa boş bir dizi atayın
        }
    }, [data]);

    return (
        <div className='container'>
            <div className='row '>
            {
             vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                  
                    <div key={index} className='auction-card text-center'>
                        <div className='card-image text-center'>
                            <img 
                                src={vehicle.image || 'https://via.placeholder.com/150'}                               
                            />
                        </div>
                        <div className='card-details text-center'>
                            <h2>{vehicle.brandAndModel}</h2>
                            <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
                            <p><strong>Color:</strong> {vehicle.color}</p>
                            <p><strong>Current Bid:</strong> ${vehicle.price}</p>
                            <p><strong>End Time:</strong> {vehicle.endTime}</p>
                        </div>
                        <div className='card-actions text-center'>
                            <button className='btn btn-danger'>Detail</button>
                        </div>
                        <Circle vehicle={vehicle}></Circle>
                    </div>
                    
                ))
            ) : (
                <div>No vehicles found.</div>
            )}
            </div>           
        </div>
    );
}

export default VehicleList;