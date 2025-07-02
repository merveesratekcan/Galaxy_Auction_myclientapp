import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

function CheckoutForm() {

    const stripe=useStripe();
    const elements = useElements();
    const [isProsesing, setIsProcessing] = useState(false);

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