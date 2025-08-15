import React, { useState } from 'react'
import { useCreateBidMutation } from '../../Api/bidApi'
import { bidModel } from '../../Interfaces/bidModel';
import { RootState } from '../../Storage/store';
import { useSelector } from 'react-redux';
import userModel from '../../Interfaces/userModel';
import { useDispatch } from 'react-redux';
import { setBidsChange } from '../../Storage/Redux/bidSlice';
import { ToastrNotify } from '../../Helper';





function CreateBid(props:{vehicleId: number}) {


const [createBid] = useCreateBidMutation();
const userStore : userModel = useSelector((state: RootState) => state.authentication);
const Dispatch = useDispatch();
const [bidAmount, setBidAmountState] = useState("");

const handleCreateBid = async () => {
  const amount = parseInt(bidAmount);
  if (!bidAmount || Number.isNaN(amount)) {
    ToastrNotify('Please enter a valid bid amount.', 'warning');
    return;
  }

  const model: bidModel = {
    bidAmount: amount,
    userId: userStore.nameid!,
    vehicleId: props.vehicleId,
  };

  try {
    const data = await createBid(model).unwrap();
    // Başarılıysa (backend success)
    if ((data as any)?.isSuccess !== false) {
      Dispatch(setBidsChange(model.bidAmount));
      ToastrNotify('You are bid is successfully', 'success');
    } else {
      const msg = (data as any)?.errorMessages?.[0] ?? 'Bid failed';
      ToastrNotify(msg, 'error');
    }
  } catch (err: any) {
    // Hata durumunda backend mesajını göster
    const msg = err?.data?.errorMessages?.[0] ?? 'Bid failed';
    ToastrNotify(msg, 'error');
  }
};


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