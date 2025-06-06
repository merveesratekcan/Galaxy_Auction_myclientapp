import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetVehicleByIdQuery } from '../../Api/vehicleApi'
import { Loader } from '../../Helper';
import './Styles/VehicleDetail.css'
import BidsDetail from '../Bid/BidsDetail';


function VehicleDetail() {
    //UseParams su ise yarar : URL'den parametre almak için kullanılır.
    //Örneğin: /vehicle/:vehicleId şeklinde bir URL varsa, vehicleId parametresini almak için kullanılır.
    const { vehicleId } = useParams();
    const{data,isLoading}=useGetVehicleByIdQuery(vehicleId)
    //useGetVehicleByIdQuery, vehicleApi'den gelen bir sorgudur. vehicleId parametresini alır ve ilgili veriyi getirir.
    const safeVehicleId = vehicleId ? vehicleId : '';
    // vehicleId'nin boş olup olmadığını kontrol eder. Eğer boşsa, safeVehicleId değişkenine boş bir string atar.
    if(data){
        console.log(data)
    }
    if(isLoading){
        return(
            <div className='flex justify-center items-center h-screen'>
                <Loader/>
            </div>
        )
       
    }

  return (

    <> 
    <div className='auction-item text-center'>
        <h1 className='text-2xl font-bold mb-4'>Vehicle Detail</h1>
        <img className='container' src={data.result.image}></img>
        <h2>Brand-Model:{data.result.brandAndModel}</h2>
        <p>Description:{data.result.additionalInformation}</p>
        <p>Currend Bid:</p>
        <p>Last Bidder:</p>
    </div>

    <BidsDetail vehicleId={safeVehicleId}></BidsDetail>
    </>
  )
}

export default VehicleDetail