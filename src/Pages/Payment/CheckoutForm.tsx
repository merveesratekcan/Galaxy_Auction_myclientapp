
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Storage/store';
import { useCreatePaymentHistoryMutation } from '../../Api/paymentHistoryApi';
import orderModel from '../../Interfaces/orderModel';

function CheckoutForm() {

    const Navigate = useNavigate();
    const stripe=useStripe();
    const elements = useElements();
    const [isProsesing, setIsProcessing] = useState(false);
    const[createPaymentHistory] = useCreatePaymentHistoryMutation();
    const vehicleId : string = useSelector((state: RootState) => state.vehicleStore.vehicleId);
    const orderStore : orderModel = useSelector((state: RootState) => state.orderStore);

    const handleSubmit = async (event:React.ChangeEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);

       const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://example.com/order/123/complate', // Replace with your return URL
            },
            redirect: 'if_required',
        });
        
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
           setIsProcessing(false);
        } else {
            // The payment has been processed!
            
        }

        if (result.paymentIntent?.status === 'succeeded') {
            // Payment succeeded, redirect to success page or show success message
            const response = createPaymentHistory({
                userId: orderStore.userId,
                clientSecret: orderStore.clientSecret,
                stripePaymentIntentId: result.paymentIntent.id,
                vehicleId: orderStore.vehicleId
            })

            console.log(response);
            
            Navigate(`/Vehicle/VehicleId/${vehicleId}`);
        } 

        setIsProcessing(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className='text-center mt-2'>
             <button disabled={!stripe || isProsesing} type="submit" className='btn btn-primary'>
                  {
                isProsesing ? "Processing..." : "Submit Payment"
            }
            </button>
          
            </div>

        </form>
    )

}

export default CheckoutForm