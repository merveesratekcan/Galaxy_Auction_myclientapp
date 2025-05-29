import React, { useEffect, useState } from 'react';
import { useGetVehiclesQuery } from '../../Api/vehicleApi';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import VehicleList from './VehicleList';

function VehicleBase() {
    const { data, isLoading } = useGetVehiclesQuery(null);
    const [vehicles, setVehicleState] = useState<vehicleModel[]>([]);

    useEffect(() => {
        console.log("API Response:", data); // Debug için
        if (data && Array.isArray(data.result)) {
            setVehicleState(data.result);
        } else {
            setVehicleState([]);
        }
    }, [data]);

    return (
        <div className='container'>
            <div className='row'>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <VehicleList vehicles={vehicles} />
                )}
            </div>
        </div>
    );
}

export default VehicleBase;