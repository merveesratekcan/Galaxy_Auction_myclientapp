import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery:fetchBaseQuery({
    baseUrl: 'https://localhost:7214/api/Payment',
}),
    endpoints: (builder) => ({
        dopayment:builder.mutation({
            query: ({userId,vehicleId}) => ({
                url: 'create-payment',
                method: 'POST',
                params: {
                    userId, 
                    vehicleId
                }
    })
    })
    })
});

export const { useDopaymentMutation } = paymentApi;
export default paymentApi;