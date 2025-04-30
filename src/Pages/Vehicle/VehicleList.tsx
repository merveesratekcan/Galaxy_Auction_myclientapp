import React, { useEffect, useState } from 'react'
import { useGetVehiclesQuery } from '../../Api/vehicleApi'
import { vehicleModel } from '../../Interfaces/vehicleModel'

function VehicleList() {
    const { data, isLoading } = useGetVehiclesQuery(null)
    const [vehicles, setVehicleState] = useState<vehicleModel[]>([])

    useEffect(() => {
        if (data && data.$values) {
            setVehicleState(data.$values)
        }
    }, [data])


    return (
        <div className='container'>
            {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                    <div key={index} className='auction-card text-center'>
                        <div className='card-image text-center'>
                            <img src={vehicle.image} alt="" />
                        </div>
                        <div className='card-details text-center'>
                            <h2>{vehicle.brandAndModel}</h2>
                            <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
                            <p><strong>Price:</strong> {vehicle.price}</p>
                            <p><strong>Mileage:</strong> {vehicle.mileage}</p>
                            <p><strong>Color:</strong> {vehicle.color}</p>
                            <p><strong>Engine Capacity:</strong> {vehicle.engineCapacity}</p>
                            <p><strong>Plate Number:</strong> {vehicle.plateNumber}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div>No vehicles found</div>
            )}
        </div>
    )
}

export default VehicleList