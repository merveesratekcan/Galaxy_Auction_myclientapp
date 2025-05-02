
import React, { useEffect, useState } from 'react';
import { useGetVehiclesQuery } from '../../Api/vehicleApi';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import VehicleList from './VehicleList';

function VehicleBase() {
    const { data, isLoading } = useGetVehiclesQuery(null);
    const [vehicles, setVehicleState] = useState<vehicleModel[]>([]);

    useEffect(() => {
        console.log(data); // Gelen veriyi kontrol edin
        if (data && data.result && Array.isArray(data.result.$values)) {
            setVehicleState(data.result.$values); // Doğru veriyi alın
        } else {
            setVehicleState([]); // Eğer veri yoksa boş bir dizi atayın
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