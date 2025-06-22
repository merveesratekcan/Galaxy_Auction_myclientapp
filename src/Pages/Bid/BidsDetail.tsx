import React, { useEffect, useState } from 'react'
import { useGetBidsByVehicleIdQuery } from '../../Api/bidApi'
import { Loader } from '../../Helper'
import './Styles/bid.css';
import { useCheckStatusForAuctionPriceMutation } from '../../Api/paymentHistoryApi';
import { checkStatus } from '../../Interfaces/checkStatus';
import userModel from '../../Interfaces/userModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/store';
import CreateBid from './CreateBid';

function BidsDetail(props:{vehicleId:string}) {

    const {data, isLoading} = useGetBidsByVehicleIdQuery(parseInt(props.vehicleId));
    const userStore : userModel = useSelector((state: RootState) => state.authentication);
    const [checkStatusAuction] = useCheckStatusForAuctionPriceMutation();

    var model : any = {}  
    const [result, setResultState] = useState();
    


    useEffect(() => {
        console.log("triggered");
        const checkModel: checkStatus = {
        userId: userStore.nameid!,
        vehicleId: parseInt(props.vehicleId)
      }
      checkStatusAuction(checkModel).then((response : any) => {
        setResultState(response!.data?.isSuccess);

      }).catch((error: any) => {
        console.error("Error checking auction status:", error);
        })
    },[props.vehicleId, userStore.nameid,checkStatusAuction])


    if(!data) {
    return ( <Loader />)
    }


//   return (
//     <div className='bid-list'>
        
//             {
//                 data.result.map(
//                     (bid:any)=>{return(
//             <>
//             <div className='mt-4' > 
//                  <div className='bid'>   
//                 <span className='bid-number'> {bid.bidId} </span> 
//                 <span className='bidder-date'> {bid.bidDate}</span>
//                 <span className='bid-amount'> {bid.bidAmount}</span>
//             </div>
//             <br />
//             </div>
//             </>
//             )})
//             }
//     </div>
//   )
return (
     
    <>

    { 
    result ? (
        <div className='container mb-5'>
              <CreateBid></CreateBid>
        </div>
       
    ):(
        <div className='container mb-5'>
            <button className='btn btn-warning' type='button'>Pay PreAuction Price</button>
        </div>
    )
}

   
    
  <div className='bid-list'>
    {data.result.map((bid: any) => (
      <div className='mt-4' key={bid.bidId}>
        <div className='bid'>
          <span className='bid-number'>{bid.bidId}</span>
          <span className='bidder-date'>{bid.bidDate}</span>
          <span className='bid-amount'>{bid.bidAmount}</span>
        </div>
      </div>
    ))}
  </div>
  </>
)
 }


export default BidsDetail