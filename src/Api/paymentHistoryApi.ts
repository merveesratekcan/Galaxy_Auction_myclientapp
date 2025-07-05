//https://localhost:7214/api/PaymentHistory/CheckIsStatusForAuction
//https://localhost:7214/api/PaymentHistory/CreatePaymentHistory

import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import exp from "constants";
import { create } from "domain";


const paymentHistoryApi = createApi({
   reducerPath: 'paymentHistoryApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://localhost:7214/api/PaymentHistory/',     
   }),
   endpoints: (builder) => ({
      checkStatusForAuctionPrice: builder.mutation({
         query: ({statusDetail}) => ({
            url: `CheckIsStatusForAuction`,
            method: 'POST',
            body: statusDetail,
         }),
      }),
      createPaymentHistory: builder.mutation({
         query: ({paymentHistory}) => ({
            url: `CreatePaymentHistory`,
            method: 'POST',
            body: paymentHistory,
         }),
      }),
   }),
});
export const { useCheckStatusForAuctionPriceMutation,useCreatePaymentHistoryMutation } = paymentHistoryApi;
export default paymentHistoryApi;