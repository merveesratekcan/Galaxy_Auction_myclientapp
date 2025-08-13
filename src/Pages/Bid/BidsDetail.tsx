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
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { apiResponse } from '../../Interfaces/apiResponse';
import { newBidModelResponse } from '../../Interfaces/newBidModelResponse';

function BidsDetail(props:{vehicleId:string}) {

    const {data, isLoading} = useGetBidsByVehicleIdQuery(parseInt(props.vehicleId));
    const userStore : userModel = useSelector((state: RootState) => state.authentication);
    const bidStore:any = useSelector((state: RootState) => state.bidStore);
    const [hubConnection, setHubConnection] = useState<HubConnection>();
    const [triggerConnection, setTriggerConnection] = useState<boolean>();
    const [checkStatusAuction] = useCheckStatusForAuctionPriceMutation();

    var model : any = {}  
    const [result, setResultState] = useState();
    const[variable, setVariable] = useState();
    const[bidState, setBidState] = useState<newBidModelResponse[]>([]);
    const Navigate = useNavigate();

    const response_data = useGetVehicleByIdQuery(parseInt(props.vehicleId));
    if(response_data) {
        console.log(response_data.currentData?.result.auctionPrice);
    }
    
     useEffect(() => {
        if(data) {
        setBidState(data.result);
      }
        createHubConnection();
     },[data]);

     const createHubConnection= async()=> {
      const hubConnection=new HubConnectionBuilder().withUrl("https://localhost:7214/BidUpdate/Hub").configureLogging(LogLevel.Information).build();
       
      try {
        await hubConnection.start();
        console.log("Hub connection started");
      } catch (error) {
        console.log("Error starting hub connection:", error);
      }
      setHubConnection(hubConnection);

     }
 


      useEffect(() => {      
       if (hubConnection) {
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

        hubConnection.send("NewBid",parseInt(props.vehicleId)).catch((error) => {
          console.error("Error sending TriggerNewBid:", error);
        });
        setTriggerConnection(true);
       }

       
    },[props.vehicleId, userStore.nameid,checkStatusAuction,hubConnection,bidStore])

    useEffect(() => {
      if (hubConnection) {
        hubConnection.on("messageReceived", (message:any) => {
          console.log("Trigger newBid:", message);
          setBidState(message);
        }); 
      }
    }, [hubConnection,triggerConnection]); 

   
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
    <h2 className='text-center'>{variable}</h2>
    {bidState?.slice().sort((a: bidModel, b: bidModel) => b.bidAmount - a.bidAmount).map((bid: any) => (
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