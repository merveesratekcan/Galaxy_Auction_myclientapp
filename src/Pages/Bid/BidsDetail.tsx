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
import { useGetVehicleByIdQuery } from '../../Api/vehicleApi';
import { useNavigate } from 'react-router-dom';
import { bidModel } from '../../Interfaces/bidModel';

function BidsDetail(props:{vehicleId:string}) {

    const {data, isLoading} = useGetBidsByVehicleIdQuery(parseInt(props.vehicleId));
    const userStore : userModel = useSelector((state: RootState) => state.authentication);
    const [checkStatusAuction] = useCheckStatusForAuctionPriceMutation();

    var model : any = {}  
    const [result, setResultState] = useState();
    const Navigate = useNavigate();

    const response_data = useGetVehicleByIdQuery(parseInt(props.vehicleId));
    if(response_data) {
        console.log(response_data.currentData?.result.auctionPrice);
    }
    
     useEffect(() => {
        
     }, [data]);


    useEffect(() => {
        console.log("triggered");
        const checkModel: checkStatus = {
        userId: userStore.nameid!,
        vehicleId: parseInt(props.vehicleId)
      }
      checkStatusAuction(checkModel).then((response : any) => {
        setResultState(response!.data?.isSuccess)

      }).catch((error) => {
        console.error("Error checking auction status:", error);
        })
    },[props.vehicleId, userStore.nameid,checkStatusAuction])

   
    const handleBidCheckout = (props:any) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Navigate('/login');
        }
        Navigate(`/Vehicle/BidCheckout/${props}`);
    }


    if(!data) {
    return ( <Loader />)
    }


return (
     
    <>

    { 
    result ? (
        <div className='container mb-5'>
              <CreateBid vehicleId={parseInt(props.vehicleId)}></CreateBid>
        </div>
       
    ):(
        <div className='container mb-5'>
            <button className='btn btn-warning' type='button' onClick={()=>handleBidCheckout(props.vehicleId)}>Pay PreAuction Price ${response_data.currentData?.result.auctionPrice} </button>
        </div>
    )
}

   
    
  <div className='bid-list'>
    {data.result.slice().sort((a: bidModel, b: bidModel) => b.bidAmount - a.bidAmount).map((bid: any) => (
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