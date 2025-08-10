import React, { useState } from 'react'
import { useCreateBidMutation } from '../../Api/bidApi'
import { bidModel } from '../../Interfaces/bidModel';
import { RootState } from '../../Storage/store';
import { useSelector } from 'react-redux';
import userModel from '../../Interfaces/userModel';
import { useDispatch } from 'react-redux';
import { setBidsChange } from '../../Storage/Redux/bidSlice';





function CreateBid(props:{vehicleId: number}) {


const [createBid] = useCreateBidMutation();
const userStore : userModel = useSelector((state: RootState) => state.authentication);
const Dispatch = useDispatch();
const [bidAmount, setBidAmountState] = useState("");

const bidModel: bidModel = {
   bidAmount: parseInt(bidAmount),
    userId: userStore.nameid!,
    vehicleId: props.vehicleId
}

const handleCreateBid = () => {
    createBid(bidModel).then((response) => {
       console.log( response);
       if (response.data.isSuccess) {
           Dispatch(setBidsChange(bidModel.bidAmount));
       }

    })
       
}


  return (
    <div className='container'>
        <form>
            <label htmlFor="bidAmount">Bid Amount:</label>
            <input type="number" className="form-control" id="bidAmount" name="bidAmount" onChange={(e)=> setBidAmountState(e.target.value)} />
              <div className='text-center mb-3'>
                <button type="button" onClick={() => handleCreateBid()} className="btn btn-primary">
                    Place Bid  
                </button>
              </div>
            
        </form>
    </div>
  )
}

export default CreateBid