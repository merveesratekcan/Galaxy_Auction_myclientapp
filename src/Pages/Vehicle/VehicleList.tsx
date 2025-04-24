import React, { useState } from 'react'
import { useGetVehiclesQuery } from '../../Api/vehicleApi'

function VehicleList() {

    const {data, isLoading} = useGetVehiclesQuery(null)
    const [write,setWriteState] = useState("data is Loading...")
    const handleClickFoVelicle = () => {
        console.log(data)
        setWriteState("data is Loaded")
    }

  return (
    <div>
        <button className='btn btn-primary' onClick={() => handleClickFoVelicle()} disabled={isLoading}>
            {isLoading ? "Loading..." : "Get Vehicles"}

        </button>
        <h1>{write}</h1>
    </div>
  )
}

export default VehicleList