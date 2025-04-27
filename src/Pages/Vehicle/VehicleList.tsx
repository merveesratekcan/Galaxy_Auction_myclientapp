import React, { useEffect, useState } from 'react'
import { useGetVehiclesQuery } from '../../Api/vehicleApi'
import { vehicleModel } from '../../Interfaces/vehicleModel'

function VehicleList() {

    const {data, isLoading} = useGetVehiclesQuery(null)
    const [vehicles, setVehicleState] = useState<vehicleModel[]>([])

    useEffect(()=>{
      if (data ) {
        setVehicleState(data.result);
       
  
      }
     
    },[data])


  return (
    <div className='container'>

      {
        vehicles.map((vehicle,index) => {
          return (
            <div className='auction-card text-center'> 
            <div className='card-image text-center'>
              <img src={vehicle.image} > 
              </img>
            </div>
            <div className='card-details text-center'>
              <h2></h2>
              <p><strong></strong></p>
              <p><strong></strong></p>
              <p><strong></strong></p>
              <p><strong></strong></p>
            </div>
          </div>

          )
      })
}
</div>
  )
}

export default VehicleList