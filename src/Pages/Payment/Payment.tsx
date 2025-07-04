import { Elements } from '@stripe/react-stripe-js';
import React, { useState }  from 'react'
import { useLocation } from 'react-router-dom';
import { Loader } from '../../Helper';
import { loadStripe } from '@stripe/stripe-js';
import BidCheckout from '../Bid/BidCheckout';
import CheckoutForm from './CheckoutForm';
import { Modal } from 'react-bootstrap';

function Payment() {

    const location = useLocation()
    const {apiResult,userStore} = location.state;
    const [show,setshow] = useState(true);
    const stripePromise = loadStripe("pk_test_51RH4jwQSY3FYxoaXgqNk2Bfj8vS2kYbUujKZRRRgENV7cXQFuO4UG2Kmt0WxGIm5ReEq8nEL0VCzr6NJeijmMGUA001HSsKszJ");

    if(apiResult) {
        const options = {
            clientSecret: apiResult.clientSecret,
        }

  return (
    <div>
        <Elements stripe={stripePromise} options={options}>

           <div className='container m5 p-5'>
            
               <div className='row'>
                    <Modal show={show}>
                     <div className='container'>
                        <CheckoutForm></CheckoutForm>
                     </div>
                    </Modal>
               </div>
               
           </div>

        </Elements>
    </div>
  )
}
else {
    return (
       <Loader />
    )
}




}

export default Payment