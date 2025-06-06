import React from 'react'
import { useGetBidsByVehicleIdQuery } from '../../Api/bidApi'
import { Loader } from '../../Helper'
import './Styles/bid.css';

function BidsDetail(props:{vehicleId:string}) {

    const {data, isLoading} = useGetBidsByVehicleIdQuery(parseInt(props.vehicleId))

 console.log(data)
 if(!data) {
    return (
        <Loader />
    )
    }

  return (
    <div className='bid-list'>
        
            {
                data.result.map(
                    (bid:any)=>{return(
                 <>
                 <div className='mt-4' > 
            <div className='bid'>   
                <span className='bis-number'> {bid.bidId} </span> 
                <span className='bidder-date'> {bid.bidDate}</span>
                <span className='bid-amount'> {bid.bidAmount}</span>
            </div>
            <br />
            </div>
                 </>
                    )}
                )
            }

        
    </div>
  )
}

export default BidsDetail